# security-seo-hardening

Branch: `fix/security-seo-hardening` (from main). No push, no deploy (Mickael's call).
Source: Ghost + Neo audit 2026-10-19 (Engram obs #941).

## Test-first exception
No test runner in this repo (package.json: dev/build/start/lint). RED/GREEN not applicable;
functional checks (build, lint, tsc, API probes, node sanitizer probe, curl, screenshots) are used instead.

## Tasks
- [x] T1 Upgrade next + eslint-config-next to latest 16.2.x (>=16.2.11). Route: inline (package.json/lock only).
  - Checks: npm audit --omit=dev before/after; build.
- [ ] T2 Harden /api/contact and /api/newsletter (zod, escaping, generic errors, honeypot, min fill time). Route: inline (3 files: route, newsletter, ContactContent form), single coherent change, no research left.
  - Checks: API probes with RESEND_API_KEY= empty; Playwright click on form.
- [ ] T3 Sanitize blog HTML with sanitize-html (allowlist from real posts). Route: inline.
  - Checks: node probe of helper; before/after screenshots ES + EN post.
- [ ] T4 Project detail SEO + duplicated title suffix. Route: inline.
  - Checks: curl built HTML title + canonical for 3 projects; titles of /projects /about /contact /blog.

## Progress / evidence
- T1 done: next + eslint-config-next 16.2.6 -> 16.2.12. audit --omit=dev before: 1 critical, 4 high, 3 moderate (8). After: 1 critical, 4 high, 3 moderate (8), build OK.
  BRIEF CONTRADICTED: advisories were updated after the audit. GHSA-mcj8 (ISR cache poisoning), SSRF image optimization and 3 critical RCEs (incl. next/og ImageResponse GHSA-vcvr, used in app/og/route.tsx) now list the fix in 16.3.6-16.3.8, not 16.2.11. No 16.2.x clears them. Staying on 16.2.12 (scope); 16.3.8+ is Mickael's decision.

