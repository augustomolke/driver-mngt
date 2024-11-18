import prisma from "@/lib/db/db";

export async function GET(request: Request) {
  const data = await prisma.bookings.findMany({
    where: { event: { event_type: "FIRST_TRIP" } },
  });
  return Response.json({ data });
}
