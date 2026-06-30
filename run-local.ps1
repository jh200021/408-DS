$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host 'npm was not found. Please install Node.js 20 or newer first.' -ForegroundColor Red
  exit 1
}

if (-not (Test-Path '.\node_modules')) {
  Write-Host 'First run: installing dependencies...'
  npm ci
}

Write-Host 'Building production files...'
npm run build

$url = 'http://127.0.0.1:4173/'
$existing = Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue

if ($existing) {
  Write-Host "Port 4173 is already running. Opening $url"
  Start-Process $url
  exit 0
}

Write-Host "Starting local server: $url"
Start-Process powershell -WindowStyle Minimized -ArgumentList @(
  '-NoExit',
  '-ExecutionPolicy', 'Bypass',
  '-Command',
  "Set-Location '$projectRoot'; npm run preview -- --host 127.0.0.1"
)

Start-Sleep -Seconds 3
Start-Process $url
