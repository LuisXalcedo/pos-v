import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dataSalesperson = Array.from({ length: 100 }).map(() => ({
  name: faker.person.firstName(),
  name2: faker.person.lastName(),
  id_employee: faker.number.int({ min: 1, max: 100 }),
  job_title: faker.person.jobTitle(),
  gender: faker.person.sex(),
  commission: faker.number.float({ min: 0.0, max: 100.0 }),
  phone: faker.phone.number(),
  email: faker.internet.email(),
}));

export async function main() {
  await prisma.salesperson.createMany({
    data: dataSalesperson,
    skipDuplicates: true,
  });

  //Fetch created Salesperson
  const salespersons = await prisma.salesperson.findMany();

  //Create Addresses for each Salesperson
  for (const salesperson of salespersons) {
    try {
      await prisma.address.create({
        data: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          postalCode: faker.location.zipCode(),
          country: faker.location.country(),
          addressType: "WORK",
          ownerType: "SALESPERSON",
          ownerId: salesperson.id,
        },
      });
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "P2002"
      ) {
        console.log(
          `Unique constraint violation for Salesperson ID: ${salesperson.id}`
        );
      } else {
        throw error;
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
