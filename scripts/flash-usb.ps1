<#
.SYNOPSIS
  Flash USB drives with Stull Atlas Studio Edition files.

.DESCRIPTION
  Detects all removable USB drives, copies the Studio installer,
  README.html, sample glazes, and quick-start guide to each one.

.NOTES
  Run from the stull-atlas repo root:
    .\scripts\flash-usb.ps1

  Prerequisites:
    - Build the Tauri installer first: npm run tauri:build
    - Ensure sample-glazes.json exists in src/data/glazes/
#>

param(
  [switch]$Eject  # Safely eject drives after flashing
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path $PSScriptRoot -Parent

# --- Locate source files ---

$installerDir = Join-Path $RepoRoot "src-tauri\target\release\bundle\nsis"
$installer = Get-ChildItem $installerDir -Filter "*.exe" -ErrorAction SilentlyContinue |
             Sort-Object LastWriteTime -Descending | Select-Object -First 1

if (-not $installer) {
  Write-Host "ERROR: No NSIS installer found in $installerDir" -ForegroundColor Red
  Write-Host "       Run 'npm run tauri:build' first." -ForegroundColor Yellow
  exit 1
}

$readmeHtml   = Join-Path $RepoRoot "marketing\print\usb-readme.html"
$sampleGlazes = Join-Path $RepoRoot "src\data\glazes\sample-glazes.json"

# Quick-start text (inline — no separate file needed)
$quickStart = @"
STULL ATLAS STUDIO - Quick Start
================================
1. Run "Stull-Atlas-Studio-Setup.exe" from this drive
2. Open Stull Atlas Studio from your Start Menu or Desktop
3. Explore 3,000+ glazes on the interactive Stull chart
4. (Optional) Import "sample-glazes.json" via File > Import
5. Web version: https://stullatlas.app
"@

# --- Find removable drives ---

$usbDrives = Get-WmiObject Win32_LogicalDisk |
             Where-Object { $_.DriveType -eq 2 } |
             Select-Object DeviceID, VolumeName, @{N='SizeGB'; E={[math]::Round($_.Size/1GB,2)}}

if ($usbDrives.Count -eq 0) {
  Write-Host "No removable USB drives detected." -ForegroundColor Yellow
  exit 0
}

Write-Host ""
Write-Host "=== Stull Atlas Studio — USB Flasher ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Installer : $($installer.Name) ($([math]::Round($installer.Length/1MB,1)) MB)"
Write-Host "Drives    : $($usbDrives.Count) removable drive(s) found"
Write-Host ""

foreach ($d in $usbDrives) {
  Write-Host "  $($d.DeviceID) $($d.VolumeName) ($($d.SizeGB) GB)"
}

Write-Host ""
$confirm = Read-Host "Flash all $($usbDrives.Count) drive(s)? (y/N)"
if ($confirm -ne 'y') {
  Write-Host "Aborted." -ForegroundColor Yellow
  exit 0
}

# --- Flash each drive ---

$flashed = 0

foreach ($drive in $usbDrives) {
  $root = "$($drive.DeviceID)\"
  Write-Host ""
  Write-Host "--- Flashing $($drive.DeviceID) ($($drive.VolumeName)) ---" -ForegroundColor Green

  try {
    # Copy installer (rename to clean name)
    $dest = Join-Path $root "Stull-Atlas-Studio-Setup.exe"
    Copy-Item $installer.FullName $dest -Force
    Write-Host "  [OK] Installer" -ForegroundColor DarkGreen

    # Copy README.html
    if (Test-Path $readmeHtml) {
      Copy-Item $readmeHtml (Join-Path $root "README.html") -Force
      Write-Host "  [OK] README.html" -ForegroundColor DarkGreen
    }

    # Copy sample glazes
    if (Test-Path $sampleGlazes) {
      Copy-Item $sampleGlazes (Join-Path $root "sample-glazes.json") -Force
      Write-Host "  [OK] sample-glazes.json" -ForegroundColor DarkGreen
    }

    # Write quick-start text
    $quickStart | Out-File (Join-Path $root "QUICK-START.txt") -Encoding UTF8
    Write-Host "  [OK] QUICK-START.txt" -ForegroundColor DarkGreen

    $flashed++

    # Eject if requested
    if ($Eject) {
      $vol = (New-Object -ComObject Shell.Application).Namespace(17).ParseName($drive.DeviceID)
      if ($vol) {
        $vol.InvokeVerb("Eject")
        Write-Host "  [OK] Ejected" -ForegroundColor DarkGreen
      }
    }
  }
  catch {
    Write-Host "  [FAIL] $($_.Exception.Message)" -ForegroundColor Red
  }
}

Write-Host ""
Write-Host "Done. $flashed / $($usbDrives.Count) drives flashed." -ForegroundColor Cyan
if (-not $Eject) {
  Write-Host "Tip: Run with -Eject to safely eject drives after flashing." -ForegroundColor DarkGray
}
