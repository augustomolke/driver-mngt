"use server";
import prisma from "./db";
import { auth } from "@/auth";
import { hasEventEnded } from "@/lib/utils";
import { getOpenOffers } from "./offers";
import { revalidatePath } from "next/cache";

const allowAllocate = (allocation: any, openOffers: any) => {
  return !!openOffers.find(
    (o) => o.cluster == allocation.cluster && o.shift == allocation.shift
  );
};

export const getAllocations = async (): Promise<any> => {
  const session = await auth();

  if (!session?.user) {
    return [];
  }

  const driver_id = session.user.driverId.toString();

  const now = new Date();
  const allocations = await prisma.allocations.findMany({
    where: { driver_id, endTime: { gte: now } },
  });

  if (!allocations) return [];

  const filteredAllocations = allocations.filter((a) => {
    return !hasEventEnded(new Date(a.createdAt), a.duration);
  });

  return filteredAllocations;
};

export const createAllocation = async (allocations: any): Promise<any> => {
  const session = await auth();

  const endTime = new Date();

  endTime.setMinutes(endTime.getMinutes() + allocations.duration);

  const allocation = await prisma.allocations.create({
    data: {
      driver_id: session.user?.driverId.toString(),
      ...allocations,
      endTime,
    },
  });

  revalidatePath("/driver-panel/crowdsourcing");
  revalidatePath("/driver-panel");

  return allocation;
};

export const createManyAllocations = async (allocations: any): Promise<any> => {
  const session = await auth();

  const openOffers = await getOpenOffers();

  if (!allocations.every((a) => allowAllocate(a, openOffers))) {
    throw new Error("There are no open offers for this driver");
  }

  const endTime = new Date();

  endTime.setMinutes(endTime.getMinutes() + allocations[0].duration);

  const allocated = await prisma.allocations.createMany({
    data: allocations.map((a) => {
      return {
        driver_id: session.user?.driverId.toString(),
        ...a,
        endTime: endTime.toISOString(),
      };
    }),
  });

  revalidatePath("/driver-panel/crowdsourcing");
  revalidatePath("/driver-panel");

  return allocated;
};

export const deleteAllocation = async (id: number): Promise<any> => {
  return await prisma.allocations.delete({
    where: { id },
  });
};
