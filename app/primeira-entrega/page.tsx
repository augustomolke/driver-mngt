import Image from "next/image";
import { SignIn } from "@/components/ui/sign-in";
import { auth } from "@/auth";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { getCurrentWeekDates } from "./utils";
import parser from "cron-parser";
import FirstTripForm from "@/components/first-trip-form";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteBookingAction } from "@/lib/booking-action";
import CongratsCard from "@/components/congrats-card";

export default async function Home() {
  const session = await auth();
  const bookings = await fetchQuery(api.bookings.get, {
    driver_id: session.user.driverId.toString(),
  });

  if (bookings.length > 0) {
    const event = await fetchQuery(api.events.get, {
      id: bookings[0].event_id,
    });

    if (event.event_type == "First-trip") {
      return <CongratsCard booking={bookings[0]} user={session?.user} />;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Treinamento prático</CardTitle>
      </CardHeader>
      <CardContent>Agendar</CardContent>
      <CardFooter>
        <Link href={"/primeira-entrega/preferencias"}>
          <Button>Começar!</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
