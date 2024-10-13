import Image from "next/image";
import { SignIn } from "@/components/ui/sign-in";
import { auth } from "@/auth";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { getCurrentWeekDates } from "../utils";
import parser from "cron-parser";
import FirstTripForm from "@/components/first-trip-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  const preferences = await fetchQuery(api.preferences.get, {
    driver_id: session.user.driverId.toString(),
  });

  if (!(preferences.length > 0)) {
    redirect("/primeira-entrega/preferencias");
  }

  const eventsResult = await fetchQuery(api.events.get, {
    station: session?.user.station,
  });

  const events = eventsResult.filter((e) => e.event_type == "First-trip");

  const options = getCurrentWeekDates();

  const event = parser.parseExpression(events[0].cron_exp, {
    ...options,
  });

  const eventsArray = [];

  while (true) {
    try {
      const obj = event.next().toDate().toLocaleDateString("pt-br", {
        day: "numeric",
        month: "long",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
      eventsArray.push(obj);
    } catch (e) {
      break;
    }
  }

  return (
    <div>
      <main className="flex flex-col items-center sm:items-start">
        {eventsArray.length > 0 ? (
          <FirstTripForm dates={eventsArray} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Agendamento</CardTitle>
            </CardHeader>
            <CardContent>
              A próxima data disponível é:
              {eventsArray[0]}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
