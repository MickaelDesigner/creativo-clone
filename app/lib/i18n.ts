import { en, type Dict } from "./dictionaries/en";
import { es } from "./dictionaries/es";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dict> = { en, es };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? en;
}

export type { Dict };
