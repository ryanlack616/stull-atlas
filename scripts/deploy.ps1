# Stull Atlas — Deploy to rlv.lol/stullv2/
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

# Step 2: Upload via FTP
Write-Host "`n[2/3] Uploading to $($ftpConfig['FTP_HOST'])$($ftpConfig['FTP_PATH'])..." -ForegroundColor Yellow

$ftpBase = "ftp://$($ftpConfig['FTP_HOST'])$($ftpConfig['FTP_PATH'])"
$cred = New-Object System.Net.NetworkCredential($ftpConfig['FTP_USER'], $ftpConfig['FTP_PASS'])

# Ensure we track created directories to avoid redundant MKD calls
$createdDirs = @{}

function Ensure-FtpDirectory {
    param([string]$DirPath)
    
    if ($createdDirs.ContainsKey($DirPath)) { return }
    
    # Recursively ensure parent exists
    $parent = Split-Path $DirPath -Parent
    if ($parent -and $parent -ne $DirPath) {
        $parentFtp = $parent.Replace('\', '/')
        if ($parentFtp -and -not $createdDirs.ContainsKey($parentFtp)) {
            Ensure-FtpDirectory $parentFtp
        }
    }
    
    try {
        $uri = "$ftpBase/$($DirPath.Replace('\', '/'))"
        if (-not $uri.EndsWith('/')) { $uri += '/' }
        $req = [System.Net.FtpWebRequest]::Create($uri)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $req.Credentials = $cred
        $req.UseBinary = $true
        $req.EnableSsl = $false
        $resp = $req.GetResponse()
        $resp.Close()
    } catch {
        # Directory probably already exists — that's fine
    }
    $createdDirs[$DirPath] = $true
}

$uploaded = 0
$errors = @()

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($distDir.Length + 1).Replace('\', '/')
    $relativeDir = Split-Path $relativePath -Parent
    
    if ($relativeDir) {
        Ensure-FtpDirectory $relativeDir
    }
    
    $targetUri = "$ftpBase/$relativePath"
    
    try {
        $req = [System.Net.FtpWebRequest]::Create($targetUri)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $req.Credentials = $cred
        $req.UseBinary = $true
        $req.EnableSsl = $false
        $req.ContentLength = $file.Length
        
        $fileStream = [System.IO.File]::OpenRead($file.FullName)
        $reqStream = $req.GetRequestStream()
        $fileStream.CopyTo($reqStream)
        $reqStream.Close()
        $fileStream.Close()
        
        $resp = $req.GetResponse()
        $resp.Close()
        
        $uploaded++
        $pct = [math]::Round(($uploaded / $files.Count) * 100)
        Write-Host "`r  [$pct%] $uploaded/$($files.Count) — $relativePath" -NoNewline
    } catch {
        $errors += "$relativePath : $($_.Exception.Message)"
    }
}

Write-Host ""

# Step 3: Summary
Write-Host "`n[3/3] Deploy complete!" -ForegroundColor Green
Write-Host "  Uploaded: $uploaded files" -ForegroundColor Green
if ($errors.Count -gt 0) {
    Write-Host "  Errors: $($errors.Count)" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
}
Write-Host "`n  Live at: https://rlv.lol/stullv2/" -ForegroundColor Cyan
Write-Host ""
