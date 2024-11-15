-- CreateEnum
CREATE TYPE "EVENT_TYPE" AS ENUM ('FIRST_TRIP', 'AVAILABILITY');

-- CreateEnum
CREATE TYPE "SHIFTS" AS ENUM ('AM', 'PM', 'SD');

-- CreateEnum
CREATE TYPE "VEHICLE" AS ENUM ('PASSEIO', 'MOTO', 'FIORINO', 'VAN', 'VUC');

-- CreateTable
CREATE TABLE "Feedbacks" (
    "id" SERIAL NOT NULL,
    "driver_id" TEXT NOT NULL,
    "nps" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "first_trip" BOOLEAN NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "driver_id" VARCHAR(255) NOT NULL,
    "name" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "event_id" INTEGER NOT NULL,
    "info" TEXT,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "event_type" "EVENT_TYPE" NOT NULL,
    "location" TEXT NOT NULL,
    "options" TEXT,
    "timezone" TEXT NOT NULL,
    "cron_exp" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" SERIAL NOT NULL,
    "driver_id" TEXT NOT NULL,
    "driver_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "vehicle" "VEHICLE" NOT NULL,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
