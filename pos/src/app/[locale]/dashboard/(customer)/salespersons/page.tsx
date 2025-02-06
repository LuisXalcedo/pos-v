// import { useTranslations } from "next-intl";
import prisma from "@/lib/prisma";

export default async function SalespersonPage() {
  // const t = useTranslations("Salesperson");
  const salespersons = await prisma.salesperson.findMany();
  return (
    <div>
      {salespersons.map((salesperson) => (
        <div key={salesperson.id}>
          {salesperson.name} - {salesperson.email}
        </div>
      ))}
    </div>
  );
}
