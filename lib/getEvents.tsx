"use server";
import { getCurrentUser } from "./getSession";
import parser from "cron-parser";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function fetchDates() {
  const session = await getCurrentUser();

  const eventsResult = await fetchQuery(api.events.get, {
    station: session?.user.station,
  });

  const events = eventsResult.filter((e) => e.event_type == "Disponibilidade");

  if (!events.length) {
    return [];
  }

  const cron = events[0].cron_exp;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const parsed = parser.parseExpression(cron, {
    currentDate: tomorrow,
    tz: events[0].timezone,
    utc: true,
  });

  const dates = [1, 2, 3].map((event, idx) => {
    const nextEvent = parsed.next();
    const format = nextEvent.toDate().toLocaleDateString("pt-br", {
      day: "numeric",
      month: "short",
      weekday: "long",
    });

    const instance = nextEvent.toDate().toLocaleDateString("en-GB");
    // const prevBooking = preloadedBookings.filter(
    //   (b) => b.instance == nextEvent.toISOString()
    // );

    // const checked = prevBooking.length > 0 ? prevBooking[0].info.shifts : [];

    return {
      id: events[0]._id,
      location: events[0].location,
      name: `event${event}`,
      formatted: format.charAt(0).toUpperCase() + format.slice(1),
      value: instance,
      instance,
      // checked,
      // booking_id: prevBooking.length > 0 ? prevBooking[0]._id : null,
    };
  });

  return dates;
}
