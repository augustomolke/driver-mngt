"use server";
import { unstable_cache } from "next/cache";
import prisma from "./db";

export const getEvent = unstable_cache(
  async (location: string, type: string): Promise<Preferences> => {
    return await prisma.event.findFirst({
      where:
        type == "FIRST_TRIP"
          ? { event_type: "FIRST_TRIP" }
          : { event_type: "AVAILABILITY", location },
    });
  },
  ["events"],
  { revalidate: 10 }
);
