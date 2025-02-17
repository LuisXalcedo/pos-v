-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_ownerId_fkey";

-- AlterTable
ALTER TABLE "salespersons" ADD COLUMN     "gender" TEXT,
ADD COLUMN     "job_title" TEXT;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "salespersons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
