import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const salespersonData: Prisma.SalespersonCreateInput[] = [
  {
    name: "John Doe",
    name2: "JD",
    id_employee: 1,
    commission: 5.0,
    phone: "123-456-7890",
    email: "john.doe@example.com",
    address: {
      create: [
        {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          postalCode: "12345",
          country: "USA",
          addressType: "WORK",
          ownerType: "SALESPERSON",
        },
      ],
    },
  },
];

export async function main() {
  for (const u of salespersonData) {
    await prisma.salesperson.create({ data: u });
  }
}
main();
