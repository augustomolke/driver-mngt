"use server";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";

const url = process.env.GSHEET_PREFERENCES_URL;
const secret = process.env.SECRET;

interface Location {
  cep5: string;
  station_name: string;
  buyer_city: string;
  buyer_state: string;
  priority?: string;
  incentive?: string;
}

export const getLocations = unstable_cache(
  async (station_name: string): Promise<Locations[]> => {
    const body = JSON.stringify({
      method: "GET",
      sheet: "locations",
      key: secret,
      filter: { station_name: station_name, all: true },
    });

    const result = await fetch(url, {
      method: "POST",
      body,
    });

    const { status, data } = await result.json();

    if (status != 200) {
      throw new Error("Erro");
    }

    if (!data) {
      throw new Error("Erro");
    }

    return data;
  },
  ["locations"],
  {
    revalidate: 1800,
    tags: ["locations"],
  }
);
