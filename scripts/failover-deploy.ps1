<#
.SYNOPSIS
  Emergency failover deploy: pushes Stull Atlas to GitHub Pages and
  updates DNS via Porkbun API to point stullatlas.app there.
.DESCRIPTION
  Use when Porkbun static hosting (pixie-ss1) is down.
  Builds the site, pushes dist/ to gh-pages branch, and swaps DNS
  from ss1-sixie.porkbun.com to GitHub Pages.

  To restore back to Porkbun hosting after recovery:
    npm run failover:restore
#>

param(
    [switch]$Restore,     # Restore DNS back to Porkbun hosting
    [switch]$SkipBuild,   # Skip build step (use existing dist/)
    [switch]$DnsOnly      # Only update DNS, don't deploy
)

# -- Porkbun API --
$API_KEY    = 'pk1_b967a0a21a142c30cf56053d7169f96478f99e3a0f368a9e7301d6c0108122a9'
$SECRET_KEY = 'sk1_2c8e316a161de9482296013665c824c34a1396f251796d242e478753cc007928'
$API_BASE   = 'https://api.porkbun.com/api/json/v3'
$DOMAIN     = 'stullatlas.app'

$authBody = @{ secretapikey = $SECRET_KEY; apikey = $API_KEY } | ConvertTo-Json

# -- GitHub Pages config --
$GH_USER    = 'ryanlack616'
$GH_REPO    = 'stull-atlas'
$GH_PAGES   = "$GH_USER.github.io"

# -- ANSI --
$ESC = [string][char]27
$cG  = "$ESC[32m"; $cY = "$ESC[33m"; $cR = "$ESC[31m"
$cB  = "$ESC[1m";  $cDm = "$ESC[2m"; $cX = "$ESC[0m"

# -- Porkbun DNS targets --
$PORKBUN_ALIAS = 'ss1-sixie.porkbun.com'
$GITHUB_CNAME  = "$GH_USER.github.io"

# ====================================================================
# RESTORE MODE: Switch DNS back to Porkbun
# ====================================================================
if ($Restore) {
    Write-Host ""
    Write-Host "${cB}  Restoring DNS to Porkbun hosting...$cX"
    
    # Get current records
    $dnsUrl = $API_BASE + '/dns/retrieve/' + $DOMAIN
    $records = Invoke-RestMethod -Uri $dnsUrl -Method Post -ContentType 'application/json' -Body $authBody
    
    # Find the root ALIAS/CNAME record
    $rootRec = $records.records | Where-Object { $_.name -eq $DOMAIN -and ($_.type -eq 'ALIAS' -or $_.type -eq 'CNAME') }
    
    if ($rootRec) {
        if ($rootRec.content -eq $PORKBUN_ALIAS) {
            Write-Host "  ${cG}Already pointing to Porkbun.$cX Nothing to do."
        } else {
            # Edit the record back to Porkbun
            $editUrl = $API_BASE + '/dns/edit/' + $DOMAIN + '/' + $rootRec.id
            $editBody = @{
                secretapikey = $SECRET_KEY
                apikey       = $API_KEY
                type         = 'ALIAS'
                content      = $PORKBUN_ALIAS
                ttl          = '600'
            } | ConvertTo-Json
            
            $result = Invoke-RestMethod -Uri $editUrl -Method Post -ContentType 'application/json' -Body $editBody
            if ($result.status -eq 'SUCCESS') {
                Write-Host "  ${cG}DNS restored to $PORKBUN_ALIAS$cX"
            } else {
                Write-Host "  ${cR}Failed to restore DNS: $($result | ConvertTo-Json)$cX"
                exit 2
            }
        }
    }
    
    # Restore wildcard too
    $wildRec = $records.records | Where-Object { $_.name -eq "*.$DOMAIN" -and ($_.type -eq 'CNAME') }
    if ($wildRec -and $wildRec.content -ne $PORKBUN_ALIAS) {
        $editUrl = $API_BASE + '/dns/edit/' + $DOMAIN + '/' + $wildRec.id
        $editBody = @{
            secretapikey = $SECRET_KEY
            apikey       = $API_KEY
            type         = 'CNAME'
            content      = $PORKBUN_ALIAS
            ttl          = '600'
        } | ConvertTo-Json
        Invoke-RestMethod -Uri $editUrl -Method Post -ContentType 'application/json' -Body $editBody | Out-Null
        Write-Host "  ${cG}Wildcard DNS also restored.$cX"
    }
    
    Write-Host ""
    Write-Host "  ${cDm}DNS propagation may take 5-10 minutes.$cX"
    Write-Host ""
    exit 0
}

