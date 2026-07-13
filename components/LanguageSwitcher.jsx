"use client";

import { useRouter } from "next/navigation";
import { LOCALE_DETAILS, LOCALES } from "../lib/i18n/config";

const LOCALE_COOKIE = "framform_locale";

export default function LanguageSwitcher({
  locale,
  dictionary,
  copy,
  view = "login",
  currentView,
  compact = false,
}) {
  const router = useRouter();
  const languageCopy = copy || dictionary?.language;
  const label = languageCopy?.switcherLabel || "Language";
  const preservedView = currentView || view;

  const changeLocale = (nextLocale) => {
    if (nextLocale === locale) return;

    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    const query = preservedView && preservedView !== "login" ? `?view=${encodeURIComponent(preservedView)}` : "";
    router.push(`/${nextLocale}${query}`);
  };

  return (
    <nav
      aria-label={label}
      className={`language-switcher${compact ? " language-switcher--compact" : ""}`}
    >
      {LOCALES.map((candidate) => (
        <button
          aria-current={candidate === locale ? "page" : undefined}
          aria-label={LOCALE_DETAILS[candidate].label}
          disabled={candidate === locale}
          key={candidate}
          lang={LOCALE_DETAILS[candidate].lang}
          onClick={() => changeLocale(candidate)}
          type="button"
        >
          {compact ? LOCALE_DETAILS[candidate].code : LOCALE_DETAILS[candidate].label}
        </button>
      ))}
    </nav>
  );
}
