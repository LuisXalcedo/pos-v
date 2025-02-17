import type { ColumnDef } from "@tanstack/react-table";
import type { Salesperson } from "@/lib/types";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SALESPERSON_KEYS = [
  "firstName",
  "lastName",
  "idEmployee",
  "jobTitle",
  "gender",
  "phone",
  "email",
  "blocked",
] as const;

type SalespersonKey = (typeof SALESPERSON_KEYS)[number];

function createSortingHeader(text: string) {
  const SortingHeader = ({ column }: { column: any }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {text}
      {column.getIsSorted() === "desc" && (
        <ArrowDown className="ml-2 h-4 w-4" />
      )}
      {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
    </Button>
  );

  SortingHeader.displayName = `SortingHeader(${text})`;
  return SortingHeader;
}

export const createColumns = (
  t: (key: SalespersonKey) => string
): ColumnDef<Salesperson>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: createSortingHeader(t("firstName")),
  },
  {
    accessorKey: "name2",
    header: createSortingHeader(t("lastName")),
  },
  {
    accessorKey: "id_employee",
    header: createSortingHeader(t("idEmployee")),
  },
  {
    accessorKey: "job_title",
    header: createSortingHeader(t("jobTitle")),
  },
  {
    accessorKey: "gender",
    header: createSortingHeader(t("gender")),
  },
  {
    accessorKey: "phone",
    header: createSortingHeader(t("phone")),
  },
  {
    accessorKey: "email",
    header: createSortingHeader(t("email")),
  },
  {
    accessorKey: "blocked",
    header: createSortingHeader(t("blocked")),
  },
];
