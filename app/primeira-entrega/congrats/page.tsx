import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin } from "lucide-react";
import CancelBookingButton from "@/components/cancel-booking-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { CircleCheckBig } from "lucide-react";
import getMap from "@/lib/getMap";

const secret = process.env.SECRET;

const api_url = process.env.GSHEET_AUTH_API_URL;

export default async function () {
  const session = await auth();

  const user = session?.user;

  const bookings = await fetchQuery(api.bookings.get, {
    driver_id: session.user.driverId.toString(),
  });

  if (bookings.length > 0) {
    const event = await fetchQuery(api.events.get, {
      id: bookings[0].event_id,
    });

    if (event.event_type != "First-trip") {
      redirect("/");
    }
  } else {
    redirect("/");
  }
  const booking = bookings[0];

  const mapInfo = await getMap(session?.user.station);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-4">
          <CircleCheckBig color="hsl(var(--green))" height={64} width={96} />
          Agendamento realizado com sucesso!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center justify-between mb-2">
          <Calendar />
          <p class="text-base max-w-[12.5rem]">
            <strong>Data e horário:</strong> <br />
            {booking.instance}
          </p>
        </div>

        <Separator className="my-2" />

        <div class="flex items-center justify-between mb-2">
          <MapPin />
          <p class="text-base max-w-[12.5rem]">
            <strong>Endereço:</strong> <br />
            {mapInfo.address}
          </p>
        </div>

        <Separator className="my-2" />

        <div className="flex flex-col justify-center items-center">
          <a
            href={`http://maps.google.com/?q=${mapInfo.latitude},${mapInfo.longitude}`}
            target="_blank"
          >
            <img
              src={mapInfo.map}
              alt="Mapa"
              className="border-[--background] border-2 rounded-lg"
            />
          </a>
          <div className="flex justify-end w-full">
            <span className="text-xs italic mr-8">
              *Região de atuação aproximada
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <CancelBookingButton
          driverId={session?.user.driverId}
          bookingId={booking._id}
        />
      </CardFooter>
    </Card>
  );
}
