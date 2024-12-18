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
  return (
    <div>
      <main className="flex flex-col items-center sm:items-start">
        <NoSpotsCard />
        {/* <ConfirmationForm
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
        /> */}
      </main>
    </div>
  );
}
