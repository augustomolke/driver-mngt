/*
  Warnings:

  - Added the required column `station` to the `Offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offers" ADD COLUMN     "station" TEXT NOT NULL;
