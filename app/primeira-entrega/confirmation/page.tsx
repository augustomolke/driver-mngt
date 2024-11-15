import { SignIn } from "@/components/ui/sign-in";
import { auth } from "@/auth";
import ConfirmationForm from "@/components/confirmation-form";
import { Image } from "next/image";
import { getEvent } from "@/lib/db/events";

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
import { getPreferences } from "@/lib/db/preferences";
import { getFirstTripBooking } from "@/lib/db/bookings";
import { getLocations } from "@/gsheets/locations";

export default async function Home() {
  const session = await auth();

  const booking = await getFirstTripBooking(session?.user.driverId.toString());

  if (!!booking) {
    redirect("/primeira-entrega");
  }

  const preloadedPreferences = await getPreferences(
    session?.user.driverId.toString()
  );
  if (preloadedPreferences.length == 0) {
    redirect("/primeira-entrega/preferencias");
  }

  const locations = await getLocations(session?.user.station);

  const event = await getEvent(session?.user.station, "FIRST_TRIP");

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
        <ConfirmationForm
          event_id={event.id}
          noSpots={
            preloadedPreferences.findIndex((pref) =>
              locations
                .filter((loc) => !!loc.priority)
                .map((loc) => loc.cep5)
                .includes(pref.cep)
            ) < 0
          }
          checks={checks}
        />
      </main>
    </div>
  );
}
