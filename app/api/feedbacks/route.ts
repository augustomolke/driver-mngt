import prisma from "@/lib/db/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const data = await prisma.feedbacks.findMany();

  return Response.json({ data });
}
