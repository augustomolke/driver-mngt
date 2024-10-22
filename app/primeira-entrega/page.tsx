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
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Image
              src={driver}
              height={250}
              alt="Driver"
              className="w-auto h-auto max-h-[250px]"
            />
            <CardTitle className="leading-8 text-2xl text-center sm:text-left">
              Olá <br />
              <strong>
                Motorista <br /> Parceiro
              </strong>
              !
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center sm:text-left">
            <p>Estamos felizes em ter você com a gente.</p>

            <p className="my-2">
              Agora, <strong>falta pouco</strong> para fazer suas entregas!
            </p>

            <p>
              <strong>Clique em "Vamos começar"</strong> e preencha as
              informações para agendar nosso 1° encontro.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center sm:justify-start">
          <Link href={"/primeira-entrega/preferencias"}>
            <Button className="w-full sm:w-auto">Vamos Começar!</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
