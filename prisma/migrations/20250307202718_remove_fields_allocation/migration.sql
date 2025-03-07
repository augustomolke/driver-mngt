/*
  Warnings:

  - You are about to drop the column `cluster` on the `Allocations` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Allocations` table. All the data in the column will be lost.
  - You are about to drop the column `shift` on the `Allocations` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Allocations` table. All the data in the column will be lost.
  - Made the column `offerId` on table `Allocations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Allocations" DROP COLUMN "cluster",
DROP COLUMN "duration",
DROP COLUMN "shift",
DROP COLUMN "type",
ALTER COLUMN "offerId" SET NOT NULL;
