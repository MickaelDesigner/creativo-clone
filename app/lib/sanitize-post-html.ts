import sanitizeHtml from "sanitize-html";

// Server-only helper: import only from server components. Importing it from a client component or
// from app/lib/posts.ts (client-reachable) ships sanitize-html in the browser bundle.
// Allowlist derived from the markup the real posts use (h2/h3, p, lists, tables, code, blockquote,
// em/strong, hr) plus links, images and basic structure.
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "hr",
    "strong", "b", "em", "i", "u", "s", "sub", "sup",
    "ul", "ol", "li",
    "blockquote", "pre", "code",
    "a", "img", "figure", "figcaption",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td",
  ],
  allowedAttributes: {
    a: ["href", "title", "rel", "target"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    th: ["colspan", "rowspan", "align"],
    td: ["colspan", "rowspan", "align"],
    code: ["class"],
    pre: ["class"],
  },
  allowedClasses: {
    code: [/^language-[\w-]+$/],
    pre: [/^language-[\w-]+$/],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  disallowedTagsMode: "discard",
  transformTags: {
    a: (tagName, attribs) => {
      const href = attribs.href ?? "";
      if (/^https?:\/\//i.test(href)) {
        return { tagName, attribs: { ...attribs, rel: "noopener noreferrer" } };
      }
      return { tagName, attribs };
    },
  },
};

export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, OPTIONS);
}
