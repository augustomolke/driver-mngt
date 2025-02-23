"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { auth } from "@/auth";
import { hasEventEnded } from "@/lib/utils";
import { getCurrentMode } from "../getCurrentMode";
import { getTodayAndTomorrowInSaoPaulo } from "@/lib/utils";
import { getAllocations } from "./allocations";

export const getOpenOffers = async (): Promise<any> => {
  const session = await auth();
  const { choosed_station } = await getCurrentMode();

  if (!session?.user) {
    return;
  }

  const { startDate, endDate } = getTodayAndTomorrowInSaoPaulo();

  const openings = await prisma.offers.findMany({
    where: {
      station: choosed_station,
      createdAt: { gte: startDate, lte: endDate },
    },
  });

  if (!openings) return [];

  const filteredOpenings = openings.filter((a) => {
    return !hasEventEnded(a.createdAt, a.duration);
  });

  const allocations = await prisma.allocations.groupBy({
    by: ["cluster"],
    _count: {
      driver_id: true,
    },
    where: {
      cluster: {
        in: filteredOpenings.map((o) => o.cluster),
      },
      createdAt: { gte: startDate, lte: endDate },
    },
  });

  const result = filteredOpenings.filter(
    (o) =>
      (allocations.find((a) => a.cluster == o.cluster)?._count?.driver_id ||
        0) < o.spots
  );

  const driver_allocations = await getAllocations();

  const availableShifts = {
    AM: driver_allocations.filter((s) => s.shift === "AM").length == 0,
    PM: driver_allocations.filter((s) => s.shift === "PM").length == 0,
    // SD: currentSelection.filter((s) => s.shift === "SD"),
  };

  return result.filter((o) => availableShifts[o.shift]);
};

export const createOffer = async (offer: any): Promise<any> => {
  return await prisma.offers.create({
    data: { ...offer },
  });
};

export const createManyOffer = async (offers: any): Promise<any> => {
  return await prisma.offers.createMany({
    data: offers,
  });
};

export const deleteOffer = async (id: number): Promise<any> => {
  return await prisma.offers.delete({
    where: { id },
  });
};
