import prisma from "@/lib/db/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const data = await prisma.bookings.findMany({
    where: { event: { event_type: "FIRST_TRIP", location: { not: "*" } } },
  });
  return Response.json({ data });
}
