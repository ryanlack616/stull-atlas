# Stull Atlas - Studio Edition Builder
#
# Builds a fully unlocked, offline-capable PWA for distribution
# on micro SD cards. All features enabled, no auth required.
#
# Usage:
#   .\scripts\build-studio.ps1
#   .\scripts\build-studio.ps1 -OutputDir "D:\my-sd-card\StullAtlas"
#
# Output: A self-contained folder with:
#   - All built web assets (HTML, JS, CSS, fonts, data)
#   - serve.bat / serve.sh - one-click portable launcher
#   - README.txt - instructions for the recipient

param(
    [string]$OutputDir = ""
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
if (-not (Test-Path "$projectRoot\package.json")) {
    $projectRoot = Split-Path -Parent $PSScriptRoot
}
if (-not (Test-Path "$projectRoot\package.json")) {
    $projectRoot = $PSScriptRoot
}

Write-Host "`n=== Stull Atlas - Studio Edition ===" -ForegroundColor Magenta
Write-Host "  Building fully unlocked offline PWA..." -ForegroundColor DarkGray

# Default output directory
if (-not $OutputDir) {
    $OutputDir = Join-Path $projectRoot "studio-edition"
}

# Step 1: Build with VITE_DEMO_MODE=true
Write-Host "`n[1/4] Building with all features unlocked..." -ForegroundColor Yellow
Push-Location $projectRoot
try {
    $env:VITE_DEMO_MODE = "true"
    $env:VITE_OFFLINE_DATA = "true"
    $env:FORCE_COLOR = "0"

    # Type check
    $tscOut = npx tsc --noEmit 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Type check failed!" -ForegroundColor Red
        Write-Host ($tscOut | Out-String) -ForegroundColor Red
        exit 1
    }
    Write-Host "  Types clean" -ForegroundColor DarkGray

    # Build (Rollup warnings go to stderr - ignore them)
    $ErrorActionPreference = "Continue"
    $buildOut = npx vite build 2>&1
    $ErrorActionPreference = "Stop"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Vite build failed!" -ForegroundColor Red
        Write-Host ($buildOut | Out-String) -ForegroundColor Red
        exit 1
    }
    Write-Host "  Vite build complete" -ForegroundColor DarkGray

    # Inject SW precache assets
    $swOut = node scripts/postbuild-sw.js dist --all 2>&1
    Write-Host "  Service worker assets injected" -ForegroundColor DarkGray

    $env:VITE_DEMO_MODE = $null
    $env:VITE_OFFLINE_DATA = $null
    $env:FORCE_COLOR = $null
} finally {
    Pop-Location
}

$distDir = Join-Path $projectRoot "dist"
if (-not (Test-Path $distDir)) {
    Write-Host "ERROR: dist/ not found after build" -ForegroundColor Red
    exit 1
}

# Step 2: Prepare output directory
Write-Host "`n[2/4] Preparing studio package..." -ForegroundColor Yellow

if (Test-Path $OutputDir) {
    Remove-Item $OutputDir -Recurse -Force
}
New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null

# Copy all dist files
Copy-Item "$distDir\*" $OutputDir -Recurse -Force
Write-Host "  Copied build output" -ForegroundColor DarkGray

# Copy glaze dataset
$glazyDest = Join-Path $OutputDir "data\glazes"
if (-not (Test-Path $glazyDest)) {
    New-Item -ItemType Directory -Path $glazyDest -Force | Out-Null
}
$glazySrc = Join-Path $projectRoot "src\data\glazes\glazy-processed.json"
if (Test-Path $glazySrc) {
    Copy-Item $glazySrc (Join-Path $glazyDest "glazy-processed.json") -Force
    Write-Host "  Copied glaze dataset" -ForegroundColor DarkGray
}

# Step 3: Create portable launcher scripts
Write-Host "`n[3/4] Creating launcher scripts..." -ForegroundColor Yellow

# Windows launcher (batch file)
$batLines = @(
    '@echo off'
    'title Stull Atlas - Studio Edition'
    'echo.'
    'echo  ========================================'
    'echo   Stull Atlas - Studio Edition'
    'echo   Ceramic Glaze Explorer'
    'echo  ========================================'
    'echo.'
    'echo  Starting local server...'
    'echo  (Keep this window open while using the app)'
    'echo.'
    'set PORT=8742'
    'where npx >nul 2>&1'
    'if %ERRORLEVEL% == 0 ('
    '    echo  Opening http://localhost:%PORT% in your browser...'
    '    start "" "http://localhost:%PORT%"'
    '    npx serve -s . -l %PORT% --no-clipboard'
    '    goto :done'
    ')'
    'where python >nul 2>&1'
    'if %ERRORLEVEL% == 0 ('
    '    echo  Opening http://localhost:%PORT% in your browser...'
    '    start "" "http://localhost:%PORT%"'
    '    python -m http.server %PORT%'
    '    goto :done'
    ')'
    'echo.'
    'echo  ERROR: No web server found.'
    'echo  Please install Node.js (https://nodejs.org) or Python (https://python.org)'
    'echo.'
    'pause'
    ':done'
)
$batLines -join "`r`n" | Set-Content (Join-Path $OutputDir "Start Stull Atlas.bat") -Encoding ASCII
Write-Host "  Created Start Stull Atlas.bat" -ForegroundColor DarkGray

