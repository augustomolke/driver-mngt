/*
  Warnings:

  - Added the required column `type` to the `Allocations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ALLOCATION_TYPE" AS ENUM ('CROWDSOURCING', 'MANUAL', 'AUTOMATIC');

-- AlterTable
ALTER TABLE "Allocations" ADD COLUMN     "type" "ALLOCATION_TYPE" NOT NULL;
