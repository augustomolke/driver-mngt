"use server";
import { unstable_cache } from "next/cache";

const secret = process.env.SECRET;

const api_url = process.env.GSHEET_PREFERENCES_URL;

export default unstable_cache(
  async function (station) {
    const body = JSON.stringify({
      method: "GETMAP",
      key: secret,
      sheet: "hubs",
      filter: { station_name: station },
    });

    const result = await fetch(api_url, {
      method: "POST",
      body,
    });

    try {
      return await result.json();
    } catch {
      return {};
    }
  },
  ["map"],
  { revalidate: 3600 }
);
