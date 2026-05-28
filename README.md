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
