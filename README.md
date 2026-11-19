# QA Automation Technical Assessment

## Project Overview

This repository demonstrates a compact QA automation solution for three complementary test layers:

- UI end-to-end coverage of [SauceDemo](https://www.saucedemo.com/) login, cart, and checkout flows.
- API coverage of the [Restful Booker](https://restful-booker.herokuapp.com/) authenticated booking lifecycle.
- A read-only JMeter load test against the public Restful Booker API.

The solution is intentionally small and focused to fit a time-boxed technical assessment.

## Tech Stack

- Playwright Test and TypeScript
- Page Object Model (POM)
- Chromium and Firefox
- Node.js and npm
- Apache JMeter 5.6.3
- GitHub Actions

## Project Structure

```text
.
|-- .github/workflows/playwright.yml  # CI workflow
|-- pages/                            # SauceDemo page objects
|-- tests/e2e/                        # Browser scenarios
|-- tests/api/                        # Restful Booker API scenario
|-- jmeter/booking-load.jmx           # Load-test plan
|-- jmeter-report/                    # Committed HTML load-test evidence
|-- playwright.config.ts              # Projects, reporters, and test settings
|-- package.json                      # Scripts and dependencies
`-- tsconfig.json                     # TypeScript validation settings
```

## Prerequisites

- Node.js LTS with npm
- Chromium and Firefox binaries installed through Playwright
- Java 8 or later and Apache JMeter 5.6.3 to run the load test
- Internet access to the public SauceDemo and Restful Booker environments

## Installation

From PowerShell or another terminal in the repository root:

```powershell
npm ci
npx playwright install chromium firefox
```

Use `npm install` instead of `npm ci` only when intentionally updating dependencies or the lockfile.

## Running E2E Tests

Run the SauceDemo scenarios in Chromium and Firefox:

```powershell
npm run test:e2e
```

Run the Chromium project with a visible browser for local debugging:

```powershell
npm run test:headed
```

## Running API Tests

Run the Restful Booker CRUD scenario:

```powershell
npm run test:api
```

Run every Playwright project, including UI and API tests:

```powershell
npm test
```

After a run, open the generated Playwright HTML report with:

```powershell
npm run report
```

## Running JMeter Load Tests

The test plan uses 10 virtual users, a 10-second ramp-up, a 60-second duration, a one-second pause between requests, and `GET /booking` assertions. To preserve the committed evidence and keep generated files outside the repository, use unique paths under the Windows temporary directory:

```powershell
$runId = Get-Date -Format 'yyyyMMdd-HHmmss'
$jtlPath = Join-Path $env:TEMP "booking-$runId.jtl"
$reportPath = Join-Path $env:TEMP "jmeter-report-$runId"
jmeter -n -t .\jmeter\booking-load.jmx -l $jtlPath -e -o $reportPath
Start-Process (Join-Path $reportPath 'index.html')
```

The output JTL file and report directory must not already exist when JMeter starts. The timestamp makes collisions unlikely. The existing verified dashboard remains available at `jmeter-report\index.html`.

## GitHub Actions

The `Playwright Tests` workflow runs on pushes and pull requests targeting `main`, and can also be started manually. It uses Node.js LTS, installs dependencies with `npm ci`, installs Chromium and Firefox with their Linux dependencies, validates TypeScript, and runs all Playwright projects. The HTML report is uploaded as the `playwright-report` artifact for 14 days even when validation or tests fail.

JMeter is intentionally excluded from CI because this assessment requires only Playwright execution in the pipeline and the load test targets a shared public service.

## Test Results

The following results are evidence from executions completed before this final documentation update:

| Layer  | Scope                                                                  | Recorded result                |
| ------ | ---------------------------------------------------------------------- | ------------------------------ |
| UI E2E | 3 scenarios in Chromium and Firefox                                    | 6 executions passed            |
| API    | Authenticated create, read, update, verify, delete, and deletion check | 1 scenario passed              |
| Load   | 10 users for 60 seconds against `GET /booking`                         | 365 requests, 0 errors (0.00%) |

The committed JMeter statistics also record an average response time of approximately 506 ms and throughput of approximately 6.22 requests/second. Results from public demo systems can vary with service availability and network conditions.

## Technical Decisions

- **TypeScript:** strict static checks catch type and API-usage mistakes before test execution and improve editor support without adding runtime complexity.
- **Page Object Model:** selectors and page actions are kept out of test intent, reducing duplication across the SauceDemo flows while remaining proportionate to the suite size.
- **Chromium and Firefox:** the same critical user journeys run against two independent browser engines for useful cross-browser confidence without an excessive matrix.
- **Token authentication:** Restful Booker requires an authenticated token for update and delete operations; the scenario obtains it through `/auth` and sends it in the request cookie.
- **Read-only load:** `GET /booking` applies repeatable load to a public API without creating, changing, or deleting shared data.
- **Dependent CRUD scenario:** the booking ID and token are created at runtime and each operation validates the state needed by the next one. Keeping the lifecycle in one scenario makes its dependency and cleanup sequence explicit and avoids cross-test state sharing.

## Challenges and Limitations

- SauceDemo and Restful Booker are external public services, so availability, latency, throttling, or shared test data may affect results.
- The API CRUD lifecycle is intentionally dependent; a failure in an early operation prevents meaningful validation of later operations.
- UI coverage targets the main assessment flows and two desktop browsers; it does not cover mobile viewports, accessibility, visual regression, or every error path.
- The load result is a short baseline from one environment, not a capacity or production-performance benchmark.
- No secrets are required or stored. The Restful Booker demo credentials are public values documented by that service.

## Improvements With More Time

- Add isolated API test data cleanup that also runs after intermediate failures.
- Expand negative API validation and selected SauceDemo edge cases.
- Add accessibility checks and a small mobile-browser project where risk justifies it.
- Pin dependency updates through an automated, reviewed maintenance process.
- Compare repeated load-test runs from a controlled environment before defining performance thresholds.

## AI Usage Disclosure

AI assistance was used to propose project and documentation structure, generate implementation examples, and review code and configuration. The developer subsequently reviewed the suggested content and executed the relevant tests. This disclosure does not claim corrections, decisions, or validations beyond those evidenced in the repository and recorded results.

## Development Time

**Total effective development time:** 3 hours (excluding breaks).
