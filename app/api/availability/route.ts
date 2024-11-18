import prisma from "@/lib/db/db";

export async function GET(request: Request) {
  const data = await prisma.bookings.findMany({
    where: { date: { gte: new Date() }, event: { event_type: "AVAILABILITY" } },
  });
  return Response.json({ data });
}

export async function POST(request: Request) {
  const { station } = await request.json();
  const data = await prisma.bookings.findMany({
    where: { AND: [{ station }, { date: { gte: new Date() } }] },
  });

  return Response.json({ data });
}
