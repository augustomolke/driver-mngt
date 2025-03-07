-- AlterTable
ALTER TABLE "Allocations" ADD COLUMN     "offerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Allocations" ADD CONSTRAINT "Allocations_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
