-- CreateTable
CREATE TABLE "Options" (
    "driver_id" SERIAL NOT NULL,
    "options" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("driver_id")
);
