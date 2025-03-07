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
    include: { offer: true },
  });

  if (!allocations) return [];

  return allocations;
};

// export const createAllocation = async (allocations: any): Promise<any> => {
//   const session = await auth();

//   const endTime = new Date();

//   endTime.setMinutes(endTime.getMinutes() + allocations.duration);

//   const allocation = await prisma.allocations.create({
//     data: {
//       driver_id: session.user?.driverId.toString(),
//       ...allocations,
//       endTime,
//     },
//   });

//   revalidatePath("/driver-panel/crowdsourcing");
//   revalidatePath("/driver-panel");

//   return allocation;
// };

export const createManyAllocations = async (ids: any): Promise<any> => {
  const session = await auth();

  const offers = await prisma.offers.findMany({
    where: {
      id: {
        in: ids,
      },
      endTime: { gte: new Date() },
    },
    include: { allocations: true },
  });

  const openOffers = offers.filter((o) => o.allocations.length < o.spots);

  if (!openOffers.length) {
    throw new Error("There are no open offers for this driver");
  }

  try {
    const allocated = await prisma.allocations.createMany({
      data: openOffers.map((a) => {
        return {
          driver_id: session.user?.driverId.toString(),
          offerId: a.id,
          endTime: a.endTime,
        };
      }),
    });

    revalidatePath("/driver-panel/crowdsourcing");
    revalidatePath("/driver-panel");

    return allocated;
  } catch (err) {
    revalidatePath("/driver-panel/crowdsourcing");
    revalidatePath("/driver-panel");

    throw err;
  }
};

export const deleteAllocation = async (id: number): Promise<any> => {
  return await prisma.allocations.delete({
    where: { id },
  });
};
