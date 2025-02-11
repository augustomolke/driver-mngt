import prisma from "@/lib/db/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const data = await prisma.bookings.findMany({
    where: {
      ownflex: true,
      date: { gte: yesterday },
      event: { event_type: "AVAILABILITY" },
    },
  });
  return Response.json({ data });
}
