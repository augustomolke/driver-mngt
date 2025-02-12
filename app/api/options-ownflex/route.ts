import prisma from "@/lib/db/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const data = await prisma.options.findMany();
  return Response.json({ data });
}
