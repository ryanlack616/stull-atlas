# ╔══════════════════════════════════════════════════════════════╗
# ║  Stull Atlas — Versioned Backup & Release Script           ║
# ╠══════════════════════════════════════════════════════════════╣
# ║  Creates timestamped 7z archives and optional .exe builds  ║
# ║  in the backups/ folder.                                   ║
# ║                                                            ║
# ║  Usage:                                                    ║
# ║    .\scripts\backup.ps1              # archive only        ║
# ║    .\scripts\backup.ps1 -Exe         # archive + exe build ║
# ║    .\scripts\backup.ps1 -SkipTests   # skip test/tsc check ║
# ║    .\scripts\backup.ps1 -Tag "gallery"  # custom tag       ║
# ╚══════════════════════════════════════════════════════════════╝

param(
    [switch]$Exe,           # Also build Tauri .exe
    [switch]$SkipTests,     # Skip tsc + vitest
    [string]$Tag = "",      # Optional tag (e.g., "gallery", "compass")
    [string]$BackupDir = "" # Override backup directory
)

$ErrorActionPreference = "Stop"

# ─── Resolve project root ────────────────────────────────────
$scriptDir = $PSScriptRoot
$projectRoot = Split-Path -Parent $scriptDir
if (-not (Test-Path "$projectRoot\package.json")) {
    Write-Host "ERROR: Cannot find package.json at $projectRoot" -ForegroundColor Red
    exit 1
}

# ─── Read version from package.json ──────────────────────────
$pkg = Get-Content "$projectRoot\package.json" -Raw | ConvertFrom-Json
$version = $pkg.version
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmm"
$label = if ($Tag) { "v${version}_${Tag}_${timestamp}" } else { "v${version}_${timestamp}" }

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║  Stull Atlas Backup                         ║" -ForegroundColor Cyan
Write-Host "  ║  Version: $version" -ForegroundColor Cyan
Write-Host "  ║  Label:   $label" -ForegroundColor Cyan
Write-Host "  ╚══════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# ─── Backup directory ────────────────────────────────────────
if (-not $BackupDir) {
    $BackupDir = Join-Path $projectRoot "backups"
}
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    Write-Host "  Created $BackupDir" -ForegroundColor DarkGray
}

# ─── Pre-flight checks ───────────────────────────────────────
if (-not $SkipTests) {
    Write-Host "[1] Type-checking..." -ForegroundColor Yellow
    Push-Location $projectRoot
    $tscOut = npx tsc --noEmit 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  tsc FAILED — fix errors before backing up" -ForegroundColor Red
        Write-Host ($tscOut | Out-String) -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Write-Host "  tsc clean ✓" -ForegroundColor Green

    Write-Host "[2] Running tests..." -ForegroundColor Yellow
    $testOut = npx vitest run 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Tests FAILED" -ForegroundColor Red
        Write-Host ($testOut | Out-String) -ForegroundColor Red
        Pop-Location
        exit 1
    }
    # Extract test summary
    $summary = ($testOut | Select-String "Tests\s+\d+" | Select-Object -Last 1)
    Write-Host "  $summary ✓" -ForegroundColor Green
    Pop-Location
} else {
    Write-Host "[1-2] Skipping type check & tests" -ForegroundColor DarkGray
}

# ─── Git status snapshot ─────────────────────────────────────
Write-Host "[3] Capturing git state..." -ForegroundColor Yellow
Push-Location $projectRoot
$gitBranch = git rev-parse --abbrev-ref HEAD 2>$null
$gitHash = git rev-parse --short HEAD 2>$null
$gitDirty = git status --porcelain 2>$null
$gitStatus = if ($gitDirty) { "dirty" } else { "clean" }
Pop-Location
Write-Host "  Branch: $gitBranch @ $gitHash ($gitStatus)" -ForegroundColor DarkGray

# ─── Create 7z archive ───────────────────────────────────────
$archiveName = "stull-atlas_${label}.7z"
$archivePath = Join-Path $BackupDir $archiveName

Write-Host "[4] Creating archive: $archiveName" -ForegroundColor Yellow

# Exclusion list — heavy/generated dirs we don't need in backups
$excludes = @(
    "-xr!node_modules",
    "-xr!.git",
    "-xr!dist",
    "-xr!dist-deploy",
    "-xr!studio-edition",
    "-xr!src-tauri\target",
    "-xr!.wrangler",
    "-xr!coverage",
    "-xr!test-results",
    "-xr!playwright-report",
    "-xr!backups",
    "-xr!.venv",
    "-xr!__pycache__",
    "-xr!*.pyc",
    "-xr!.playwright-mcp"
)

