"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";

export const getPreferences = async (
  driver_id: number | string
): Promise<Preferences> => {
  return await prisma.preferences.findMany({
    where: { driver_id },
  });
};

export async function savePreferences(preferences: Preferences) {
  console.log(preferences);
  try {
    await prisma.$transaction([
      prisma.preferences.deleteMany({
        where: { driver_id: preferences[0].driver_id },
      }),
      prisma.preferences.createMany({ data: preferences }),
    ]);

    revalidatePath("/primeira-entrega/preferencias");
    revalidatePath("/driver-panel/preferencias");
  } catch (error) {
    console.error("Error creating preferences:", error);
    throw error;
  }
}
