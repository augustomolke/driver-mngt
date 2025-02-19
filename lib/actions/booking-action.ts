"use server";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { compareArrays } from "../utils";
import { getPreferences } from "@/lib/db/preferences";
import { updateAvailability, deleteBooking } from "@/lib/db/bookings";

import { createBooking } from "../db/bookings";
import { revalidateTag } from "next/cache";
import prisma from "../db/db";

const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/");

  return `${month}/${day}/${year}`;
};

export const confirmAvailability = async (values, dates, station, ownflex) => {
  const session = await auth();

  const preferences = await getPreferences(
    session.user.driverId.toString(),
    station
  );

  const city = preferences.reduce((acc, curr) => curr.city + ", " + acc, "");

  const cep = preferences.reduce((acc, curr) => curr.cep + ", " + acc, "");

  const prevBookings = await prisma.bookings.findMany({
    where: {
      driver_id: session.user.driverId.toString(),
      station,
      date: { in: Object.keys(values).map((key) => new Date(key)) },
    },
  });

  const newBookings = Object.entries(values)
    .map(([date, value], index) => {
      return {
        driver_id: session.user.driverId.toString(),
        name: session.user.driverName,
        plate: session.user.plate,
        vehicle: session.user.vehicle,
        station,
        phone: session.user.phone.toString(),
        city,
        cep,
        ownflex,
        event_id: dates[0].event_id,
        date: new Date(date),
        info: JSON.stringify(
          Object.entries(value)
            .filter(([shift, selected]) => selected)
            .map(([shift, selected]) => shift)
        ),
      };
    })
    .filter((booking) => JSON.parse(booking.info).length > 0);

  await prisma.$transaction([
    prisma.bookings.deleteMany({
      where: { id: { in: prevBookings.map((b) => b.id) } },
    }),
    prisma.bookings.createMany({
      data: newBookings,
    }),
  ]);

  revalidateTag("availability");
  redirect("/driver-panel");
};

export const createBookingAction = async (
  date,
  event_id,
  shift,
  exp,
  description,
  instructions,
  station
) => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const preloadedPreferences = await getPreferences(
    session.user.driverId.toString(),
    station
  );

  if (preloadedPreferences.length === 0) {
    return;
  }

  const payload = {
    driver_id: session.user.driverId.toString(),
    name: session.user.driverName,
    plate: session.user.plate,
    date,
    station,
    vehicle: session.user.vehicle,
    phone: session.user.phone.toString(),
    city: preloadedPreferences.reduce(
      (acc, curr) => curr.city + ", " + acc,
      ""
    ),
    cep: preloadedPreferences.reduce((acc, curr) => curr.cep + ", " + acc, ""),
    event_id,
    info: JSON.stringify([shift, exp, description, instructions]),
  };

  try {
    const result = await createBooking(payload);

    revalidateTag("first-trip-booking");
  } catch (e) {
    console.log(e);
  }
  redirect("/primeira-entrega/congrats");
};

export const deleteBookingAction = async (id) => {
  let redirectTo;

  try {
    const deleteResult = await prisma.bookings.delete({
      where: { id },
    });
    redirectTo = true;
  } catch (e) {
    console.log(e);
  }

  if (redirectTo) redirect("/logout");
};
