import { SignIn } from "@/components/ui/sign-in";
import { auth } from "@/auth";
import { api } from "@/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import ConfirmationForm from "@/components/confirmation-form";
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

  const preloadedPreferences = await preloadQuery(api.preferences.get, {
    driver_id: session.user.driverId.toString(),
  });

  if (!(preloadedPreferences._valueJSON.length > 0)) {
    redirect("/primeira-entrega/preferencias");
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
        <ConfirmationForm
          preloadedPreferences={preloadedPreferences}
          eventId={preloadedPreferences._valueJSON[0].station}
          checks={checks}
        />
      </main>
    </div>
  );
}
