"use server";
import { auth } from "@/auth";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { compareArrays } from "./utils";
import { getPreferences } from "@/gsheets/preferences";

const api_url = process.env.GSHEET_AUTH_API_URL;
const EVENTS_API_URL = process.env.EVENTS_API;
const SECRET = process.env.SECRET;

export const confirmAvailability = async (values, prevBookings, dates) => {
  const session = await auth();
  const booking = Object.entries(values)
    .map(([event_name, bookings]) => {
      const event = dates.filter((d) => d.name == event_name)[0];
      const prev = prevBookings
        .filter((prev) => prev.instance == event.instance)
        .find(Boolean);

      if (
        compareArrays(
          prev?.info.shifts,
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
          event_id: event.id,
          instance: event.instance,
          info: {
            shifts: Object.entries(bookings)
              .filter((book) => !!book[1])
              .map((book) => book[0]),
          },
          ...(!!prev && { booking_id: prev?._id }),
        };
      }
    })
    .filter((v) => !!v);

  const bookingToDelete = Object.entries(values)
    .map(([event_name, bookings]) => {
      const event = dates.filter((d) => d.name == event_name)[0];
      const prev = prevBookings
        .filter((prev) => prev.instance == event.instance)
        .find(Boolean);
      if (Object.entries(bookings).findIndex((book) => !!book[1]) < 0) {
        //deletar
        return prev?._id;
      }
    })
    .filter((v) => !!v);

  const promises = [];

  if (booking.length > 0) {
    const body = JSON.stringify(
      booking.map((instance) => ({
        method: "POST",
        sheet: "enrollments",
        key: SECRET,
        payload: {
          driver_id: instance.driver_id,
          driver_name: session?.user.driverName,
          event_id: "FAZER",
          instance: instance.instance,
          instance_id: instance.id,
          info: JSON.stringify(instance.info),
        },
      }))
    );

    const gsheetCreate = await fetch(EVENTS_API_URL, {
      method: "POST",
      body,
    });

    promises.push(
      fetchMutation(api.bookings.createBooking, {
        booking,
      })
    );
  }

  if (bookingToDelete.length > 0) {
    // DELETAR DEPOIS
    const instancesToDelete = Object.entries(values)
      .map(([event_name, bookings]) => {
        const event = dates.filter((d) => d.name == event_name)[0];
        const prev = prevBookings
          .filter((prev) => prev.instance == event.instance)
          .find(Boolean);
        if (Object.entries(bookings).findIndex((book) => !!book[1]) < 0) {
          //deletar
          return prev?.instance;
        }
      })
      .filter((v) => !!v);

    const body = JSON.stringify(
      instancesToDelete.map((instance) => ({
        method: "DELETE",
        sheet: "enrollments",
        key: SECRET,
        filter: { driver_id: session.user?.driverId.toString(), instance },
      }))
    );

    const gsheetDelete = await fetch(EVENTS_API_URL, {
      method: "POST",
      body,
    });

    promises.push(
      fetchMutation(api.bookings.deleteBooking, { ids: bookingToDelete })
    );
  }

  return await Promise.all(promises);
};

export const createBookingAction = async (date, eventId) => {
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
    driverId: session.user.driverId,
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
    neighbor: preloadedPreferences.preferences.reduce(
      (acc, curr) => curr.neighbor + ", " + acc,
      ""
    ),
    cep: preloadedPreferences.preferences.reduce(
      (acc, curr) => curr.cep + ", " + acc,
      ""
    ),
    eventId,
  };

  const body = JSON.stringify({
    method: "POST",
    sheet: "bookings",
    key: process.env.SECRET,
    payload,
  });

  try {
    const result = await fetch(api_url, {
      method: "POST",
      body,
    });

    const createBooking = await fetchMutation(api.bookings.createBooking, {
      booking: [
        {
          driver_id: session.user.driverId.toString(),
          event_id: eventId,
          instance: date,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
  redirect("/primeira-entrega/congrats");
};

export const deleteBookingAction = async (driverId, bookinId) => {
  const body = JSON.stringify({
    method: "GET",
    sheet: "bookings",
    key: process.env.SECRET,
    filter: { driverId },
  });

  let redirectTo;

  try {
    const result = await fetch(api_url, {
      method: "POST",
      body,
    });

    const gSheetBooking = await result.json();

    if (!!gSheetBooking.data?._id) {
      const deleteBody = JSON.stringify({
        method: "DELETE",
        sheet: "bookings",
        key: process.env.SECRET,
        id: gSheetBooking.data._id,
      });

      const deleteResult = await fetch(api_url, {
        method: "POST",
        body: deleteBody,
      });
    }

    await fetchMutation(api.bookings.deleteBooking, {
      ids: [bookinId],
    });

    redirectTo = true;
  } catch (e) {
    console.log(e);
  }

  if (redirectTo) redirect("/logout");
};
