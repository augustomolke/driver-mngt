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

export default async function Disponibilidade() {
  const dates = await fetchDates();

  const session = await auth();
  const prevBookings = await getAvailability(session?.user.driverId.toString());

  if (!(dates.length > 0)) {
    redirect("/driver-panel");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilidade</CardTitle>
        <CardDescription>
          Você pode confirmar disponibilidade para até três dias adiante.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <SchedulingForm dates={dates} prevBookings={prevBookings} />
      </CardContent>
    </Card>
  );
}
