import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const FALLBACK_LOCALE: Locale = "zh-TW";

const fallbackContext: LanguageContextType = {
  locale: FALLBACK_LOCALE,
  setLocale: () => {
    // no-op fallback to avoid hard crash when provider is temporarily unavailable (e.g. HMR)
  },
  t: (key: string) => translations[FALLBACK_LOCALE]?.[key] ?? key,
};

const LanguageContext = createContext<LanguageContextType>(fallbackContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(FALLBACK_LOCALE);

  const value = useMemo<LanguageContextType>(
    () => ({
      locale,
      setLocale,
      t: (key: string) => translations[locale]?.[key] ?? key,
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

