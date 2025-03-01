"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SkeletonDataTable() {
  return (
    <div>
      <div className="flex items-center py-4">
        <Skeleton className="h-9 w-[150px] lg:w-[250px]" />
        <Skeleton className="ml-auto h-9 w-[100px]" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {[1, 2, 3, 4].map((i) => (
                <TableHead key={i}>
                  <Skeleton className="h-6 w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((row) => (
              <TableRow key={row}>
                {[1, 2, 3, 4].map((cell) => (
                  <TableCell key={cell}>
                    <Skeleton className="h-6 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-9 w-[100px]" />
        <Skeleton className="h-9 w-[100px]" />
      </div>
    </div>
  );
}
