-- CreateEnum
CREATE TYPE "OFFER_TYPE" AS ENUM ('CROWDSOURCING', 'MANUAL', 'AUTOMATIC');

-- DropForeignKey
ALTER TABLE "Allocations" DROP CONSTRAINT "Allocations_offerId_fkey";

-- AlterTable
ALTER TABLE "Allocations" ALTER COLUMN "cluster" DROP NOT NULL,
ALTER COLUMN "shift" DROP NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Offers" ADD COLUMN     "offer_type" "OFFER_TYPE" NOT NULL DEFAULT 'MANUAL';

-- AddForeignKey
ALTER TABLE "Allocations" ADD CONSTRAINT "Allocations_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
