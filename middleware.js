import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "./lib/i18n/config";

const LOCALE_COOKIE = "framform_locale";

function localeFromAcceptLanguage(headerValue) {
  if (!headerValue) return DEFAULT_LOCALE;

  const requestedLanguages = headerValue
    .split(",")
    .map((entry, index) => {
      const [rawTag, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const quality = qualityParameter ? Number.parseFloat(qualityParameter.trim().slice(2)) : 1;

      return {
        locale: rawTag.toLowerCase().split("-")[0],
        quality: Number.isFinite(quality) ? quality : 0,
        index,
      };
    })
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  return requestedLanguages.find(({ locale }) => isLocale(locale))?.locale || DEFAULT_LOCALE;
}

export function middleware(request) {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : localeFromAcceptLanguage(request.headers.get("accept-language"));

  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}`;

  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ["/"],
};
