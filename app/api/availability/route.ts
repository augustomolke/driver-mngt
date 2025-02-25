import prisma from "@/lib/db/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const data = await prisma.bookings.findMany({
    where: {
      ownflex: false,
      date: { gte: yesterday },
      event: { event_type: "AVAILABILITY" },
    },
  });
  return Response.json({ data });
}

export async function POST(request: Request) {
  const { station } = await request.json();
  const data = await prisma.bookings.findMany({
    where: {
      AND: [{ station }, { date: { gte: new Date() } }, { ownflex: false }],
    },
  });

  return Response.json({ data });
}
