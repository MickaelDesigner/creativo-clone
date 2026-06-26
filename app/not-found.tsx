import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found · Mickael Vasquez",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 text-center">
      {/* Large 404 */}
      <span className="text-[12rem] sm:text-[18rem] font-bold tracking-tighter leading-none bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent select-none">
        404
      </span>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-4">
        Page not found
      </h1>

      <p className="text-white/50 text-base sm:text-lg mt-4 max-w-md leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
        Let&apos;s get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <Link
          href="/"
          className="group relative overflow-hidden bg-gradient-to-r from-accent to-pill-magenta rounded-full px-8 h-12 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            <svg className="group-hover:-translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back home
          </span>
        </Link>

        <Link
          href="/contact"
          className="rounded-full px-8 h-12 flex items-center justify-center text-white/70 font-semibold text-sm border border-white/20 hover:border-white/50 hover:text-white transition-all duration-300"
        >
          Contact me
        </Link>
      </div>
    </main>
  );
}
