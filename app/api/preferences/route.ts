import prisma from "@/lib/db/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const data = await prisma.preferences.findMany({ where: { ownflex: false } });

  return Response.json({ data });
}

export async function POST(request: Request) {
  const { station } = await request.json();
  const data = await prisma.preferences.findMany({
    where: { station, ownflex: false },
  });

  return Response.json({ data });
}
