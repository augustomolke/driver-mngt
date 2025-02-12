import SchedulingForm from "@/components/scheduling-form";
import { fetchDates } from "@/lib/getEvents";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getAvailability } from "@/lib/db/bookings";
import { Separator } from "@/components/ui/separator";

export default async function Disponibilidade() {
  const session = await auth();

  const dates = await fetchDates(); //session?.user.ownflex ? 1 : null);

  const prevBookings = await getAvailability(session?.user.driverId.toString());

  if (!(dates.length > 0)) {
    redirect("/driver-panel");
  }

  const shiftsOptions = session?.user.ownflex
    ? [
        { id: "AM", description: "6AM" },
        { id: "PM", description: "12PM" },
        { id: "SD", description: "16PM" },
      ]
    : [
        { id: "AM", description: "AM" },
        { id: "PM", description: "PM" },
        { id: "SD", description: "SD" },
      ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilidade</CardTitle>
        <CardDescription>
          Você pode sempre informar a sua disponibilidade para realizar
          entregas. Assim, a gente pode se preparar para{" "}
          <strong>dar a melhor experiência de carregamento!</strong>
          <Separator className="my-2" />
          Escolha quais turnos e datas você gostaria de carregar abaixo:
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <SchedulingForm
          dates={dates}
          shiftsOptions={shiftsOptions}
          prevBookings={prevBookings.filter(
            ({ station }) =>
              station ==
              (session?.user.choosed_station || session?.user.station)
          )}
        />
      </CardContent>
    </Card>
  );
}
