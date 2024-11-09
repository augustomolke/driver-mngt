"use server";
import { getCurrentUser } from "./getSession";
import parser from "cron-parser";
import { getEvent } from "@/gsheets/events";

export async function fetchDates() {
  const session = await getCurrentUser();

  const eventGsheet = await getEvent(session?.user.station, "Disponibilidade");

  if (!eventGsheet) {
    return [];
  }

  const cron = eventGsheet.cron_exp;

  // const today = new Date();
  // const tomorrow = new Date(today.setHours(0, 0, 0, 0));
  // tomorrow.setDate(tomorrow.getDate() + 1);

  const parsed = parser.parseExpression(cron, {
    tz: eventGsheet.timezone,
  });

  const dates = [1, 2, 3].map((event, idx) => {
    const nextEvent = parsed.next();
    const format = nextEvent.toDate().toLocaleDateString("pt-br", {
      day: "numeric",
      month: "short",
      weekday: "long",
      timeZone: event.timezone,
    });

    const instance = nextEvent
      .toDate()
      .toLocaleDateString("en-GB", { timeZone: event.timezone });

    return {
      event_id: eventGsheet.event_id,
      location: eventGsheet.location,
      name: instance,
      formatted: format.charAt(0).toUpperCase() + format.slice(1),
      value: instance,
      instance,
    };
  });

  return dates;
}
