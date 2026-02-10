<#
.SYNOPSIS
  Domain and hosting health check for all Porkbun-managed domains.
.DESCRIPTION
  Three layers: (1) Domain status via Porkbun API, (2) DNS resolution,
  (3) HTTP liveness for domains with hosting. Run with: npm run health
#>

param(
    [switch]$Quiet
)

# -- Porkbun API credentials --
$API_KEY    = 'pk1_b967a0a21a142c30cf56053d7169f96478f99e3a0f368a9e7301d6c0108122a9'
$SECRET_KEY = 'sk1_2c8e316a161de9482296013665c824c34a1396f251796d242e478753cc007928'
$API_BASE   = 'https://api.porkbun.com/api/json/v3'

$authBody = @{ secretapikey = $SECRET_KEY; apikey = $API_KEY } | ConvertTo-Json

# -- Domains with HTTP hosting to check --
$hostedDomains = @(
    @{ Host = 'stullatlas.app';  Expect = 'Stull Atlas';  Proto = 'https' }
    @{ Host = 'rlv.lol';         Expect = $null;          Proto = 'https' }
)

# -- Subdomains on external hosting --
$subdomainList = @(
    @{ Host = 'brain.rlv.lol';   Expect = $null; Proto = 'https' }
    @{ Host = 'email.rlv.lol';   Expect = $null; Proto = 'https' }
)

# -- ANSI colors (cast to string for PS 5.1 compat) --
$ESC = [string][char]27
$cG  = "$ESC[32m"   # green
$cY  = "$ESC[33m"   # yellow
$cR  = "$ESC[31m"   # red
$cDm = "$ESC[2m"    # dim
$cB  = "$ESC[1m"    # bold
$cX  = "$ESC[0m"    # reset

function Write-C { param([string]$text, [string]$color) Write-Host "$color$text$cX" -NoNewline }

# -- Banner --
if (-not $Quiet) {
    $now = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    Write-Host ''
    Write-Host "$cB  Domain Health Check$cX  $cDm- $now$cX"
    Write-Host "$cDm  ---------------------------------------------------------------$cX"
    Write-Host ''
}

$script:warnings = [System.Collections.ArrayList]::new()
$script:errors   = [System.Collections.ArrayList]::new()

# ====================================================================
# LAYER 1: Porkbun Domain Status
# ====================================================================
Write-Host "$cB  Checking domain registrations...$cX" -NoNewline

$domainInfo = @{}
try {
    $apiUrl = $API_BASE + '/domain/listAll'
    $domainList = Invoke-RestMethod -Uri $apiUrl -Method Post -ContentType 'application/json' -Body $authBody -TimeoutSec 10
    Write-Host " ${cG}OK$cX"
    if ($domainList.status -eq 'SUCCESS') {
        foreach ($dom in $domainList.domains) {
            $domainInfo[$dom.domain] = $dom
        }
    }
} catch {
    Write-Host " ${cR}FAILED$cX"
    [void]$script:errors.Add('Porkbun API unreachable: ' + $_.Exception.Message)
}

# ====================================================================
# LAYER 2 & 3: DNS + HTTP for each domain
# ====================================================================
Write-Host ''
Write-Host "  ${cB}Domain${cX}                  ${cB}Reg${cX}      ${cB}DNS${cX}     ${cB}HTTP${cX}    ${cB}Hosting${cX}           ${cB}Expires${cX}"
Write-Host "  ${cDm}----------------------  -------  ------  ------  ----------------  ------------${cX}"

