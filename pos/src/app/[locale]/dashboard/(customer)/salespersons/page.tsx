import { useTranslations } from "next-intl";

export default function SalespersonPage() {
  const t = useTranslations("Salesperson");

  return (
    <section>
      <h1>Salesperson Page</h1>
      <p>This is where you can manage your salespersons.</p>
    </section>
  );
}
