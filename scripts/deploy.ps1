# Stull Atlas - Deploy to rlv.lol/stullv2/
#
# Usage:
#   .\scripts\deploy.ps1
#   .\scripts\deploy.ps1 -SkipBuild    # deploy existing dist/
#   .\scripts\deploy.ps1 -DryRun       # build only, don't upload
#
# Prerequisites:
#   1. Create .env.deploy in project root (gitignored) with:
#      FTP_HOST=pixie-ss1-ftp.porkbun.com
#      FTP_USER=your-ftp-username
#      FTP_PASS=your-ftp-password
#      FTP_PATH=/stullv2
#   2. npm run build must succeed
#   3. WinSCP CLI (choco install winscp)

param(
    [switch]$SkipBuild,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)

# If running from scripts/ directly, adjust
if (-not (Test-Path "$projectRoot\package.json")) {
    $projectRoot = Split-Path -Parent $PSScriptRoot
}
if (-not (Test-Path "$projectRoot\package.json")) {
    $projectRoot = $PSScriptRoot
}

Write-Host "`n=== Stull Atlas Deploy ===" -ForegroundColor Cyan

# Check WinSCP
$winscp = Get-Command winscp.com -ErrorAction SilentlyContinue
if (-not $winscp) {
    Write-Host "`nERROR: WinSCP CLI not found. Install with: choco install winscp" -ForegroundColor Red
    exit 1
}

# Load FTP credentials from .env.deploy
$envFile = Join-Path $projectRoot ".env.deploy"
if (-not (Test-Path $envFile)) {
    Write-Host "`nERROR: .env.deploy not found at $envFile" -ForegroundColor Red
    Write-Host "Create it with:" -ForegroundColor Yellow
    Write-Host "  FTP_HOST=pixie-ss1-ftp.porkbun.com"
    Write-Host "  FTP_USER=your-username"
    Write-Host "  FTP_PASS=your-password"
    Write-Host "  FTP_PATH=/stullv2"
    exit 1
}

$ftpConfig = @{}
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([^#=]+?)\s*=\s*(.+)\s*$') {
        $ftpConfig[$Matches[1]] = $Matches[2]
    }
}

foreach ($key in @('FTP_HOST', 'FTP_USER', 'FTP_PASS', 'FTP_PATH')) {
    if (-not $ftpConfig.ContainsKey($key)) {
        Write-Host "ERROR: $key missing from .env.deploy" -ForegroundColor Red
        exit 1
    }
}

# Step 1: Build
if (-not $SkipBuild) {
    Write-Host "`n[1/3] Building..." -ForegroundColor Yellow
    Push-Location $projectRoot
    try {
        npm run build 2>&1 | ForEach-Object { Write-Host "  $_" }
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Build failed!" -ForegroundColor Red
            exit 1
        }
        # Inject hashed asset URLs into sw.js for offline pre-caching
        node scripts/postbuild-sw.js dist 2>&1 | ForEach-Object { Write-Host "  $_" }
    } finally {
        Pop-Location
    }
} else {
    Write-Host "`n[1/3] Skipping build (using existing dist/)" -ForegroundColor DarkGray
}

$distDir = Join-Path $projectRoot "dist"
if (-not (Test-Path $distDir)) {
    Write-Host "ERROR: dist/ directory not found. Run build first." -ForegroundColor Red
    exit 1
}

# Copy glazy data into dist
$glazyDest = Join-Path $distDir "data\glazes"
if (-not (Test-Path $glazyDest)) {
    New-Item -ItemType Directory -Path $glazyDest -Force | Out-Null
}
$glazySrc = Join-Path $projectRoot "src\data\glazes\glazy-processed.json"
if (Test-Path $glazySrc) {
    Copy-Item $glazySrc (Join-Path $glazyDest "glazy-processed.json") -Force
    Write-Host "  Copied glazy-processed.json to dist/" -ForegroundColor DarkGray
}

# Count files
$files = Get-ChildItem -Path $distDir -Recurse -File
Write-Host "  Found $($files.Count) files to upload" -ForegroundColor Green

if ($DryRun) {
    Write-Host "`n[DRY RUN] Would upload $($files.Count) files to $($ftpConfig['FTP_HOST'])$($ftpConfig['FTP_PATH'])" -ForegroundColor Yellow
    Write-Host "Files:" -ForegroundColor DarkGray
    $files | ForEach-Object {
        $rel = $_.FullName.Substring($distDir.Length).Replace('\', '/')
        Write-Host "  $rel ($([math]::Round($_.Length / 1KB, 1)) KB)" -ForegroundColor DarkGray
    }
    exit 0
}

# Step 2: Upload via WinSCP (explicit FTPS)
Write-Host "`n[2/3] Uploading to $($ftpConfig['FTP_HOST'])$($ftpConfig['FTP_PATH'])..." -ForegroundColor Yellow

$ftpHost = $ftpConfig['FTP_HOST']
$ftpUser = $ftpConfig['FTP_USER']
$ftpPass = $ftpConfig['FTP_PASS']
$ftpPath = $ftpConfig['FTP_PATH']

$winscpScript = @"
open ftp://${ftpUser}:${ftpPass}@${ftpHost}/ -explicit
synchronize remote "$distDir" "$ftpPath"
exit
"@

$output = $winscpScript | winscp.com /ini=nul /log=NUL /command 2>&1
$exitCode = $LASTEXITCODE

# Count uploaded files from WinSCP output
$uploadLines = $output | Where-Object { $_ -match '\| 100%' }
$uploaded = if ($uploadLines) { @($uploadLines).Count } else { 0 }

Write-Host ""
$output | ForEach-Object { Write-Host "  $_" }

# Step 3: Summary
Write-Host "`n[3/3] Deploy complete!" -ForegroundColor Green
Write-Host "  Synced: $uploaded files" -ForegroundColor Green
if ($exitCode -ne 0) {
    Write-Host "  WinSCP exited with code $exitCode" -ForegroundColor Red
}
Write-Host "`n  Live at: https://rlv.lol/stullv2/" -ForegroundColor Cyan
Write-Host ""
