# Working order — build real commits

Use this folder as your **actual repository**. Open the separate reference ZIP only to learn the implementation and then write/review the changes here. Do not copy the full reference in a single initial commit.

1. Run `npm install` and `npx playwright install chromium firefox`.
2. Run `git init`, `git branch -M main`, `git add .`, `git commit -m "chore: initialize Playwright TypeScript project"`. This initial commit contains only scaffolding plus the generated lockfile.
3. Write and validate `LoginPage.ts` and the two login tests; commit `test(e2e): cover valid and invalid login`.
4. Write and validate the other pages and checkout test; commit `test(e2e): automate cart and checkout with POM`.
5. Write, run and understand the authenticated API lifecycle; commit `test(api): verify authenticated booking CRUD lifecycle`.
6. Create the JMeter file using the GUI or study reference; run for 60 seconds, inspect the HTML dashboard, commit JMX and actual evidence; commit `test(performance): add JMeter 10-user load scenario`.
7. Create `.github/workflows/playwright.yml`, push and verify the Actions run; commit `ci: run Playwright tests with GitHub Actions`.
8. Replace the placeholder README with truthful results, reasons, limitations and AI disclosure; commit `docs: record verified results and AI-assisted decisions`.

For each step, use `git status`, `git diff`, `git add <specific files>` and `git commit -m "..."`. Do not fabricate dates, results, or commits.

The separate complete reference archive is a learning aid, not your execution evidence.
