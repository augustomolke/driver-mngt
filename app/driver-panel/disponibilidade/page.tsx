import PreferencesForm from "@/components/preferences-form";
import Scheduling from "@/components/scheduling-form";
import { fetchDates } from "@/lib/getEvents";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Disponibilidade() {
  const dates = await fetchDates();
  const session = await auth();
  const preloadedBookings = await preloadQuery(api.bookings.get, {
    driver_id: session.user.driverId.toString(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilidade</CardTitle>
        <CardDescription>
          Você pode confirmar disponibilidade para té três dias adiante.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Scheduling dates={dates} preloadedBookings={preloadedBookings} />;
      </CardContent>

      <CardFooter>
        <div class="w-full flex justify-end">
          <Button type="submit" form="disponibilidade">
            Confirmar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
