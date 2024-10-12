"use server";
import { getCurrentUser } from "./getSession";
import parser from "cron-parser";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function fetchDates() {
  const session = await getCurrentUser();

  const events = await fetchQuery(api.events.get, {
    station: session?.user.station,
  });

  const preloadedBookings = await fetchQuery(api.bookings.get, {
    driver_id: session.user.driverId.toString(),
  });

  if (!events.length) {
    return [];
  }

  const cron = events[0].cron_exp;

  const parsed = parser.parseExpression(cron);

  const dates = [1, 2, 3].map((event, idx) => {
    const nextEvent = parsed.next();
    const format = nextEvent.toDate().toLocaleDateString("pt-br", {
      day: "numeric",
      month: "short",
      weekday: "long",
    });

    const prevBooking = preloadedBookings.filter(
      (b) => b.instance == nextEvent.toISOString()
    );

    const checked = prevBooking.length > 0 ? prevBooking[0].info.shifts : [];

    return {
      id: events[0]._id,
      location: events[0].location,
      name: `event${event}`,
      formatted: format.charAt(0).toUpperCase() + format.slice(1),
      value: nextEvent.toISOString(),
      instance: nextEvent.toISOString(),
      checked,
    };
  });

  return dates;
}
