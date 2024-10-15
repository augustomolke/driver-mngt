"use server";
import { auth } from "@/auth";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

const api_url = process.env.GSHEET_AUTH_API_URL;

export const createBookingAction = async (date, eventId) => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const preloadedPreferences = await fetchQuery(api.preferences.get, {
    driver_id: session.user.driverId.toString(),
  });

  if (
    !(preloadedPreferences.length > 0) &&
    !(preloadedPreferences[0].preferences.length > 0)
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
    phone: session.user.session,
    city: preloadedPreferences[0].preferences.reduce(
      (acc, curr) => curr.city + ", " + acc,
      ""
    ),
    neighbor: preloadedPreferences[0].preferences.reduce(
      (acc, curr) => curr.neighbor + ", " + acc,
      ""
    ),
    cep: preloadedPreferences[0].preferences.reduce(
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
  redirect("/primeira-entrega");
};

export const deleteBookingAction = async (driverId, bookinId) => {
  const body = JSON.stringify({
    method: "GET",
    sheet: "bookings",
    key: process.env.SECRET,
    filter: { driverId },
  });

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
  } catch (e) {
    console.log(e);
  }
  await signOut({ redirectTo: "/login" });
};