function Check-Domain {
    param(
        [string]$hostname,
        [string]$expectContent,
        [string]$proto,
        [bool]$isSubdomain
    )

    $label = $hostname.PadRight(22)
    Write-Host "  $label" -NoNewline

    # -- Registration --
    $expireStr = ''
    if ($isSubdomain) {
        Write-Host "  $cDm  ---  $cX" -NoNewline
        $expireStr = "$cDm  ---$cX"
    } else {
        $info = $domainInfo[$hostname]
        if ($info) {
            $status = $info.status
            $expire = [datetime]::Parse($info.expireDate)
            $daysLeft = ($expire - (Get-Date)).Days
            $expireStr = $expire.ToString('yyyy-MM-dd')

            if ($status -ne 'ACTIVE') {
                Write-C 'INACTIV' $cR; Write-Host ' ' -NoNewline
                [void]$script:errors.Add($hostname + ' registration status: ' + $status)
            } elseif ($daysLeft -lt 30) {
                Write-C 'EXPIRING' $cY; Write-Host '' -NoNewline
                [void]$script:warnings.Add($hostname + ' expires in ' + $daysLeft + ' days')
                $expireStr = "$cY$expireStr$cX"
            } else {
                Write-C ' ACTIVE' $cG; Write-Host ' ' -NoNewline
            }

            # Auto-renew check
            if ($info.autoRenew -ne '1' -and $info.autoRenew -ne 1) {
                [void]$script:warnings.Add($hostname + ' auto-renew is OFF')
            }
        } else {
            Write-C '  ???  ' $cY; Write-Host ' ' -NoNewline
            $expireStr = "${cDm}unknown$cX"
            [void]$script:warnings.Add($hostname + ' not found in Porkbun account')
        }
    }

    # -- DNS Resolution --
    try {
        $dns = Resolve-DnsName $hostname -Type A -ErrorAction Stop -DnsOnly 2>$null
        $rec = $dns | Where-Object { $_.Type -eq 'A' -or $_.Type -eq 'AAAA' -or $_.Type -eq 'CNAME' } | Select-Object -First 1
        if ($rec) {
            Write-C '   OK  ' $cG; Write-Host ' ' -NoNewline
        } else {
            Write-C ' EMPTY ' $cY; Write-Host ' ' -NoNewline
            [void]$script:warnings.Add($hostname + ' DNS resolves but no usable records')
        }
    } catch {
        Write-C ' FAIL  ' $cR; Write-Host ' ' -NoNewline
        [void]$script:errors.Add($hostname + ' DNS resolution failed')
        Write-Host "  $cDm ---$cX   ${cDm}dns-failed$cX         $expireStr"
        return
    }

    # -- Hosting identification --
    $hostingLabel = "${cDm}no hosting$cX"
    try {
        $cnames = Resolve-DnsName $hostname -Type CNAME -ErrorAction SilentlyContinue -DnsOnly 2>$null
        $target = ''
        if ($cnames) {
            $cn = $cnames | Where-Object { $_.NameHost } | Select-Object -First 1
            if ($cn) { $target = $cn.NameHost }
        }
        if ($target -match 'porkbun\.com') {
            $short = $target -replace '\.porkbun\.com$',''
            $hostingLabel = "${cDm}$short$cX"
        } elseif ($target -match 'fly\.dev') {
            $hostingLabel = "${cDm}fly.dev$cX"
        } elseif ($target -match 'netlify') {
            $hostingLabel = "${cDm}netlify$cX"
        } elseif ($target -match 'cloudflare') {
            $hostingLabel = "${cDm}cloudflare$cX"
        } elseif ($target) {
            $hostingLabel = "${cDm}$target$cX"
        }
    } catch { }

    # -- HTTP Liveness --
    $checkHTTP = ($hostedDomains | Where-Object { $_.Host -eq $hostname }) -or $isSubdomain
    if (-not $checkHTTP) {
        Write-Host "  $cDm ---$cX   $hostingLabel  $expireStr"
        return
    }

    try {
        $url = $proto + '://' + $hostname + '/'
        $resp = Invoke-WebRequest -Uri $url -TimeoutSec 8 -UseBasicParsing -ErrorAction Stop -MaximumRedirection 3
        $code = $resp.StatusCode

        if ($code -eq 200) {
            if ($expectContent -and ($resp.Content -notmatch [regex]::Escape($expectContent))) {
                Write-C ' 200!  ' $cY; Write-Host ' ' -NoNewline
                [void]$script:warnings.Add($hostname + ' returned 200 but missing expected content')
            } else {
                Write-C '  200  ' $cG; Write-Host ' ' -NoNewline
            }
        } else {
            Write-C "  $code  " $cY; Write-Host ' ' -NoNewline
            [void]$script:warnings.Add($hostname + ' returned HTTP ' + $code)
        }
    } catch {
        $msg = $_.Exception.Message
        if ($msg -match '(\d{3})') {
            $errCode = $Matches[1]
            Write-C "  $errCode  " $cR; Write-Host ' ' -NoNewline
            [void]$script:errors.Add($hostname + ' returned HTTP ' + $errCode)
        } else {
            Write-C ' FAIL  ' $cR; Write-Host ' ' -NoNewline
            [void]$script:errors.Add($hostname + ' HTTP failed: ' + $msg)
        }
    }

    Write-Host " $hostingLabel  $expireStr"
}

