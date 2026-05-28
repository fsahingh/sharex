# sharex

## Configuration

Runtime database and email proxy settings live in `config.js`.

To point the app at another backend, copy `config.sample.js` to `config.js`
and update:

- `supabaseUrl`
- `supabaseAnonKey`
- `appsScriptUrl`
- `appsScriptToken`

The Supabase anon key and Apps Script token are loaded by the browser, so do
not treat them as server-side secrets.
