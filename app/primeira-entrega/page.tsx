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
import driver from "@/components/assets/delivery-man.svg";
import { redirect } from "next/navigation";

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
      redirect("/primeira-entrega/congrats");
    }
  }

  return (
    <Card>
      <CardHeader>
        <div class="flex justify-center items-center">
          <Image src={driver} height={250} />
          <CardTitle class="leading-8 text-2xl">
            Olá <br />
            <strong>
              Motorista <br /> Parceiro
            </strong>
            !
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p>Estamos felizes em ter você com a gente.</p>

        <p class="my-2">
          Agora, <strong>falta pouco</strong> para fazer suas entregas!
        </p>

        <p>
          <strong>Clique em "Vamos começar"</strong> e preencha as informações
          para agendar nosso 1° encontro.
        </p>
      </CardContent>
      <CardFooter>
        <Link href={"/primeira-entrega/preferencias"}>
          <Button>Vamos Começar!</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
