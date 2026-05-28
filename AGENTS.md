# AGENTS.md

## Project

This is a single-file shared expense web app. The UI, styles, and Supabase client logic live in `index.html`; `README.md` is currently minimal.

## Working Notes

- Keep changes tightly scoped because the app is intentionally compact.
- Prefer existing UI patterns: modal sheets, `.btn`, `.field`, inline SVG icons, and the current vanilla JavaScript style.
- Supabase business logic is mostly behind RPC calls. When a feature changes settlement semantics, update the frontend contract clearly and avoid pretending the browser alone can permanently change backend settlement rules.
- Runtime backend/mail settings are loaded from `config.js` through `window.SHARED_EXPENSES_CONFIG`; keep deploy-specific credentials out of `index.html` and out of upstream PRs.
- Use `rg` for searches and `apply_patch` for manual edits.
- Before handing off, run at least a JavaScript syntax check over the script portion of `index.html`.

## Domain Notes

- The shared pool is the default recipient for pre-payments and default payer for shared expenses. Older/forked data may represent that pool as a `KASA` person.
- Cancellation uses the capped withdrawal rule: the cancelled person forfeits any positive prepaid balance, but their final balance is not allowed to go below zero.
- Settlement summary per-active-person math is `(regular expenses - cancelled members' pre-payments held in the pool) / active participants`.
