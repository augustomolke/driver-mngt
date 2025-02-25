"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { auth } from "@/auth";

export const getOptions = async (driver_id: number): Promise<any> => {
  return await prisma.options.findFirst({
    where: { driver_id },
  });
};

export const saveOptions = async (options: string): Promise<any> => {
  const session = await auth();

  return await prisma.options.upsert({
    where: { driver_id: session.user?.driverId },
    update: { options },
    create: { driver_id: session.user?.driverId, options },
  });
};
