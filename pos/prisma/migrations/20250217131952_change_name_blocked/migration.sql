/*
  Warnings:

  - You are about to drop the column `bloqued` on the `salespersons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "salespersons" DROP COLUMN "bloqued",
ADD COLUMN     "blocked" BOOLEAN NOT NULL DEFAULT false;
