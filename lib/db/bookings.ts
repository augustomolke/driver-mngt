import { unstable_cache } from "next/cache";
import prisma from "./db";
import { bookings } from "@/prisma/seed/data";

const EVENTS_API_URL = process.env.EVENTS_API || "";
const SECRET = process.env.SECRET || "";

export const getFirstTripBooking = async (driver_id) => {
  const booking = await prisma.bookings.findFirst({
    where: { driver_id, event: { event_type: "FIRST_TRIP" } },
  });

  return booking;
};

export const getSpots = unstable_cache(
  async (station) => {
    const booking = await prisma.bookings.findMany({
      where: {
        station,
        event: { event_type: "FIRST_TRIP" },
        date: { gte: new Date() },
      },
    });

    return booking;
  },
  ["spots"],
  {
    revalidate: 10,
    tags: ["spots"],
  }
);

export const getAvailability = unstable_cache(
  async (driver_id: string, station: string) => {
    return await prisma.bookings.findMany({
      where: {
        AND: [{ driver_id }, { station }, { date: { gte: new Date() } }],
      },
    });
  },
  ["availability"],
  {
    revalidate: 1800,
    tags: ["availability"],
  }
);

export const createBooking = async (bookings) => {
  if (bookings instanceof Array) {
    await prisma.bookings.createMany({ data: bookings });
  } else {
    await prisma.bookings.create({ data: bookings });
  }
};

export const deleteBooking = async (ids) => {
  const booking = await prisma.bookings.deleteMany({
    where: { id: { in: ids } },
  });

  return booking;
};

export const updateAvailability = async (updates) => {
  await prisma.$transaction(
    updates.map(({ id, payload }) =>
      prisma.bookings.update({ where: { id }, data: { ...payload } })
    )
  );
};
