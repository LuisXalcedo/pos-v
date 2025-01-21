import { useTranslations } from "next-intl";

export default function SalespersonPage() {
  const t = useTranslations("Salesperson");

  return (
    <section>
      <h1>Salesperson Page</h1>
      <p>{t("title")}</p>
    </section>
  );
}
