"use server";
import parser from "cron-parser";
import { getEvent } from "@/lib/db/events";
import { prisma } from "@/prisma/db";
import { auth } from "@/auth";

export async function fetchDates(days: number = 3) {
  const session = await auth();

  const eventDb = await getEvent(session?.user.station, "AVAILABILITY");

  if (!eventDb) {
    return [];
  }

  const cron = eventDb.cron_exp;

  // const today = new Date();
  // const tomorrow = new Date(today.setHours(0, 0, 0, 0));
  // tomorrow.setDate(tomorrow.getDate() + 1);

  const parsed = parser.parseExpression(cron, {
    tz: eventDb.timezone,
  });

  const dates = Array.from({ length: days }, (v, i, k) => k).map(
    (event, idx) => {
      const nextEvent = parsed.next();
      const format = nextEvent.toDate().toLocaleDateString("pt-br", {
        day: "numeric",
        month: "short",
        weekday: "long",
        timeZone: eventDb.timezone,
      });

      const value = nextEvent.toDate({ timeZone: eventDb.timezone });

      const instance = value.toLocaleDateString("en-GB", {
        timeZone: eventDb.timezone,
      });

      return {
        event_id: eventDb.id,
        location: eventDb.location,
        name: instance,
        formatted: format.charAt(0).toUpperCase() + format.slice(1),
        value,
        instance,
      };
    }
  );

  return dates;
}
