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
- [x] T4 Project detail SEO + duplicated title suffix. Route: inline.
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
- T3 commit: 7495261.
- T4 done: new layout.tsx (metadata) for /projects/nexus-crm, /vitrina, /portfolio-web (pages are "use client", so metadata lives in layouts, same pattern as the orphan projects): own title, description, self canonical, hreflang, OG. Duplicate suffix fixed with `title: { absolute: <original text> }` on /projects, /about, /contact (layout), /blog (layout); copy unchanged.
  Checks (curl on `next start` build): each of the 3 projects has own <title>, description, canonical https://mickaelvasquez.tech/projects/<slug>, og:url; the 4 listed pages now emit a single suffix. tsc, lint (0 errors, 3 pre-existing warnings), build OK.
  Out of scope, noticed: app/es/** titles still carry the literal "· Mickael Vasquez" plus the template (e.g. /es/contact, /es/projects/*, /es/about); orphan project layouts also double the suffix.
- T4 commit: 76d83b6. Scope widened by JARVIS (ContactContent.tsx, app/es/**) and next 16.3.8 approved: T5-T7 below.
- [x] T5 ContactContent.tsx (route: inline). Hidden honeypot `website` (aria-hidden wrapper offscreen, tabIndex -1, autoComplete off), `ts` mount timestamp sent, no more `data.detail`, generic friendly error (EN/ES) with fallback email.
  Checks (RESEND_API_KEY= empty, next start, Playwright clicks): normal submit after 4 s wait reached the route (server log "Contact route error: Missing API key", UI shows the generic message); with `website` filled via evaluate, click produced no error, no new console error and the server logged the bot-drop line.
- T5 commit: 3670f69.
- [x] T6 ES routes (route: inline). sanitizePostHtml applied in app/es/blog/[slug]/page.tsx; duplicated title suffix removed: trailing literal "· Mickael Vasquez" dropped from es/projects/*, es/blog; `title.absolute` for es home, about, contact; post title no longer re-appends the suffix. Orphan project layouts untouched.
  Checks: 7 posts, ES route body HTML identical before/after (before = pre-sanitizer /es/blog capture; only `<hr />` and `-&gt;&gt;` serialization differences). Titles via curl now single suffix, e.g. "Contacto — Empieza un proyecto con Mickael Vasquez", "Nexus CRM — Caso de estudio · Mickael Vasquez". tsc OK, build OK.
- T6 commit: d5947b8.
- [x] T7 next + eslint-config-next 16.2.12 -> 16.3.8 (route: inline; release notes read: 16.3 changes are opt-in or perf, no breaking change or codemod required for this app).
  Checks: npm audit --omit=dev 1 critical / 2 high / 3 moderate (6) -> 0 critical / 0 high / 3 moderate (baseline-browser-mapping, dompurify, fflate). tsc OK, build OK. /og?slug=... 200 image/png 1200x630. Headless Chrome shots (home, /projects, /projects/nexus-crm, /contact, blog post; 1440 and 390) vs 16.2.12: no visual diff (the single 1973 px diff on nexus-crm 1440 also appears between two 16.2.12 runs, i.e. animation noise). Console errors on those 5 pages: 0. Contact/API probes repeat OK on 16.3.8.
  Full `npm run lint`: 3 errors (Nav.tsx x2 static-components, Services.tsx set-state-in-effect) + 6 warnings. NOT caused by the upgrade: identical result with eslint-config-next 16.2.12 (same eslint-plugin-react-hooks 7.1.1). Files are outside the allowed surface, left untouched.

## Follow-ups (branch fix/contact-rate-limit-and-lint)

- [~] T1 Rate limit /api/contact and /api/newsletter via Vercel Firewall (route: inline). Plan allows it (Hobby team; `vercel firewall rules add` accepted a rate_limit rule; the IP Bypass feature is the only thing gated, 402). Rule STAGED, NOT PUBLISHED (skill rule: the owner publishes): "Rate limit contact and newsletter", path in [/api/contact, /api/newsletter] AND method = POST, rate_limit 5 req / 600 s, key ip, fixed_window, exceeded -> 429. Read back with `vercel firewall diff`: "Pending changes (1): + Added rule ...". It lives in Vercel, not in the repo, so no commit. No code limiter was added (counters are per region, not per serverless instance, which is better than the in-memory fallback).
  To go live: from the repo run `vercel firewall publish --yes` (or dashboard: estudio-clone > Firewall > review the draft > Publish). Verify after: `vercel firewall rules list`, then 6 POSTs to /api/newsletter with an invalid body return 429 on the 6th. Undo: `vercel firewall rules disable "Rate limit contact and newsletter"`.
  Caveat: one rule per path set shares the counter per IP across both paths (10 min window).
- [x] T2 Lint errors (route: inline). Nav.tsx: `LangSwitch` component defined in render became `renderLangSwitch()` function (same JSX). Services.tsx: `display` is derived from `hovered` + a `step` index, the effect only advances the interval (setState in callback), step reset in onMouseEnter. Same 320 ms cadence (Figma, Prototyping, Wire-Frame, Creative Design, name).
  Checks: lint 3 errors -> 0 errors (6 pre-existing unused-var warnings remain in files outside the allowed surface). tsc OK. Playwright on `next start`: desktop click Nav About -> /about, ES switch -> /es/about; 390 px hamburger opens drawer (aria-expanded true, body overflow hidden, scrollWidth 390), ES in drawer -> /es; Services hover shows tags and name sequence, screenshot inspected.
- T2 commit: d17da41.
- [x] T3 npm audit fix, non-force (route: inline). `npm audit --omit=dev`: 3 moderate (baseline-browser-mapping, dompurify, fflate) -> 0 vulnerabilities. Only package-lock.json changed. tsc and build OK.
  Left: full `npm audit` still reports 5 high (braces via eslint-config-next, dev-only) which need `--force`; not applied.
- T3 commit: 311d8be.
- Contact form via Playwright click on `next start` with RESEND_API_KEY empty: route returned 500 (Missing API key), UI showed the generic error with fallback email; no email sent.
