"use server";
import { getCurrentUser } from "./getSession";
import parser from "cron-parser";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function fetchDates() {
  const session = await getCurrentUser();

  // const body = JSON.stringify({
  //   method: "GET",
  //   key: secret,
  //   sheet: "events",
  //   filter: { location: session?.user.station, event_type: "Disponibilidade" },
  // });

  // const result = await fetch(api_url, {
  //   method: "POST",
  //   body,
  // });

  // const events = await result.json();

  const events = await fetchQuery(api.events.get, {
    station: session?.user.station,
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

    return {
      id: idx,
      event_id: events[0].event_id,
      location: events[0].location,
      name: `event${event}`,
      formatted: format.charAt(0).toUpperCase() + format.slice(1),
      value: nextEvent.toISOString(),
      instance: nextEvent.toISOString(),
      checked: true,
    };
  });

  return dates;
}
