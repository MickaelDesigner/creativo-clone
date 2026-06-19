import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Mickael Vasquez",
  description:
    "Privacy Policy for CreativeCode CRM — how Mickael Vasquez handles data collected through Facebook and Instagram integrations.",
  alternates: { canonical: "https://mickaelvasquez.tech/privacy" },
};

const EFFECTIVE_DATE = "June 1, 2026";
const CONTACT_EMAIL = "hola@mickaelvasquez.tech";

const sections = [
  {
    id: "information-collected",
    title: "1. Information We Collect",
    content: `Through the CreativeCode CRM application, we may collect the following data when you interact with us via Instagram or Facebook: Instagram Direct Messages (message content and sender metadata), Facebook Messenger conversations (message content and sender metadata), and public profile information (username, profile picture) as exposed by platform APIs. We do not collect sensitive personal data such as payment information, government IDs, or health-related data.`,
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Data",
    content: `Data is used exclusively for internal purposes: client relationship management (organizing and responding to inquiries in a centralized CRM), communication history (providing consistent, contextual responses), and project coordination (linking conversations to ongoing projects). We do not use your data for advertising, profiling, or automated decision-making.`,
  },
  {
    id: "no-third-parties",
    title: "3. Data Sharing",
    content: `We do not sell, rent, or share your personal data with any third party for commercial purposes. Data may be accessed only by internal team members directly involved in responding to your inquiry, by Meta (Facebook/Instagram) as the originating platform (governed by their own privacy policies), or when required by applicable law or court order.`,
  },
  {
    id: "data-security",
    title: "4. Data Security",
    content: `We apply industry-standard measures to protect your data: access is restricted to authorized team members, data in transit is protected via HTTPS/TLS, API tokens and credentials are stored in encrypted vaults and never exposed in source code, and periodic access reviews are performed. No method of internet transmission is 100% secure — please notify us immediately if you suspect unauthorized access.`,
  },
  {
    id: "user-rights",
    title: "5. Your Rights",
    content: `You have the right to: Access — request a copy of the personal data we hold about you. Rectification — ask us to correct inaccurate data. Deletion — request erasure of your personal data from our systems. Portability — receive your data in a structured, machine-readable format. Objection — object to processing in specific circumstances. To exercise any right, contact us at ${CONTACT_EMAIL}. We respond within 30 days.`,
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    content: `We retain conversation data only as long as necessary to fulfill its purpose — typically for the duration of an active client relationship and up to 12 months after the last interaction. Data is then deleted or anonymized unless a legal obligation requires longer retention.`,
  },
  {
    id: "meta-platform",
    title: "7. Meta Platform Integration",
    content: `CreativeCode CRM integrates with Meta's platforms (Facebook and Instagram) via the Meta Graph API. Our use is governed by Meta's Platform Terms and Developer Policies. Messages exchanged on Instagram or Facebook are also subject to Meta's Privacy Policy (facebook.com/privacy/policy). We only access data explicitly shared with our account through those platforms.`,
  },
  {
    id: "changes",
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy to reflect changes in our practices or legal requirements. When we do, we update the effective date at the top of this page. Continued use of our services after any changes constitutes acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "9. Contact",
    content: `For questions, concerns, or requests regarding this Privacy Policy, contact us at: Email: ${CONTACT_EMAIL} — Website: https://mickaelvasquez.tech`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#141414] text-white">
      {/* Header */}
      <header className="px-6 sm:px-10 lg:px-24 pt-20 pb-12 border-b border-white/10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors duration-200 mb-10 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
          Mickael Vasquez.
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FF0055]" />
          <span className="text-[#FF0055] text-sm tracking-widest uppercase">Legal</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-white/40 text-sm">
          Effective date:{" "}
          <time dateTime="2026-06-01" className="text-white/60">
            {EFFECTIVE_DATE}
          </time>
        </p>
        <p className="mt-6 text-white/60 max-w-2xl leading-relaxed">
          This Privacy Policy describes how{" "}
          <strong className="text-white">Mickael Vasquez</strong> handles
          information collected through the{" "}
          <strong className="text-white">CreativeCode CRM</strong> application,
          which integrates with Facebook and Instagram messaging via the Meta
          Graph API.
        </p>
      </header>

      {/* Sections */}
      <section className="px-6 sm:px-10 lg:px-24 py-16">
        <div className="max-w-3xl flex flex-col gap-14">
          {sections.map((s) => (
            <article key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 pb-3 border-b border-white/10">
                {s.title}
              </h2>
              <p className="text-white/60 leading-relaxed text-base sm:text-lg">
                {s.content}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-10 lg:px-24 py-12 border-t border-white/10 flex items-center justify-between">
        <Link
          href="/"
          className="text-white/40 hover:text-white text-sm transition-colors duration-200 group inline-flex items-center gap-2"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
          Back to home
        </Link>
        <span className="text-white/20 text-xs">
          © {new Date().getFullYear()} Mickael Vasquez
        </span>
      </footer>
    </main>
  );
}
