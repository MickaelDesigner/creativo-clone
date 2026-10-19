# security-seo-hardening

Branch: `fix/security-seo-hardening` (from main). No push, no deploy (Mickael's call).
Source: Ghost + Neo audit 2026-10-19 (Engram obs #941).

## Test-first exception
No test runner in this repo (package.json: dev/build/start/lint). RED/GREEN not applicable;
functional checks (build, lint, tsc, API probes, node sanitizer probe, curl, screenshots) are used instead.

## Tasks
- [x] T1 Upgrade next + eslint-config-next to latest 16.2.x (>=16.2.11). Route: inline (package.json/lock only).
  - Checks: npm audit --omit=dev before/after; build.
- [x] T2 Harden /api/contact and /api/newsletter (zod, escaping, generic errors, honeypot, min fill time). Route: inline (3 files: route, newsletter, ContactContent form), single coherent change, no research left.
  - Checks: API probes with RESEND_API_KEY= empty; Playwright click on form.
- [x] T3 Sanitize blog HTML with sanitize-html (allowlist from real posts). Route: inline.
  - Checks: node probe of helper; before/after screenshots ES + EN post.
- [ ] T4 Project detail SEO + duplicated title suffix. Route: inline.
  - Checks: curl built HTML title + canonical for 3 projects; titles of /projects /about /contact /blog.

## Progress / evidence
- T1 done: next + eslint-config-next 16.2.6 -> 16.2.12. audit --omit=dev before: 1 critical, 4 high, 3 moderate (8). After: 1 critical, 4 high, 3 moderate (8), build OK.
  BRIEF CONTRADICTED: advisories were updated after the audit. GHSA-mcj8 (ISR cache poisoning), SSRF image optimization and 3 critical RCEs (incl. next/og ImageResponse GHSA-vcvr, used in app/og/route.tsx) now list the fix in 16.3.6-16.3.8, not 16.2.11. No 16.2.x clears them. Staying on 16.2.12 (scope); 16.3.8+ is Mickael's decision.

- T2 done (commit c473464 was T1). zod ^4 added as direct dep. Probes with RESEND_API_KEY= empty on `next start`: malformed JSON 400 generic; {} 400; bad email 400; 10k name 400; bad service enum 400; honeypot (`website`) 200 + log "bot signal"; `ts` < 3s 200 + same log; valid payload reaches send, 500 generic ("Missing API key" only in server log). Newsletter bad email 400. Playwright click on /contact submit: UI shows error state ("Error: Network error. Email me at ...") without internals.
  STOPPED PARTIAL: the form lives in app/components/ContactContent.tsx (not in allowed `ContactForm*.tsx`). The hidden `website` input and the `ts` field are NOT added to the form; the route enforces both only when present. Needs authorization to edit ContactContent.tsx (also its `data.detail` fallback now shows "Network error").
- T2 commit: 6867f3d.
- T3 done: sanitize-html + @types/sanitize-html; helper app/lib/sanitize-post-html.ts (allowlist from real posts: h2/h3, p, hr, strong, em, ul/ol/li, blockquote, pre/code, table family; plus a/img/figure/h1-h6/br; rel noopener noreferrer on external links; schemes http/https/mailto; img http/https). Applied at the sink in app/blog/[slug]/page.tsx (server component).
  FINDINGS: (1) the Supabase legacy anon key is disabled ("Legacy API keys are disabled", 2026-08-12), so content_posts could not be read: DB post markup is UNVERIFIED, allowlist is derived from the 7 static posts in app/lib/posts.ts. (2) Pages render only the static POSTS (repo code), never the DB body; fetchPostBySlug/fetchPublishedPosts feed only /og and /carousel. (3) Sanitizing inside posts.ts (even via dynamic import) put sanitize-html in a client chunk because BlogContent (client) imports posts.ts; reverted, verified no client chunk contains it. (4) /es/blog/[slug] (app/es, outside allowed surface) still renders post.body unsanitized; trusted static content today.
  Checks: node probe: script, img onerror, javascript: href, iframe, style, svg onload, on* attrs stripped; headings/lists/links/code/table/hr preserved (only `<hr>` -> `<hr />`). 7 posts x 2 routes: body HTML identical before/after except `->>` in a code block of stack-saas-ia-2026 serialized as `-&gt;&gt;` (same rendered text). Full-page screenshots EN pixel-identical (bbox None); ES: screenshot of /blog/stack-saas-ia-2026 inspected visually (renders correctly); the ES "before" shot was taken on /es/ route so a pixel diff is not valid, DOM body comparison is the evidence.
