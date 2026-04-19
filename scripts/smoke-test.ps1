<#
.SYNOPSIS
  Smoke test a deployed Sky Ride Panama instance (Cloud Run or any URL).

.DESCRIPTION
  Hits key pages and endpoints, verifying 200 responses and basic content.
  Use after deploying to Cloud Run to confirm the deployment is healthy.

.EXAMPLE
  .\scripts\smoke-test.ps1 -BaseUrl https://skyride-xxxxx-uc.a.run.app
  .\scripts\smoke-test.ps1 -BaseUrl https://www.skyride.city
#>

param(
  [Parameter(Mandatory=$true)]
  [string]$BaseUrl
)

$ErrorActionPreference = "Stop"
$BaseUrl = $BaseUrl.TrimEnd("/")

$pages = @(
  @{ Path = "/es"; Expect = "Sky Ride" },
  @{ Path = "/en"; Expect = "Sky Ride" },
  @{ Path = "/es/nuestra-flota"; Expect = "" },
  @{ Path = "/en/our-fleet"; Expect = "" },
  @{ Path = "/es/contacto"; Expect = "" },
  @{ Path = "/en/contact"; Expect = "" },
  @{ Path = "/es/blog"; Expect = "" },
  @{ Path = "/en/blog"; Expect = "" },
  @{ Path = "/es/reservar-con-martin"; Expect = "" },
  @{ Path = "/en/book-with-martin"; Expect = "" },
  @{ Path = "/robots.txt"; Expect = "Sitemap" },
  @{ Path = "/sitemap.xml"; Expect = "<urlset" }
)

$pass = 0
$fail = 0
$results = @()

Write-Host "Smoke testing $BaseUrl" -ForegroundColor Cyan
Write-Host ""

foreach ($page in $pages) {
  $url = "$BaseUrl$($page.Path)"
  try {
    $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20
    $ok = $res.StatusCode -eq 200
    if ($page.Expect -and $res.Content -notmatch [regex]::Escape($page.Expect)) {
      $ok = $false
      $reason = "missing '$($page.Expect)'"
    } else {
      $reason = "status $($res.StatusCode)"
    }
    if ($ok) {
      Write-Host "  [PASS] $($page.Path) — $reason" -ForegroundColor Green
      $pass++
    } else {
      Write-Host "  [FAIL] $($page.Path) — $reason" -ForegroundColor Red
      $fail++
    }
  } catch {
    Write-Host "  [FAIL] $($page.Path) — $($_.Exception.Message)" -ForegroundColor Red
    $fail++
  }
}

Write-Host ""
Write-Host "Results: $pass passed, $fail failed" -ForegroundColor $(if ($fail -eq 0) { "Green" } else { "Red" })

if ($fail -gt 0) { exit 1 }
