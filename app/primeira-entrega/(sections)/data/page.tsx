import { auth } from "@/auth";
import { getCurrentWeekDates } from "../../utils";
import parser from "cron-parser";
import FirstTripForm from "@/components/first-trip-form";

import { redirect } from "next/navigation";
import { getEvent } from "@/lib/db/events";
import { getPreferences } from "@/lib/db/preferences";
import { getFirstTripBooking, getSpots } from "@/lib/db/bookings";
import { getLocations } from "@/gsheets/locations";

const holidays = [
  { month: 12, day: 25 },
  { month: 1, day: 1 },
];

const checkHolidays = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const found = holidays.find((h) => h.month == month && h.day == day);

  return !!found;
};

function groupByDate(items) {
  return items.reduce((acc, item) => {
    const { date } = item;
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
    }
    return acc;
  }, {});
}

export default async function Home() {
  const session = await auth();

  const bookings = await getFirstTripBooking(session.user.driverId.toString());

  if (bookings?.length > 0) {
    redirect("/primeira-entrega/congrats");
  }

  const preloadedPreferences = await getPreferences(
    session?.user.driverId.toString(),
    session?.user.station
  );

  if (!(preloadedPreferences.length > 0)) {
    redirect("/primeira-entrega/preferencias");
  }

  const locations = await getLocations(session?.user.station);

  const ceps = preloadedPreferences.map((p) => p.cep);
  const priority = locations.filter(
    (l) => ceps.includes(l.cep5) && l.priority == "true"
  );

  if (!priority.length > 0) {
    redirect("/primeira-entrega/waitlist");
  }

  const bookingsPerHub = await getSpots(session.user.station);

  const availableSpots = groupByDate(bookingsPerHub);

  const eventObj = await getEvent(session?.user.station, "FIRST_TRIP");

  if (!eventObj) {
    redirect("/primeira-entrega/waitlist");
  }

  const options = getCurrentWeekDates();

  const event = parser.parseExpression(eventObj.cron_exp, {
    ...options,
  });

  const eventsArray = [];

  while (true) {
    try {
      const evDate = event.next().toDate();

      if (!checkHolidays(evDate)) {
        const evString = evDate?.toLocaleDateString("pt-br", {
          day: "numeric",
          month: "long",
          weekday: "long",
          // hour: "2-digit",
          // minute: "2-digit",
        });

        const key = evDate?.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        if (!availableSpots[key] || availableSpots[key] < 10) {
          const obj = { evDate, evString };

          eventsArray.push(obj);
        }
      }
    } catch (e) {
      break;
    }
  }

  if (!eventsArray.length > 0) {
    redirect("/primeira-entrega/waitlist");
  }

  const shifts = eventObj.options ? JSON.parse(eventObj.options).shifts : [];

  const checks =
    session?.user.vehicle === "MOTO"
      ? [
          "Bota de segurança com certificado de aprovação",
          "Colete Refletivo",
          "Alforje ou Baú fechado com capacidade mínima de 80L",
        ]
      : ["Bota de segurança com certificado de aprovação", "Colete Refletivo"];

  return (
    <div>
      <main className="flex flex-col items-center sm:items-start">
        <FirstTripForm
          preloadedPreferences={preloadedPreferences}
          dates={eventsArray}
          checks={checks}
          event={eventObj}
          shifts={shifts}
        />
      </main>
    </div>
  );
}
