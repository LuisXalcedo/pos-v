import { DataTable } from "@/components/data-table";
import type { Salesperson } from "@/lib/types";
import { createColumns } from "./columns";
import { useTranslations } from "next-intl";

interface SalespersonsTableProps {
  data: Salesperson[];
}

export function Table({ data }: SalespersonsTableProps) {
  const t = useTranslations("Salesperson");
  const columns = createColumns((key) => t(key));

  return <DataTable columns={columns} data={data} />;
}
