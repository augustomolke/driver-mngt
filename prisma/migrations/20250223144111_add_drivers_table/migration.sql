-- CreateTable
CREATE TABLE "Drivers" (
    "driver_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "vehicle" "VEHICLE" NOT NULL,
    "trips" INTEGER NOT NULL DEFAULT 0,
    "ownflex" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Drivers_pkey" PRIMARY KEY ("driver_id")
);
