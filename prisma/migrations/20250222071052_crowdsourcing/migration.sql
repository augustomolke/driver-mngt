-- CreateTable
CREATE TABLE "Allocations" (
    "id" SERIAL NOT NULL,
    "driver_id" TEXT NOT NULL,
    "cluster" TEXT NOT NULL,
    "shift" "SHIFTS" NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Allocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offers" (
    "id" SERIAL NOT NULL,
    "cluster" TEXT NOT NULL,
    "shift" "SHIFTS" NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 60,
    "spots" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offers_pkey" PRIMARY KEY ("id")
);
