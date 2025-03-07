import prisma from "@/lib/db/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const data = await prisma.preferences.findMany({
    where: { ownflex: false },
  });

  const response = pivotTable(
    data,
    ["driver_id", "driver_name", "phone", "vehicle", "station", "createdAt"],
    ["cep", "city"]
  ).sort((a, b) => {
    return Number(a.driver_id) > Number(b.driver_id) ? 1 : -1;
  });

  return Response.json({ data: response });
}

function pivotTable(data, groupKeys, concatenateKeys) {
  if (!Array.isArray(data) || data.length === 0) return [];

  const result = {};

  data.forEach((item) => {
    const groupKey = groupKeys.map((key) => item[key]).join("|"); // Create a unique key for grouping

    if (!result[groupKey]) {
      // Initialize the group with keys and arrays for each concatenateKey
      result[groupKey] = {
        ...Object.fromEntries(groupKeys.map((key) => [key, item[key]])),
        ...Object.fromEntries(concatenateKeys.map((key) => [key, []])),
      };
    }

    // Aggregate by concatenating values for each concatenateKey
    concatenateKeys.forEach((key) => {
      result[groupKey][key].push(item[key]);
    });
  });

  // Convert grouped results back into an array, joining concatenated values
  return Object.values(result).map((group) => ({
    ...group,
    ...Object.fromEntries(
      concatenateKeys.map((key) => [key, group[key].join(", ")])
    ),
  }));
}
