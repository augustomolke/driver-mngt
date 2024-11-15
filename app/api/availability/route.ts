import prisma from "@/lib/db/db";
import { date } from "zod";

export async function POST(request: Request) {
  const { station } = await request.json();
  const data = await prisma.bookings.findMany({
    where: { AND: [{ station }, { date: { gte: new Date() } }] },
  });

  return Response.json({ data });
}