# ====================================================================
# FAILOVER MODE: Deploy to GitHub Pages + swap DNS
# ====================================================================
Write-Host ""
Write-Host "${cR}${cB}  FAILOVER DEPLOY$cX"
Write-Host "${cDm}  Deploying to GitHub Pages and swapping DNS$cX"
Write-Host ""

# -- Step 1: Build --
if (-not $DnsOnly) {
    if (-not $SkipBuild) {
        Write-Host "${cB}  Building...$cX" -NoNewline
        $buildResult = npm run build 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Host " ${cR}FAILED$cX"
            Write-Host $buildResult
            exit 2
        }
        Write-Host " ${cG}OK$cX"
    }

    # -- Step 2: Add CNAME file for custom domain --
    Set-Content -Path 'dist/CNAME' -Value $DOMAIN -NoNewline
    Write-Host "  ${cDm}Added CNAME file for $DOMAIN$cX"

    # -- Step 3: Deploy to gh-pages branch --
    Write-Host "${cB}  Deploying to gh-pages...$cX" -NoNewline

    # Save current branch
    $currentBranch = git rev-parse --abbrev-ref HEAD

    # Check if gh-pages exists
    $ghPagesExists = git branch --list gh-pages
    
    Push-Location dist

    # Init a temporary git repo in dist/
    git init --quiet 2>$null
    git checkout -b gh-pages --quiet 2>$null
    git add -A 2>$null
    git commit -m "Failover deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')" --quiet 2>$null
    git remote add origin "https://github.com/$GH_USER/$GH_REPO.git" 2>$null
    git push origin gh-pages --force --quiet 2>&1 | Out-Null

    Pop-Location

    # Clean up the temp git repo in dist/
    Remove-Item 'dist/.git' -Recurse -Force -ErrorAction SilentlyContinue

    if ($LASTEXITCODE -eq 0) {
        Write-Host " ${cG}OK$cX"
    } else {
        Write-Host " ${cR}FAILED$cX"
        Write-Host "  Git push to gh-pages failed. Check GitHub auth."
        exit 2
    }

    Write-Host "  ${cDm}GitHub Pages: https://$GH_USER.github.io/$GH_REPO/$cX"
}

# -- Step 4: Update DNS via Porkbun API --
Write-Host "${cB}  Updating DNS...$cX" -NoNewline

$dnsUrl = $API_BASE + '/dns/retrieve/' + $DOMAIN
$records = Invoke-RestMethod -Uri $dnsUrl -Method Post -ContentType 'application/json' -Body $authBody

# Find root ALIAS record and change to CNAME pointing at GitHub
$rootRec = $records.records | Where-Object { $_.name -eq $DOMAIN -and ($_.type -eq 'ALIAS' -or $_.type -eq 'CNAME') }

if ($rootRec) {
    if ($rootRec.content -eq $GITHUB_CNAME) {
        Write-Host " ${cY}already pointing to GitHub Pages.$cX"
    } else {
        $editUrl = $API_BASE + '/dns/edit/' + $DOMAIN + '/' + $rootRec.id
        $editBody = @{
            secretapikey = $SECRET_KEY
            apikey       = $API_KEY
            type         = 'CNAME'
            content      = $GITHUB_CNAME
            ttl          = '600'
        } | ConvertTo-Json
        
        $result = Invoke-RestMethod -Uri $editUrl -Method Post -ContentType 'application/json' -Body $editBody
        if ($result.status -eq 'SUCCESS') {
            Write-Host " ${cG}OK$cX"
            Write-Host "  ${cDm}$DOMAIN -> $GITHUB_CNAME$cX"
        } else {
            Write-Host " ${cR}FAILED$cX"
            Write-Host "  $($result | ConvertTo-Json)"
            exit 2
        }
    }
} else {
    Write-Host " ${cR}No root record found to update!$cX"
    exit 2
}

Write-Host ""
Write-Host "${cG}${cB}  Failover complete.$cX"
Write-Host "${cDm}  DNS propagation: 5-10 minutes."
Write-Host "  GitHub Pages URL: https://$GH_USER.github.io/$GH_REPO/"
Write-Host "  Custom domain: https://$DOMAIN/"
Write-Host "  To restore to Porkbun: npm run failover:restore$cX"
Write-Host ""
exit 0
