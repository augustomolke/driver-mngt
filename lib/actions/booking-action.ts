"use server";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { compareArrays } from "../utils";
import { getPreferences } from "@/lib/db/preferences";
import {
  createAvailability,
  updateAvailability,
  deleteBooking,
} from "@/lib/db/bookings";

import { createBooking } from "../db/bookings";
import { revalidateTag } from "next/cache";
import prisma from "../db/db";
import { preferences } from "@/prisma/seed/data";

const EVENTS_API_URL = process.env.EVENTS_API;
const SECRET = process.env.SECRET;

const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/");

  return `${month}/${day}/${year}`;
};

export const confirmAvailability = async (values, prevBookings, dates) => {
  const session = await auth();

  const preferences = await prisma.preferences.findMany({
    where: { driver_id: session?.user.driverId.toString() },
  });

  const booking = Object.entries(values)
    .map(([event_name, bookings]) => {
      const event = dates.find(
        (d) => d.value.getDate() === new Date(event_name).getDate()
      );

      const prev = prevBookings
        .filter(
          (prev) =>
            new Date(prev.date).getDate() == new Date(event.value).getDate()
        )
        .find(Boolean);

      if (
        compareArrays(
          prev?.info,
          Object.entries(bookings)
            .filter((book) => !!book[1])
            .map((book) => book[0])
        )
      ) {
        //nothing to do
        return null;
      }

      if (Object.entries(bookings).findIndex((book) => !!book[1]) < 0) {
        //deletar
        return null;
      } else {
        return {
          driver_id: session.user.driverId.toString(),
          name: session?.user.driverName,
          phone: session?.user.phone.toString(),
          plate: session?.user.plate,
          city: preferences.reduce((acc, curr) => curr.city + ", " + acc, ""),
          cep: preferences.reduce((acc, curr) => curr.cep + ", " + acc, ""),
          vehicle: session?.user.vehicle,
          station: session?.user.station,
          event_id: event.event_id,
          date: event.value,
          info: JSON.stringify(
            Object.entries(bookings)
              .filter((book) => !!book[1])
              .map((book) => book[0])
          ),
          ...(!!prev && { booking_id: prev?.id }),
        };
      }
    })
    .filter((v) => !!v);

  const bookingToDelete = Object.entries(values)
    .map(([event_name, bookings]) => {
      const event = dates.find(
        (d) => d.value.getDate() === new Date(event_name).getDate()
      );
      const prev = prevBookings
        .filter(
          (prev) =>
            new Date(prev.date).getDate() == new Date(event.value).getDate()
        )
        .find(Boolean);
      if (Object.entries(bookings).findIndex((book) => !!book[1]) < 0) {
        //deletar
        return prev?.id;
      }
    })
    .filter((v) => !!v);

  const promises = [];

  if (booking.length > 0) {
    promises.push(createBooking(booking.filter((b) => !b.booking_id)));
    promises.push(
      updateAvailability(
        booking
          .filter((b) => !!b.booking_id)
          .map((b) => ({ id: b.booking_id, payload: { info: b.info } }))
      )
    );
  }

  if (bookingToDelete.length > 0) {
    promises.push(deleteBooking(bookingToDelete));
  }

  await Promise.all(promises);

  revalidateTag("availability");
  // redirect("/driver-panel");
};

export const createBookingAction = async (date, event_id) => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const preloadedPreferences = await getPreferences(
    session.user.driverId.toString()
  );

  if (preloadedPreferences.length === 0) {
    return;
  }

  const payload = {
    driver_id: session.user.driverId.toString(),
    name: session.user.driverName,
    plate: session.user.plate,
    date,
    station: session.user.station,
    vehicle: session.user.vehicle,
    phone: session.user.phone.toString(),
    city: preloadedPreferences.reduce(
      (acc, curr) => curr.city + ", " + acc,
      ""
    ),
    cep: preloadedPreferences.reduce((acc, curr) => curr.cep + ", " + acc, ""),
    event_id,
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
