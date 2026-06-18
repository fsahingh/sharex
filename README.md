# sharex

A single-page shared trip-expense web app backed by Supabase, with optional
settlement emails sent through a Google Apps Script mail proxy.

## Configuration

Runtime database and email-proxy settings live in `config.js`, which the
browser loads before the app starts (it sets `window.SHARED_EXPENSES_CONFIG`).

To point the app at a different backend, copy `config.sample.js` to `config.js`
and update:

- `supabaseUrl`
- `supabaseAnonKey`
- `appsScriptUrl`
- `appsScriptToken`

`config.js` is committed to the repo so the GitHub Pages deployment can serve
it. That means these values are visible in the browser — which is expected:

- The Supabase **anon key** is designed to be public. Your data is protected by
  Row Level Security (RLS) policies, not by hiding the key.
- The Apps Script **token** is only a light speed-bump against random requests
  to the mail proxy, not real server-side security.

If you later want to keep these values out of the repo entirely, you can move
`config.js` into `.gitignore` and generate it at deploy time from CI secrets
(e.g. a GitHub Actions workflow). The app already reads everything through
`window.SHARED_EXPENSES_CONFIG`, so no code changes are needed for that switch.

## Structure

- `index.html` — markup + the entire app logic in one inline `<script>` block.
- `styles.css` — all CSS, extracted from `index.html` (previously five
  separate `<style>` blocks scattered through the file).
- `config.js` / `config.sample.js` — runtime Supabase/Apps Script config.

## Testing

`package.json` and `vitest.config.js` set up a minimal Vitest harness
(`npm install && npm test`). `test/esc.test.js` is a smoke test for the
`esc()`/`money()` sanitization/formatting helpers.

This is intentionally a starting point, not real coverage. The blocker for
proper unit testing is architectural: `index.html` defines ~300 functions
inside a single non-module inline `<script>` (no `export`, everything is an
implicit global wired up via DOM event listeners). There is no clean seam to
`import` a function from index.html into a test file today, so the example
test copies the `esc()`/`money()` implementations verbatim with a comment
explaining why, rather than importing them.

To get real test coverage without risking the production app, the
recommended path is:

1. Extract pure, side-effect-free helpers (`esc`, `money`, date formatting,
   calculation helpers) into a small `js/utils.js` module with explicit
   `export`s.
2. Load it from `index.html` via `<script type="module" src="js/utils.js">`
   (or a plain `<script src="js/utils.js">` that still attaches to
   `window`, if avoiding ES module syntax in production is preferred).
3. Update the call sites in the inline script to use the shared
   implementation rather than a private copy.
4. Only then write tests that `import` from `js/utils.js` directly.

This was deliberately *not* done in this pass — splitting code out of an
11,500-line production script carries real risk of subtle breakage, and
should be its own careful, reviewed change with the actual user-facing
behavior tested afterward (see "Modularization" note below).

## Modularization (not done — recommendation only)

`index.html` has a single `<script>` block of roughly 11,500 lines and ~300
functions with no module boundaries. Splitting this into separate files
(e.g. by feature area: expenses, fines, dues, members, settlement, modals)
would meaningfully improve maintainability, but doing it safely requires:

- Mapping every function's dependencies on shared mutable state (the app
  appears to rely on module-level/global variables, not a passed-around
  state object).
- Deciding on a loading strategy (ES modules with explicit imports/exports,
  vs. multiple plain `<script>` tags relying on global scope, vs. a bundler).
- Verifying execution order is preserved — DOM-ready handlers, Supabase
  client init, and event listener wiring currently all happen in one
  guaranteed sequential pass; splitting into files risks reordering that
  if not done carefully.
- A full manual regression pass across every screen (expenses, dues, fines,
  settlements, member management, PWA install flow) since there is no
  automated test suite to catch breakage today.

Given the size (~11,500 lines, ~300 functions) and that this is a live
production app, this refactor was not attempted in this pass. It should be
done incrementally (e.g. one feature area at a time, each behind its own
manual test pass) rather than as a single large change.
