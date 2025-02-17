import type { ColumnDef } from "@tanstack/react-table";
import type { Salesperson } from "@/lib/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SALESPERSON_KEYS = [
  "firstName",
  "lastName",
  "idEmployee",
  "jobTitle",
  "gender",
  "phone",
  "email",
  "bloqued",
] as const;

type SalespersonKey = (typeof SALESPERSON_KEYS)[number];

export const createColumns = (
  t: (key: SalespersonKey) => string
): ColumnDef<Salesperson>[] => [
  {
    accessorKey: "name",
    header: t("firstName"),
  },
  {
    accessorKey: "name2",
    header: t("lastName"),
  },
  {
    accessorKey: "id_employee",
    header: t("idEmployee"),
  },
  {
    accessorKey: "job_title",
    header: t("jobTitle"),
  },
  {
    accessorKey: "gender",
    header: t("gender"),
  },
  {
    accessorKey: "phone",
    header: t("phone"),
  },
  {
    accessorKey: "email",
    header: t("email"),
  },
  {
    accessorKey: "bloqued",
    header: t("bloqued"),
  },
];
