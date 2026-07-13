import { notFound } from "next/navigation";
import "xp.css/dist/XP.css";
import "../globals.css";
import { getDictionary } from "../../lib/i18n/get-dictionary";
import { isLocale, LOCALE_DETAILS, LOCALES } from "../../lib/i18n/config";

const SITE_URL = "https://portfolio-xp-ten.vercel.app";
const SOCIAL_IMAGE = {
  url: "/framform-logo-full.png",
  width: 2048,
  height: 2048,
  alt: "FRAMFORM",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dictionary = getDictionary(locale);
  const details = LOCALE_DETAILS[locale];
  const alternateLocales = LOCALES
    .filter((candidate) => candidate !== locale)
    .map((candidate) => LOCALE_DETAILS[candidate].og);

  return {
    metadataBase: new URL(SITE_URL),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "sv-SE": "/sv",
        en: "/en",
        ar: "/ar",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "FRAMFORM",
      title: dictionary.meta.ogTitle || dictionary.meta.title,
      description: dictionary.meta.ogDescription || dictionary.meta.description,
      locale: details.og,
      alternateLocale: alternateLocales,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.ogTitle || dictionary.meta.title,
      description: dictionary.meta.ogDescription || dictionary.meta.description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const details = LOCALE_DETAILS[locale];

  return (
    <html lang={details.lang} dir={details.dir}>
      <body data-locale={locale}>{children}</body>
    </html>
  );
}
