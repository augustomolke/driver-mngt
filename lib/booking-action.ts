"use server";
import { auth } from "@/auth";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { compareArrays } from "./utils";
import { getPreferences } from "@/gsheets/preferences";
import {
  createAvailability,
  deleteAvailability,
  updateAvailability,
} from "@/gsheets/bookings";
import {
  createBooking,
  getFirstTripBooking,
  deleteBooking,
} from "@/gsheets/bookings";
import { revalidateTag } from "next/cache";

const EVENTS_API_URL = process.env.EVENTS_API;
const SECRET = process.env.SECRET;

const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/");

  return `${month}/${day}/${year}`;
};

export const confirmAvailability = async (values, prevBookings, dates) => {
  const session = await auth();

  const booking = Object.entries(values)
    .map(([event_name, bookings]) => {
      const event = dates.filter((d) => d.name == event_name)[0];
      const prev = prevBookings
        .filter((prev) => prev.date == event.instance)
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
          plate: session?.user.plate,
          vehicle: session?.user.vehicle,
          station: session?.user.station,
          event_id: event.event_id,
          date: formatDate(event.instance),
          info: JSON.stringify(
            Object.entries(bookings)
              .filter((book) => !!book[1])
              .map((book) => book[0])
          ),
          ...(!!prev && { booking_id: prev?._id }),
        };
      }
    })
    .filter((v) => !!v);

  const bookingToDelete = Object.entries(values)
    .map(([event_name, bookings]) => {
      const event = dates.filter((d) => d.name == event_name)[0];
      const prev = prevBookings
        .filter((prev) => prev.date == event.instance)
        .find(Boolean);
      if (Object.entries(bookings).findIndex((book) => !!book[1]) < 0) {
        //deletar
        return prev?._id;
      }
    })
    .filter((v) => !!v);

  const promises = [];

  if (booking.length > 0) {
    promises.push(createAvailability(booking.filter((b) => !b.booking_id)));
    promises.push(
      updateAvailability(
        booking
          .filter((b) => !!b.booking_id)
          .map((b) => ({ id: b.booking_id, payload: { info: b.info } }))
      )
    );
  }

  if (bookingToDelete.length > 0) {
    promises.push(deleteAvailability(bookingToDelete));
  }

  await Promise.all(promises);
  revalidateTag("availability");
  redirect("/driver-panel");
};

export const createBookingAction = async (date, event_id) => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const preloadedPreferences = await getPreferences(
    session.user.driverId.toString()
  );

  if (
    preloadedPreferences.neverFilled ||
    preloadedPreferences.preferences.length === 0
  ) {
    return;
  }

  const payload = {
    driver_id: session.user.driverId,
    name: session.user.driverName,
    plate: session.user.plate,
    date,
    station: session.user.station,
    vehicle: session.user.vehicle,
    phone: session.user.phone,
    city: preloadedPreferences.preferences.reduce(
      (acc, curr) => curr.city + ", " + acc,
      ""
    ),
    neighbor: "",
    cep: preloadedPreferences.preferences.reduce(
      (acc, curr) => curr.cep + ", " + acc,
      ""
    ),
    event_id,
  };

  try {
    await createBooking([payload]);

    revalidateTag("first-trip-booking");
  } catch (e) {
    console.log(e);
  }
  redirect("/primeira-entrega/congrats");
};

export const deleteBookingAction = async (id) => {
  let redirectTo;

  try {
    const deleteBody = JSON.stringify({
      method: "DELETE",
      sheet: "bookings",
      key: process.env.SECRET,
      id,
    });

    const deleteResult = await deleteBooking(id);

    revalidateTag("first-trip-booking");
    redirectTo = true;
  } catch (e) {
    console.log(e);
  }

  if (redirectTo) redirect("/logout");
};
