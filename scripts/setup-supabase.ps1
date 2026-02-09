# Stull Atlas — Supabase Setup
# 
# Interactive script that walks you through setting up Supabase.
# Run: .\scripts\setup-supabase.ps1
#
# What it does:
#   1. Opens Supabase in your browser to create a project
#   2. Waits for you to paste the URL and anon key
#   3. Creates .env.local with your credentials
#   4. Verifies the connection
#   5. Reminds you to run the SQL schema

param([switch]$SkipBrowser)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
if (-not (Test-Path "$projectRoot\package.json")) { $projectRoot = Split-Path -Parent $PSScriptRoot }
if (-not (Test-Path "$projectRoot\package.json")) { $projectRoot = $PSScriptRoot }

$envFile = Join-Path $projectRoot ".env.local"

Write-Host "`n╔═══════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Stull Atlas — Supabase Setup        ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════╝`n" -ForegroundColor Cyan

# Check if already configured
if (Test-Path $envFile) {
    $existing = Get-Content $envFile -Raw
    if ($existing -match 'VITE_SUPABASE_URL=https://[a-z0-9]+\.supabase\.co') {
        Write-Host "Found existing .env.local with Supabase config." -ForegroundColor Yellow
        $overwrite = Read-Host "Overwrite? (y/N)"
        if ($overwrite -ne 'y') {
            Write-Host "Keeping existing config. Done!" -ForegroundColor Green
            exit 0
        }
    }
}

# Step 1: Create project
Write-Host "STEP 1: Create a Supabase project" -ForegroundColor Yellow
Write-Host "  - Go to https://supabase.com/dashboard/projects" -ForegroundColor White
Write-Host "  - Click 'New Project'" -ForegroundColor White
Write-Host "  - Name: 'stull-atlas' (or whatever you like)" -ForegroundColor White
Write-Host "  - Region: Choose closest to your users (US East for NCECA)" -ForegroundColor White
Write-Host "  - Set a strong database password (save it somewhere safe)" -ForegroundColor White
Write-Host ""

if (-not $SkipBrowser) {
    Start-Process "https://supabase.com/dashboard/projects"
    Write-Host "  (Opened browser)" -ForegroundColor DarkGray
}

Write-Host ""
Read-Host "Press Enter when your project is created..."

# Step 2: Get credentials
Write-Host "`nSTEP 2: Get your API credentials" -ForegroundColor Yellow
Write-Host "  - Go to Project Settings > API" -ForegroundColor White
Write-Host "  - Copy the 'Project URL' and 'anon public' key" -ForegroundColor White
Write-Host ""

$supabaseUrl = Read-Host "Paste your Project URL (https://xxxxx.supabase.co)"
$supabaseUrl = $supabaseUrl.Trim().TrimEnd('/')

if ($supabaseUrl -notmatch '^https://[a-z0-9-]+\.supabase\.co$') {
    Write-Host "WARNING: URL doesn't match expected pattern. Continuing anyway..." -ForegroundColor Yellow
}

$anonKey = Read-Host "Paste your anon (public) key"
$anonKey = $anonKey.Trim()

if ($anonKey.Length -lt 100) {
    Write-Host "WARNING: Key looks short. Supabase anon keys are usually 200+ chars." -ForegroundColor Yellow
}

# Step 3: Stripe (optional)
Write-Host "`nSTEP 3: Stripe payment links (optional — skip if not ready)" -ForegroundColor Yellow
Write-Host "  - Create payment links at https://dashboard.stripe.com/payment-links" -ForegroundColor White
Write-Host "  - Solo tier: \$8/month recurring" -ForegroundColor White
Write-Host "  - Pro tier: \$18/month recurring" -ForegroundColor White
Write-Host ""

$stripeSolo = Read-Host "Solo payment link URL (or press Enter to skip)"
$stripePro = Read-Host "Pro payment link URL (or press Enter to skip)"

# Step 4: Demo mode
Write-Host "`nSTEP 4: Demo mode (for NCECA booth)" -ForegroundColor Yellow
$demoMode = Read-Host "Enable demo mode by default? (y/N)"

# Step 5: Write .env.local
Write-Host "`nSTEP 5: Writing .env.local..." -ForegroundColor Yellow