# -- Check all registered domains --
$allDomains = @(
    'stullatlas.app', 'rlv.lol', 'rlventuresllc.com', 'how-well.art',
    'selfexecuting.art', 'groundequals.com', 'monospacepoetry.com', 'garbagepalkids.lol'
)

foreach ($domName in $allDomains) {
    $hosted = $hostedDomains | Where-Object { $_.Host -eq $domName }
    if ($hosted) {
        Check-Domain -hostname $domName -expectContent $hosted.Expect -proto $hosted.Proto -isSubdomain $false
    } else {
        Check-Domain -hostname $domName -expectContent $null -proto 'https' -isSubdomain $false
    }
}

# -- Check subdomains --
Write-Host "  ${cDm}----------------------  -------  ------  ------  ----------------  ------------${cX}"
foreach ($sub in $subdomainList) {
    Check-Domain -hostname $sub.Host -expectContent $sub.Expect -proto $sub.Proto -isSubdomain $true
}

# ====================================================================
# FTP Connectivity
# ====================================================================
Write-Host ''
Write-Host "${cB}  FTP server...$cX" -NoNewline
try {
    $ftpDns = Resolve-DnsName 'pixie-ss1-ftp.porkbun.com' -Type A -ErrorAction Stop -DnsOnly 2>$null
    $ftpRec = $ftpDns | Where-Object { $_.IPAddress } | Select-Object -First 1
    $ftpIP = $ftpRec.IPAddress
    if ($ftpIP) {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $connectTask = $tcp.ConnectAsync($ftpIP, 21)
        if ($connectTask.Wait(5000)) {
            Write-Host " ${cG}OK$cX $cDm(pixie-ss1 $ftpIP port 21 open)$cX"
            $tcp.Close()
        } else {
            Write-Host " ${cY}TIMEOUT$cX $cDm(pixie-ss1 $ftpIP port 21 no response)$cX"
            [void]$script:warnings.Add('FTP server pixie-ss1 port 21 timed out')
        }
    } else {
        Write-Host " ${cR}DNS FAIL$cX"
        [void]$script:errors.Add('pixie-ss1-ftp.porkbun.com DNS failed')
    }
} catch {
    $ftpMsg = $_.Exception.InnerException.Message
    if (-not $ftpMsg) { $ftpMsg = $_.Exception.Message }
    Write-Host " ${cR}REFUSED$cX $cDm($ftpMsg)$cX"
    [void]$script:errors.Add('FTP server pixie-ss1 connection refused')
}

# ====================================================================
# Summary
# ====================================================================
Write-Host ''
Write-Host "  ${cDm}---------------------------------------------------------------${cX}"

if ($script:errors.Count -eq 0 -and $script:warnings.Count -eq 0) {
    Write-Host "  ${cG}${cB}All clear.$cX ${cDm}No issues detected.$cX"
} else {
    if ($script:warnings.Count -gt 0) {
        Write-Host "  ${cY}${cB}Warnings ($($script:warnings.Count)):$cX"
        foreach ($w in $script:warnings) {
            Write-Host "    ${cY}!$cX $w"
        }
    }
    if ($script:errors.Count -gt 0) {
        Write-Host "  ${cR}${cB}Errors ($($script:errors.Count)):$cX"
        foreach ($err in $script:errors) {
            Write-Host "    ${cR}x$cX $err"
        }
    }
}

Write-Host ''

# Exit code: 0 = clean, 1 = warnings only, 2 = errors
if ($script:errors.Count -gt 0) { exit 2 }
if ($script:warnings.Count -gt 0) { exit 1 }
exit 0
