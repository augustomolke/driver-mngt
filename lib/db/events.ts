"use server";
import { unstable_cache } from "next/cache";
import prisma from "./db";

export const getEvent = async (
  location: string,
  event_type: string
): Promise<Preferences> => {
  return await prisma.event.findFirst({
    where: { event_type, location },
  });
};
