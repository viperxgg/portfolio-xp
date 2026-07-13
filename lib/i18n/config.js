export const LOCALES = ["sv", "en", "ar"];
export const DEFAULT_LOCALE = "sv";

export const LOCALE_DETAILS = {
  sv: { code: "SV", label: "Svenska", lang: "sv", dir: "ltr", intl: "sv-SE", og: "sv_SE" },
  en: { code: "EN", label: "English", lang: "en", dir: "ltr", intl: "en-GB", og: "en_GB" },
  ar: { code: "AR", label: "العربية", lang: "ar", dir: "rtl", intl: "ar", og: "ar_SE" },
};

export function isLocale(value) {
  return LOCALES.includes(value);
}
