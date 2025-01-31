-- CreateTable
CREATE TABLE "Clusters" (
    "zone_base_id" TEXT NOT NULL,
    "zone_id" TEXT NOT NULL,
    "zone_name" TEXT NOT NULL,
    "station_id" INTEGER NOT NULL,
    "station_name" TEXT NOT NULL,
    "zone_detail" TEXT NOT NULL,

    CONSTRAINT "Clusters_pkey" PRIMARY KEY ("zone_base_id")
);
