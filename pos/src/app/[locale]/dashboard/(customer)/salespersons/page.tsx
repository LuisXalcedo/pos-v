import { Salesperson } from "@/lib/types";
// import { columns } from "./columns";
// import { DataTable } from "@/components/data-table";
import prisma from "@/lib/prisma";
import { Table } from "./table";

async function getSalespersons(): Promise<Salesperson[]> {
  const salespersons = await prisma.salesperson.findMany();

  return salespersons.map((sp) => ({
    ...sp,
    name: sp.name || "",
    name2: sp.name2 || "",
    id_employee: sp.id_employee || 0,
    job_title: sp.job_title || "",
    gender: sp.gender || "",
    commission: sp.commission || 0.0,
    phone: sp.phone || "",
    email: sp.email || "",
    blocked: sp.bloqued || false,
  }));
}

export default async function SalespersonsPage() {
  const salespersons = await getSalespersons();

  return (
    <div className="container mx-auto py-10">
      <Table data={salespersons} />
    </div>
  );
}
