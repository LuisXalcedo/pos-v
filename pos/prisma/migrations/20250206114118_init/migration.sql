-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('WORK', 'HOME', 'BILLING', 'SHIPPING');

-- CreateEnum
CREATE TYPE "OwnerType" AS ENUM ('SALESPERSON', 'CUSTOMER');

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "addressType" "AddressType" NOT NULL,
    "ownerId" TEXT NOT NULL,
    "ownerType" "OwnerType" NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salespersons" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "name2" TEXT,
    "id_employee" INTEGER,
    "commission" DOUBLE PRECISION DEFAULT 0.00,
    "phone" TEXT,
    "email" TEXT,
    "bloqued" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "salespersons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_ownerId_ownerType_key" ON "addresses"("ownerId", "ownerType");

-- CreateIndex
CREATE UNIQUE INDEX "salespersons_id_employee_key" ON "salespersons"("id_employee");

-- CreateIndex
CREATE UNIQUE INDEX "salespersons_email_key" ON "salespersons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "salespersons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
