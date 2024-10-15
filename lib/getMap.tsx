"use server";
import { cache } from "react";

const secret = process.env.SECRET;

const api_url = process.env.GSHEET_AUTH_API_URL;

export default cache(async function (station) {
  const body = JSON.stringify({
    method: "GETMAP",
    key: secret,
    sheet: "hubs",
    filter: { "Station Name": station },
  });

  const result = await fetch(api_url, {
    method: "POST",
    body,
  });

  return await result.json();
});
