import { unstable_cache } from "next/cache";

const EVENTS_API_URL = process.env.EVENTS_API || "";
const SECRET = process.env.SECRET || "";

export const getEvent = unstable_cache(
  async (location, event_type) => {
    const body = JSON.stringify({
      method: "GET",
      sheet: "events2",
      key: SECRET,
      filter: { location, event_type },
    });

    const gsheetCreate = await fetch(EVENTS_API_URL, {
      method: "POST",
      body,
    });

    const result = await gsheetCreate.json();

    return result.data;
  },
  ["events"],
  {
    revalidate: 1800,
    tags: ["events"],
  }
);
