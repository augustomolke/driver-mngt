import Image from "next/image";
import { SignIn } from "@/components/ui/sign-in";
import { auth } from "@/auth";
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
import { deleteBookingAction } from "@/lib/actions/booking-action";
import driver from "@/components/assets/delivery-man.svg";
import { redirect } from "next/navigation";
import { getFirstTripBooking } from "@/lib/db/bookings";

export default async function Home() {
  const session = await auth();

  const event = await getFirstTripBooking(session.user.driverId.toString());

  if (!!event) {
    redirect("/primeira-entrega/waitlist");
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center items-center">
            <Image
              src={driver}
              height={250}
              alt="Driver"
              className="mx-[-12px]"
            />
            <CardTitle className="leading-8 text-2xl text-left">
              Olá <br />
              <strong>
                Motorista <br /> Parceiro
              </strong>
              !
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-left">
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
