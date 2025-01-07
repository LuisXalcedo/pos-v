import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./locale-switcher-select";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");

  const localeTranlations: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    localeTranlations[loc] = t("locale", { locale: loc });
  });

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label={t("label")}
      locales={[...routing.locales]}
      translations={localeTranlations}
    />
  );
}
