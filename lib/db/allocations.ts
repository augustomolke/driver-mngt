"use server";
import prisma from "./db";
import { auth } from "@/auth";
import { hasEventEnded } from "@/lib/utils";
import { getTodayAndTomorrowInSaoPaulo } from "@/lib/utils";
import { getOpenOffers } from "./offers";

export const getAllocations = async (): Promise<any> => {
  const session = await auth();

  if (!session?.user) {
    return [];
  }

  const driver_id = session.user.driverId.toString();

  const { startDate, endDate } = getTodayAndTomorrowInSaoPaulo();

  const allocations = await prisma.allocations.findMany({
    where: { driver_id, createdAt: { gte: startDate, lte: endDate } },
  });

  if (!allocations) return [];

  const filteredAllocations = allocations.filter((a) => {
    return !hasEventEnded(new Date(a.createdAt), a.duration);
  });

  return filteredAllocations;
};

export const createAllocation = async (allocations: any): Promise<any> => {
  const session = await auth();

  return await prisma.allocations.create({
    data: { driver_id: session.user?.driverId.toString(), ...allocations },
  });
};

export const createManyAllocations = async (allocations: any): Promise<any> => {
  const session = await auth();

  const openOffers = await getOpenOffers();

  if (openOffers.length == 0) throw new Error("There are no open offers");

  return await prisma.allocations.createMany({
    data: allocations.map((a) => ({
      driver_id: session.user?.driverId.toString(),
      ...a,
    })),
  });
};

export const deleteAllocation = async (id: number): Promise<any> => {
  return await prisma.allocations.delete({
    where: { id },
  });
};
