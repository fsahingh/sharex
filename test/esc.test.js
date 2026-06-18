// Smoke test for the esc()/money() helpers used throughout index.html to
// sanitize user-supplied strings before they are inserted via innerHTML.
//
// NOTE on why this test re-declares the functions instead of importing them:
// index.html defines esc()/money() as plain functions inside one big inline
// <script> block (no `export`, no module system — see index.html around
// line 1564). There is currently no safe way to import them directly without
// either (a) turning that script into an ES module, which risks breaking the
// ~300 functions and global event wiring that depend on implicit globals, or
// (b) loading the whole file in a DOM/jsdom harness just to grab two
// functions. Both are bigger, riskier changes than this pass should make in
// a production app with live users.
//
// Instead, this test copies the exact implementation from index.html so the
// *behavior/contract* is pinned down and regressions in the copy would be
// caught by a human re-syncing it. This is intentionally a starting point,
// not full coverage. See README.md "Testing" section for the suggested next
// step (extract pure helpers into js/utils.js once the app is otherwise
// stable, then import them for real in both index.html and tests).

import { describe, it, expect } from 'vitest';

// --- copied verbatim from index.html (function esc / function money) ---
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function money(n) {
  var v = Number(n) || 0;
  return (v < 0 ? '-$' : '$') + Math.abs(v).toFixed(2);
}
// --- end copy ---

describe('esc()', () => {
  it('escapes HTML special characters', () => {
    expect(esc('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('escapes ampersands and quotes', () => {
    expect(esc('Tom & "Jerry"')).toBe('Tom &amp; &quot;Jerry&quot;');
  });

  it('returns an empty string for null/undefined', () => {
    expect(esc(null)).toBe('');
    expect(esc(undefined)).toBe('');
  });

  it('coerces non-string input to string', () => {
    expect(esc(42)).toBe('42');
  });

  it('leaves plain text untouched', () => {
    expect(esc('Groceries for the trip')).toBe('Groceries for the trip');
  });
});

describe('money()', () => {
  it('formats positive numbers with a dollar sign and two decimals', () => {
    expect(money(12.5)).toBe('$12.50');
  });

  it('formats negative numbers with a leading minus before the dollar sign', () => {
    expect(money(-3)).toBe('-$3.00');
  });

  it('treats non-numeric input as zero', () => {
    expect(money('not a number')).toBe('$0.00');
    expect(money(undefined)).toBe('$0.00');
  });
});
