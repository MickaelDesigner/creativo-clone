"use client";

import { createContext, useContext, useEffect } from "react";
import { getDict, defaultLocale, type Dict, type Locale } from "./i18n";

type LangValue = { locale: Locale; t: Dict };

const LangContext = createContext<LangValue>({
  locale: defaultLocale,
  t: getDict(defaultLocale),
});

export function LangProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  // Keep <html lang> in sync with the active locale (root layout SSRs "en").
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LangContext.Provider value={{ locale, t: getDict(locale) }}>
      {children}
    </LangContext.Provider>
  );
}

/** Full dictionary for the current locale (defaults to English outside a provider). */
export function useT(): Dict {
  return useContext(LangContext).t;
}

export function useLocale(): Locale {
  return useContext(LangContext).locale;
}

/** Build the equivalent path in the other language. `/` ⇄ `/es`. */
export function altPath(pathname: string, target: Locale): string {
  const stripped = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  if (target === "es") return stripped === "/" ? "/es" : `/es${stripped}`;
  return stripped;
}