Push-Location $projectRoot
$7zArgs = @("a", "-t7z", "-mx=7", "-mmt=on", $archivePath, ".\*") + $excludes
& 7z @7zArgs | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  7z archive FAILED" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location

$archiveSize = (Get-Item $archivePath).Length / 1MB
Write-Host "  Archive: $archiveName ($([math]::Round($archiveSize, 1)) MB) ✓" -ForegroundColor Green

# ─── Write manifest ──────────────────────────────────────────
$manifestPath = Join-Path $BackupDir "stull-atlas_${label}.manifest.txt"
@"
Stull Atlas Backup Manifest
============================
Version:    $version
Label:      $label
Date:       $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Git Branch: $gitBranch
Git Commit: $gitHash
Git Status: $gitStatus
Archive:    $archiveName
Size:       $([math]::Round($archiveSize, 1)) MB
Tag:        $(if ($Tag) { $Tag } else { '(none)' })
"@ | Set-Content $manifestPath -Encoding UTF8

Write-Host "  Manifest written ✓" -ForegroundColor DarkGray

# ─── Optional: Build Tauri .exe ──────────────────────────────
if ($Exe) {
    Write-Host "[5] Building Tauri .exe..." -ForegroundColor Yellow
    Write-Host "  This may take several minutes on first build..." -ForegroundColor DarkGray

    Push-Location $projectRoot

    # Sync version into tauri.conf.json
    $tauriConf = Get-Content "src-tauri\tauri.conf.json" -Raw | ConvertFrom-Json
    if ($tauriConf.version -ne $version) {
        $tauriConf.version = $version
        $tauriConf | ConvertTo-Json -Depth 10 | Set-Content "src-tauri\tauri.conf.json" -Encoding UTF8
        Write-Host "  Synced tauri.conf.json version → $version" -ForegroundColor DarkGray
    }

    # Build
    $env:VITE_DEMO_MODE = "false"
    $ErrorActionPreference = "Continue"
    npx tauri build 2>&1 | ForEach-Object {
        if ($_ -match "Finished|Bundling|error") { Write-Host "  $_" -ForegroundColor DarkGray }
    }
    $ErrorActionPreference = "Stop"

    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Tauri build FAILED" -ForegroundColor Red
        Pop-Location
        exit 1
    }

    # Find the built exe (NSIS installer)
    $nsisDir = "src-tauri\target\release\bundle\nsis"
    $builtExe = Get-ChildItem $nsisDir -Filter "*.exe" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1

    if ($builtExe) {
        $exeName = "StullAtlas_${label}_setup.exe"
        $exeDest = Join-Path $BackupDir $exeName
        Copy-Item $builtExe.FullName $exeDest -Force
        $exeSize = (Get-Item $exeDest).Length / 1MB
        Write-Host "  Installer: $exeName ($([math]::Round($exeSize, 1)) MB) ✓" -ForegroundColor Green

        # Append to manifest
        @"

Installer:  $exeName
Exe Size:   $([math]::Round($exeSize, 1)) MB
"@ | Add-Content $manifestPath -Encoding UTF8
    } else {
        # Try msi fallback
        $msiDir = "src-tauri\target\release\bundle\msi"
        $builtMsi = Get-ChildItem $msiDir -Filter "*.msi" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
        if ($builtMsi) {
            $msiName = "StullAtlas_${label}_setup.msi"
            $msiDest = Join-Path $BackupDir $msiName
            Copy-Item $builtMsi.FullName $msiDest -Force
            $msiSize = (Get-Item $msiDest).Length / 1MB
            Write-Host "  Installer: $msiName ($([math]::Round($msiSize, 1)) MB) ✓" -ForegroundColor Green
        } else {
            Write-Host "  WARNING: No installer found in build output" -ForegroundColor Yellow
        }
    }

    Pop-Location
} else {
    Write-Host "[5] Exe build skipped (use -Exe to include)" -ForegroundColor DarkGray
}

# ─── Summary ─────────────────────────────────────────────────
Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "  ║  Backup Complete                            ║" -ForegroundColor Green
Write-Host "  ║  $archiveName" -ForegroundColor Green
Write-Host "  ║  → $BackupDir" -ForegroundColor Green
Write-Host "  ╚══════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# ─── List recent backups ─────────────────────────────────────
Write-Host "  Recent backups:" -ForegroundColor DarkGray
Get-ChildItem $BackupDir -Filter "stull-atlas_*.7z" | Sort-Object LastWriteTime -Descending | Select-Object -First 5 | ForEach-Object {
    $sz = [math]::Round($_.Length / 1MB, 1)
    Write-Host "    $($_.Name)  ($sz MB)" -ForegroundColor DarkGray
}
Write-Host ""