$envContent = @"
# Stull Atlas Environment — Generated $(Get-Date -Format 'yyyy-MM-dd HH:mm')
# This file is gitignored. Do not commit.

# Supabase
VITE_SUPABASE_URL=$supabaseUrl
VITE_SUPABASE_ANON_KEY=$anonKey

"@

if ($stripeSolo) {
    $envContent += "# Stripe`nVITE_STRIPE_LINK_SOLO=$stripeSolo`n"
}
if ($stripePro) {
    $envContent += "VITE_STRIPE_LINK_PRO=$stripePro`n"
}
if (-not $stripeSolo -and -not $stripePro) {
    $envContent += "# Stripe (add when ready)`n# VITE_STRIPE_LINK_SOLO=https://buy.stripe.com/xxx`n# VITE_STRIPE_LINK_PRO=https://buy.stripe.com/yyy`n"
}

$envContent += "`n"

if ($demoMode -eq 'y') {
    $envContent += "# Demo mode — unlocks all features without auth`nVITE_DEMO_MODE=true`n"
} else {
    $envContent += "# Demo mode — set to 'true' for NCECA booth`n# VITE_DEMO_MODE=true`n"
}

Set-Content -Path $envFile -Value $envContent -Encoding UTF8
Write-Host "  Created $envFile" -ForegroundColor Green

# Step 6: Run SQL schema
Write-Host "`nSTEP 6: Set up the database schema" -ForegroundColor Yellow
Write-Host "  - Go to your Supabase project > SQL Editor" -ForegroundColor White
Write-Host "  - Copy the contents of docs/supabase-schema.sql" -ForegroundColor White
Write-Host "  - Paste and Run" -ForegroundColor White
Write-Host ""

$sqlFile = Join-Path $projectRoot "docs\supabase-schema.sql"
if (Test-Path $sqlFile) {
    Write-Host "  Schema file: $sqlFile" -ForegroundColor DarkGray
    $openSql = Read-Host "Open the SQL file for easy copying? (Y/n)"
    if ($openSql -ne 'n') {
        Start-Process $sqlFile
    }
}

$openSupa = Read-Host "Open Supabase SQL Editor in browser? (Y/n)"
if ($openSupa -ne 'n') {
    Start-Process "$supabaseUrl/project/default/sql"
}

Read-Host "Press Enter when the schema is applied..."

# Step 7: Generate trial codes
Write-Host "`nSTEP 7: Generate NCECA trial codes" -ForegroundColor Yellow
Write-Host "  In the Supabase SQL Editor, run:" -ForegroundColor White
Write-Host ""
Write-Host "    SELECT * FROM generate_trial_codes('NCECA_2026', 200);" -ForegroundColor White
Write-Host ""
Write-Host "  This creates 200 unique codes like NCECA-K7M2-P9X4." -ForegroundColor White
Write-Host "  Export the results to CSV for the card generator." -ForegroundColor White

# Step 8: Verify connection
Write-Host "`n`nSTEP 8: Verifying connection..." -ForegroundColor Yellow

try {
    # Quick test via curl
    $testUrl = "$supabaseUrl/rest/v1/"
    $headers = @{
        "apikey" = $anonKey
        "Authorization" = "Bearer $anonKey"
    }
    $response = Invoke-RestMethod -Uri $testUrl -Headers $headers -Method Get -ErrorAction Stop
    Write-Host "  Connection successful!" -ForegroundColor Green
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 200 -or $statusCode -eq 401) {
        # 401 is expected for unauthenticated — connection works
        Write-Host "  Connection successful (auth required, as expected)!" -ForegroundColor Green
    } else {
        Write-Host "  Could not verify connection: $($_.Exception.Message)" -ForegroundColor Yellow
        Write-Host "  This might be fine — try 'npm run dev' to test." -ForegroundColor Yellow
    }
}

# Summary
Write-Host "`n╔═══════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   Setup Complete!                     ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "  Next steps:" -ForegroundColor White
Write-Host "    1. npm run dev         — test locally" -ForegroundColor White
Write-Host "    2. Sign up in the app to test auth" -ForegroundColor White
Write-Host "    3. .\scripts\deploy.ps1 — deploy to rlv.lol" -ForegroundColor White
Write-Host ""
