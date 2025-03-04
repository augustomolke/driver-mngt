"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { auth } from "@/auth";
import { hasEventEnded } from "@/lib/utils";
import { getCurrentMode } from "../getCurrentMode";
import { getAllocations } from "./allocations";

export const getOpenOffers = async (): Promise<any> => {
  const session = await auth();
  const { choosed_station } = await getCurrentMode();

  if (!session?.user) {
    return;
  }

  // Get active Offers

  const filteredOpenings = await prisma.offers.findMany({
    where: {
      station: choosed_station,
      endTime: { gte: new Date() },
    },
  });

  if (!filteredOpenings) return [];

  // Get active Offers with free spots

  const allocations = await prisma.allocations.groupBy({
    by: ["cluster"],
    _count: {
      driver_id: true,
    },
    where: {
      cluster: {
        in: filteredOpenings.map((o) => o.cluster),
      },
      endTime: { gte: new Date() },
    },
  });

  const result = filteredOpenings.filter(
    (o) =>
      (allocations.find((a) => a.cluster == o.cluster)?._count?.driver_id ||
        0) < o.spots
  );

  // Get free shifts for the driver

  const driver_allocations = await getAllocations();

  const availableShifts = {
    AM: driver_allocations.filter((s) => s.shift === "AM").length == 0,
    PM: driver_allocations.filter((s) => s.shift === "PM").length == 0,
    // SD: currentSelection.filter((s) => s.shift === "SD"),
  };

  const res = result.filter((o) => availableShifts[o.shift]);

  return res;
};

export const createOffer = async (offer: any): Promise<any> => {
  const endTime = new Date(offer.createdAt);

  endTime.setMinutes(endTime.getMinutes() + offer.duration);

  return await prisma.offers.create({
    data: { ...offer, endTime },
  });
};

export const createManyOffer = async (offers: any): Promise<any> => {
  const endTime = new Date();

  endTime.setMinutes(endTime.getMinutes() + offers[0].duration);

  return await prisma.offers.createMany({
    data: offers.map((o) => ({ ...o, endTime })),
  });
};

export const deleteOffer = async (id: number): Promise<any> => {
  return await prisma.offers.delete({
    where: { id },
  });
};
