import prisma from "@/lib/db/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const data = await prisma.options.findMany();

  const options = data.map((option) => {
    const parsed = JSON.parse(option.options);
    return {
      driver_id: option.driver_id,
      hub: parsed.hub,
      large_packages: !!parsed.largePackages,
    };
  });

  return Response.json({ data: options });
}
