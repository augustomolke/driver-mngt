import { SignIn } from "@/components/ui/sign-in";
import { auth } from "@/auth";
import { api } from "@/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
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

export default async function Home() {
  const session = await auth();

  const bookings = await fetchQuery(api.bookings.get, {
    driver_id: session.user.driverId.toString(),
  });

  if (bookings.length > 0) {
    redirect("/primeira-entrega");
  }

  const preloadedPreferences = await getPreferences(
    session?.user.driverId.toString()
  );

  if (
    preloadedPreferences.neverFilled ||
    !(preloadedPreferences.preferences.length > 0)
  ) {
    redirect("/primeira-entrega/preferencias");
  }

  const eventsResult = await fetchQuery(api.events.get, {
    station: session?.user.station,
  });

  const events = eventsResult.filter((e) => e.event_type == "First-trip");

  const options = getCurrentWeekDates();

  const event = parser.parseExpression(events[0].cron_exp, {
    ...options,
  });

  const eventsArray = [];

  while (true) {
    try {
      const obj = event.next().toDate().toLocaleDateString("pt-br", {
        day: "numeric",
        month: "long",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
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
          eventId={events[0]._id}
          checks={checks}
        />
      </main>
    </div>
  );
}
