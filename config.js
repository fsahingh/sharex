// ============================================================
//  Shared Expenses — runtime configuration
// ============================================================
// These values are loaded by the browser before index.html's main script.
// Because this is a static site, they are visible to anyone who views the
// page. That's expected:
//   - The Supabase anon key is meant to be public; Row Level Security (RLS)
//     policies protect your data, not the key.
//   - The Apps Script token is only a light speed-bump against random
//     requests to the mail proxy, not real security.
// To point the app at a different backend, edit the values below.

window.SHARED_EXPENSES_CONFIG = {
  supabaseUrl: 'https://cptzfqfyrkjgwxkhpfnd.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdHpmcWZ5cmtqZ3d4a2hwZm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMTUyNTcsImV4cCI6MjA5NDY5MTI1N30.moWZjpyIRDJ7Sc2uVw39zLBlZveLGzke-fDadIneymc',
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbwd3vf7bohnPBKhBihPt44RfRaFogNhwHfmB5KSTiw08kpQvhvygrAWbQtFl8kNNrF7FQ/exec',
  appsScriptToken: '12lknds9wrlknds0w3rnlewkfn203rhnewlkn120921hnwlfk'
};
