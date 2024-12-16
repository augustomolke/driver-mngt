import { SignIn } from "@/components/ui/sign-in";
import { auth } from "@/auth";
import { getCurrentWeekDates } from "../utils";
import parser from "cron-parser";
import FirstTripForm from "@/components/first-trip-form";
import { Image } from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarClock, TrafficCone, Siren } from "lucide-react";

import { redirect } from "next/navigation";
import { ReviewPreferencesAlert } from "@/components/review-preferences-alert";
import { Separator } from "@/components/ui/separator";
import { NoSpotsCard } from "@/components/no-spots-card";
import { getEvent } from "@/lib/db/events";
import { getPreferences } from "@/lib/db/preferences";
import { getFirstTripBooking } from "@/lib/db/bookings";

export default async function Home() {
  const session = await auth();

  const bookings = await getFirstTripBooking(session.user.driverId.toString());

  if (bookings?.length > 0) {
    redirect("/primeira-entrega/congrats");
  }

  const preloadedPreferences = await getPreferences(
    session?.user.driverId.toString()
  );

  if (!(preloadedPreferences.length > 0)) {
    redirect("/primeira-entrega/preferencias");
  }

  const eventObj = await getEvent(session?.user.station, "FIRST_TRIP");

  const options = getCurrentWeekDates();

  const event = parser.parseExpression(eventObj.cron_exp, {
    ...options,
  });

  const eventsArray = [];

  while (true) {
    try {
      const evDate = event.next().toDate();
      const evString = evDate.toLocaleDateString("pt-br", {
        day: "numeric",
        month: "long",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
      const obj = { evDate, evString };
      eventsArray.push(obj);
    } catch (e) {
      break;
    }
  }

  const checks =
    session?.user.vehicle === "MOTO"
      ? [
          "Calçado de segurança confeccionado em couro com biqueira de composite",
          // "Luvas:  proteção das mãos do usuário contra agentes abrasivos, escoriantes e cortantes",
          "Colete Refletivo",
          "Alforje ou Baú fechado com capacidade mínima de 80L",
        ]
      : [
          "Calçado de segurança confeccionado em couro com biqueira de composite",
          // "Luvas:  proteção das mãos do usuário contra agentes abrasivos, escoriantes e cortantes",
          "Colete Refletivo",
        ];

  return (
    <div>
      <main className="flex flex-col items-center sm:items-start">
        <FirstTripForm
          preloadedPreferences={preloadedPreferences}
          dates={eventsArray}
          checks={checks}
          event={eventObj}
        />
      </main>
    </div>
  );
}
