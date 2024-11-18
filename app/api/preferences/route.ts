import prisma from "@/lib/db/db";
import { date } from "zod";

export async function GET(request: Request) {
  const data = await prisma.preferences.findMany();

  return Response.json({ data });
}

export async function POST(request: Request) {
  const { station } = await request.json();
  const data = await prisma.preferences.findMany({
    where: { station },
  });

  return Response.json({ data });
}
