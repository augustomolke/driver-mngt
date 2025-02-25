/*
  Warnings:

  - The primary key for the `Clusters` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `zone_base_id` column on the `Clusters` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Clusters" DROP CONSTRAINT "Clusters_pkey",
DROP COLUMN "zone_base_id",
ADD COLUMN     "zone_base_id" SERIAL NOT NULL,
ADD CONSTRAINT "Clusters_pkey" PRIMARY KEY ("zone_base_id");
