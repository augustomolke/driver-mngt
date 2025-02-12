import prisma from "@/lib/db/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const data = await prisma.preferences.findMany({ where: { ownflex: true } });

  return Response.json({ data });
}
