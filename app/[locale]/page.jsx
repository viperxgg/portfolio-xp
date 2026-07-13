import { notFound } from "next/navigation";
import PortfolioExperience from "../../components/PortfolioExperience";
import { getDictionary } from "../../lib/i18n/get-dictionary";
import { isLocale } from "../../lib/i18n/config";

const VALID_PHASES = new Set(["login", "personal", "company", "off"]);

export default async function LocalePage({ params, searchParams }) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  if (!isLocale(locale)) notFound();

  const requestedPhase = typeof query?.view === "string" ? query.view : "login";
  const initialPhase = VALID_PHASES.has(requestedPhase) ? requestedPhase : "login";

  return (
    <PortfolioExperience
      locale={locale}
      dictionary={getDictionary(locale)}
      initialPhase={initialPhase}
    />
  );
}
