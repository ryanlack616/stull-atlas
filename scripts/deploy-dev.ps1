# Stull Atlas - Deploy dev build to stullatlas.app/rje/dev/
#
# Usage:
#   .\scripts\deploy-dev.ps1
#   .\scripts\deploy-dev.ps1 -SkipBuild    # deploy existing dist-dev/
#   .\scripts\deploy-dev.ps1 -DryRun       # build only, don't upload
#
# This deploys to a subfolder so Ryan can share dev progress
# with a handful of people before NCECA.
#
# Prerequisites:
#   1. .env.deploy with FTP_HOST, FTP_USER, FTP_PASS (same as main deploy)
#   2. WinSCP CLI (choco install winscp)

param(
    [switch]$SkipBuild,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
if (-not (Test-Path "$projectRoot\package.json")) {
    $projectRoot = Split-Path -Parent $PSScriptRoot
}
if (-not (Test-Path "$projectRoot\package.json")) {
    $projectRoot = $PSScriptRoot
}

$DevBasePath = "/rje/dev/"
$DistDir = Join-Path $projectRoot "dist-dev"

Write-Host "`n=== Stull Atlas DEV Deploy ===" -ForegroundColor Magenta
Write-Host "  Target: https://stullatlas.app$DevBasePath" -ForegroundColor DarkGray

# Check WinSCP
$winscp = Get-Command winscp.com -ErrorAction SilentlyContinue
if (-not $winscp) {
    Write-Host "`nERROR: WinSCP CLI not found. Install with: choco install winscp" -ForegroundColor Red
    exit 1
}

# Load FTP credentials from .env.deploy (same creds as production)
$envFile = Join-Path $projectRoot ".env.deploy"
if (-not (Test-Path $envFile)) {
    Write-Host "`nERROR: .env.deploy not found at $envFile" -ForegroundColor Red
    exit 1
}

$ftpConfig = @{}
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*([^#=]+?)\s*=\s*(.+)\s*$') {
        $ftpConfig[$Matches[1]] = $Matches[2]
    }
}

foreach ($key in @('FTP_HOST', 'FTP_USER', 'FTP_PASS')) {
    if (-not $ftpConfig.ContainsKey($key)) {
        Write-Host "ERROR: $key missing from .env.deploy" -ForegroundColor Red
        exit 1
    }
}

# Step 1: Build with dev base path
if (-not $SkipBuild) {
    Write-Host "`n[1/3] Building with base='$DevBasePath'..." -ForegroundColor Yellow
    Push-Location $projectRoot
    try {
        $env:FORCE_COLOR = "0"
        # Build with custom base path and output dir
        npx vite build --base "$DevBasePath" --outDir "dist-dev" --emptyOutDir 2>&1 | ForEach-Object { Write-Host "  $_" }
        $env:FORCE_COLOR = $null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Build failed!" -ForegroundColor Red
            exit 1
        }
    } finally {
        Pop-Location
    }
} else {
    Write-Host "`n[1/3] Skipping build (using existing dist-dev/)" -ForegroundColor DarkGray
}

if (-not (Test-Path $DistDir)) {
    Write-Host "ERROR: dist-dev/ directory not found. Run build first." -ForegroundColor Red
    exit 1
}

# Copy glazy data into dist-dev
$glazyDest = Join-Path $DistDir "data\glazes"
if (-not (Test-Path $glazyDest)) {
    New-Item -ItemType Directory -Path $glazyDest -Force | Out-Null
}
$glazySrc = Join-Path $projectRoot "src\data\glazes\glazy-processed.json"
if (Test-Path $glazySrc) {
    Copy-Item $glazySrc (Join-Path $glazyDest "glazy-processed.json") -Force
    Write-Host "  Copied glazy-processed.json to dist-dev/" -ForegroundColor DarkGray
}

# Count files
$files = Get-ChildItem -Path $DistDir -Recurse -File
Write-Host "  Found $($files.Count) files to upload" -ForegroundColor Green

if ($DryRun) {
    Write-Host "`n[DRY RUN] Would upload $($files.Count) files to $($ftpConfig['FTP_HOST'])$DevBasePath" -ForegroundColor Yellow
    $files | ForEach-Object {
        $rel = $_.FullName.Substring($DistDir.Length).Replace('\', '/')
        Write-Host "  $rel ($([math]::Round($_.Length / 1KB, 1)) KB)" -ForegroundColor DarkGray
    }
    exit 0
}

# Step 2: Upload via WinSCP to /rje/dev/ subfolder
Write-Host "`n[2/3] Uploading to $($ftpConfig['FTP_HOST'])$DevBasePath..." -ForegroundColor Yellow

$ftpHost = $ftpConfig['FTP_HOST']
$ftpUser = $ftpConfig['FTP_USER']
$ftpPass = $ftpConfig['FTP_PASS']

$winscpScript = @"
open ftp://${ftpUser}:${ftpPass}@${ftpHost}/ -explicit
option batch continue
option confirm off
mkdir "$DevBasePath"
option batch abort
synchronize remote "$DistDir" "$DevBasePath"
exit
"@

$output = $winscpScript | winscp.com /ini=nul /log=NUL /command 2>&1
$exitCode = $LASTEXITCODE

$uploadLines = $output | Where-Object { $_ -match '\| 100%' }
$uploaded = if ($uploadLines) { @($uploadLines).Count } else { 0 }

Write-Host ""
$output | ForEach-Object { Write-Host "  $_" }

# Step 3: Summary
Write-Host "`n[3/3] Dev deploy complete!" -ForegroundColor Green
Write-Host "  Synced: $uploaded files" -ForegroundColor Green
if ($exitCode -ne 0) {
    Write-Host "  WinSCP exited with code $exitCode" -ForegroundColor Red
}
Write-Host "`n  Live at: https://stullatlas.app$DevBasePath" -ForegroundColor Magenta
Write-Host ""
