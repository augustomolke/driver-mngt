import prisma from "@/lib/db/db";
import { date } from "zod";

export async function POST(request: Request) {
  const data = await prisma.preferences.findMany({});

  return Response.json({ data });
}
