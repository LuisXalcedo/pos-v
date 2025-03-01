import { Salesperson } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { Table } from "./table";
import { Suspense } from "react";
import { SkeletonDataTable } from "@/components/skeleton";

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
    blocked: sp.blocked || false,
  }));
}

export default async function Page() {
  const salespersons = await getSalespersons();

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<SkeletonDataTable />}>
        <Table data={salespersons} />
      </Suspense>
    </div>
  );
}