# macOS/Linux launcher (shell script)
$shLines = @(
    '#!/bin/bash'
    'echo ""'
    'echo "  ========================================"'
    'echo "   Stull Atlas - Studio Edition"'
    'echo "   Ceramic Glaze Explorer"'
    'echo "  ========================================"'
    'echo ""'
    'PORT=8742'
    'DIR="$(cd "$(dirname "$0")" && pwd)"'
    'cd "$DIR"'
    'if command -v npx > /dev/null 2>&1; then'
    '    echo "  Opening http://localhost:$PORT ..."'
    '    open "http://localhost:$PORT" 2>/dev/null || xdg-open "http://localhost:$PORT" 2>/dev/null || true'
    '    npx serve -s . -l $PORT --no-clipboard'
    '    exit 0'
    'fi'
    'if command -v python3 > /dev/null 2>&1; then'
    '    echo "  Opening http://localhost:$PORT ..."'
    '    open "http://localhost:$PORT" 2>/dev/null || xdg-open "http://localhost:$PORT" 2>/dev/null || true'
    '    python3 -m http.server $PORT'
    '    exit 0'
    'fi'
    'if command -v python > /dev/null 2>&1; then'
    '    echo "  Opening http://localhost:$PORT ..."'
    '    open "http://localhost:$PORT" 2>/dev/null || xdg-open "http://localhost:$PORT" 2>/dev/null || true'
    '    python -m http.server $PORT'
    '    exit 0'
    'fi'
    'echo "  ERROR: No web server found. Install Node.js or Python."'
)
$shLines -join "`n" | Set-Content (Join-Path $OutputDir "start-stull-atlas.sh") -Encoding UTF8 -NoNewline
Write-Host "  Created start-stull-atlas.sh" -ForegroundColor DarkGray

# Step 4: Create README
Write-Host "`n[4/4] Creating README..." -ForegroundColor Yellow

$readmeLines = @(
    '==========================================='
    '  STULL ATLAS - STUDIO EDITION'
    '  Ceramic Glaze Chemistry Explorer'
    '==========================================='
    ''
    'All features are unlocked. No account or'
    'internet connection required.'
    ''
    'QUICK START'
    '-----------'
    ''
    'Windows:'
    '  Double-click "Start Stull Atlas.bat"'
    ''
    'Mac / Linux:'
    '  Open a terminal in this folder and run:'
    '    chmod +x start-stull-atlas.sh'
    '    ./start-stull-atlas.sh'
    ''
    'The app will open in your default web browser'
    'at http://localhost:8742'
    ''
    'REQUIREMENTS'
    '------------'
    'You need ONE of the following installed:'
    '  - Node.js (https://nodejs.org) - recommended'
    '  - Python  (https://python.org)'
    ''
    'FEATURES INCLUDED'
    '-----------------'
    '  - Interactive Stull Chart (2D + 3D)'
    '  - 3,000+ real glaze recipes from Glazy.org'
    '  - UMF Calculator'
    '  - Glaze Optimizer (gradient + genetic algorithm)'
    '  - AI Recipe Suggestion Engine'
    '  - Line / Triaxial / Biaxial / Quadaxial /'
    '    Radial / Space-Filling Blend Calculators'
    '  - Similarity Search'
    '  - Side-by-side Glaze Comparison'
    '  - DBSCAN Clustering and Void Detection'
    '  - Import/Export (JSON, CSV, Insight XML)'
    '  - Complete Materials Database'
    '  - Digitalfire Reference Integration'
    ''
    'OFFLINE USE'
    '-----------'
    'After the first launch, the app caches itself'
    'in your browser. You can use it offline by'
    'revisiting http://localhost:8742 (as long as'
    'the server script is running).'
    ''
    'ABOUT'
    '-----'
    'Made with care for the ceramics community.'
    'https://stullatlas.app'
)
$readmeLines -join "`r`n" | Set-Content (Join-Path $OutputDir "README.txt") -Encoding UTF8
Write-Host "  Created README.txt" -ForegroundColor DarkGray

# Summary
$files = Get-ChildItem -Path $OutputDir -Recurse -File
$totalSize = ($files | Measure-Object -Sum Length).Sum
$sizeMB = [math]::Round($totalSize / 1MB, 1)

Write-Host "`n=== Studio Edition Ready ===" -ForegroundColor Green
Write-Host "  Location: $OutputDir" -ForegroundColor Cyan
Write-Host "  Files:    $($files.Count)" -ForegroundColor Cyan
Write-Host "  Size:     $sizeMB MB" -ForegroundColor Cyan
Write-Host "`n  Copy this folder to a micro SD card." -ForegroundColor DarkGray
Write-Host "  Recipients just double-click 'Start Stull Atlas.bat'" -ForegroundColor DarkGray
Write-Host ""
