import { PrismaClient } from "@prisma/client";
import { events, preferences, bookings } from "./data.ts";

const prisma = new PrismaClient();
async function main() {
  await prisma.bookings.deleteMany();
  await prisma.event.deleteMany();
  await prisma.preferences.deleteMany();

  await prisma.event.createMany({
    data: events,
  });

  const event = await prisma.event.findFirst({
    where: { event_type: "FIRST_TRIP" },
  });

  const id = event.id;

  await prisma.bookings.createMany({
    data: bookings
      .filter((b) => !!b.driver_id)
      .map((b) => ({ ...b, date: new Date(b.date), event_id: id })),
  });

  const prefs = preferences.reduce((acc, curr) => {
    var arr = [];

    try {
      const newStr = curr.preferences;
      // .replace(
      //   /(?<=[a-zA-Z])"(?=[a-zA-Z])/g,
      //   "\\'"
      // );

      const areas = newStr;

      arr = areas.map((area) => ({
        cep: area.cep,
        city: area.city,
        driver_id: curr.driver_id,
        driver_name: curr.driver_name,
        phone: curr.phone,
        station: curr.station,
        vehicle: curr.vehicle,
      }));
    } catch (e) {
      // console.log(curr);
    }

    return [...acc, ...arr];
  }, []);

  await prisma.preferences.createMany({
    data: prefs,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
