"use server";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";

const url = process.env.GSHEET_PREFERENCES_URL;
const secret = process.env.SECRET;

interface driverPreference {
  cep: string;
  city: string;
  neighbor: string;
  priority?: string;
  incentive?: string;
}

interface Preferences {
  driver_id: string;
  driver_name: string;
  phone: string;
  preferences: driverPreference[];
  station: string;
  vehicle: string;
  neverFilled?: boolean;
}

export const getPreferences = unstable_cache(
  async (driver_id: number | string): Promise<Preferences> => {
    const body = JSON.stringify({
      method: "GET",
      sheet: "preferences",
      key: secret,
      filter: { driver_id: driver_id.toString() },
    });

    const result = await fetch(url, {
      method: "POST",
      body,
    });

    const { status, data } = await result.json();

    if (status == 400) {
      return {
        neverFilled: true,
      };
    }

    if (status != 200) {
      throw new Error("Erro");
    }

    if (!data) {
      throw new Error("Erro");
    }

    // Convert the string to valid JSON format
    const jsonCompatibleString = data.preferences
      .replace(/([{,]\s*)'([^']+)'(?=\s*:)/g, '$1"$2"') // property names to double quotes
      .replace(/:\s*'([^']*)'/g, ': "$1"') // string values to double quotes
      .replace(/:\s*"true"/g, ": true") // boolean true
      .replace(/:\s*"false"/g, ": false") // boolean false
      .replace(/:\s*""/g, ": null"); // empty strings to null

    // Parse the JSON-compatible string
    const parsedArray = JSON.parse(jsonCompatibleString);

    return {
      ...data,
      preferences: parsedArray,
    };
  },
  ["preferences"],
  {
    revalidate: 100,
    tags: ["preferences"],
  }
);

export async function createPreferences(preferences: Preferences) {
  try {
    const body = JSON.stringify({
      method: "POST",
      sheet: "preferences",
      key: secret,
      payload: preferences,
    });

    const response = await fetch(url!, {
      method: "POST",
      body,
    });

    const print = await response.json();

    revalidateTag("preferences");
  } catch (error) {
    console.error("Error creating preferences:", error);
    throw error;
  }
}

export async function updatePreferences(
  id: string | number,
  preferences: Preferences
) {
  try {
    const body = JSON.stringify({
      method: "PUT",
      sheet: "preferences",
      key: secret,
      id,
      payload: preferences,
    });

    const response = await fetch(url!, {
      method: "POST",
      body,
    });

    const result = await response.json();

    revalidateTag("preferences");

    return result;
  } catch (error) {
    console.error("Error updating preferences:", error);
    throw error;
  }
}
