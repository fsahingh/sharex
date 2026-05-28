// ============================================================
//  Shared Expenses — runtime configuration (SAMPLE)
// ============================================================
// Copy this file to config.js and fill in your own values.
//
// Because this is a static site, these values reach the browser:
//   - The Supabase anon key is meant to be public; Row Level Security (RLS)
//     protects your data, not the key.
//   - The Apps Script token is only a light speed-bump, not real security.

window.SHARED_EXPENSES_CONFIG = {
  supabaseUrl: 'https://your-project-ref.supabase.co',
  supabaseAnonKey: 'your-supabase-anon-key',
  appsScriptUrl: 'https://script.google.com/macros/s/your-deployment-id/exec',
  appsScriptToken: 'your-mail-proxy-token'
};
