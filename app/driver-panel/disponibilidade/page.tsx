import SchedulingForm from "@/components/scheduling-form";
import { fetchDates } from "@/lib/getEvents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getAvailability } from "@/lib/db/bookings";
import { Separator } from "@/components/ui/separator";
import { getPreferences } from "@/lib/db/preferences";
import { getOptions } from "@/lib/db/options";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import HubSelection from "@/components/hub-select";
import { parse } from "path";

export default async function Disponibilidade() {
  const session = await auth();

  const dates = await fetchDates(session?.user.ownflex);

  const options = await getOptions(session?.user.driverId);
  const parsedOptions = JSON.parse(options?.options || "");

  const choosed_station = options ? parsedOptions?.hub : session?.user.station;

  const station =
    choosed_station !== "LM" ? choosed_station : session?.user.station;

  const preferences = await getPreferences(
    session?.user.driverId.toString(),
    station
  );

  if (choosed_station !== "LM" && preferences.length < 5) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Você ainda não preencheu suas preferências!
            </DialogTitle>
            <DialogDescription>
              Para informar sua disponibilidade, é preciso escolher pelo menos 5
              regiões de preferência.
            </DialogDescription>

            <DialogFooter>
              <Link href="/driver-panel/preferencias">
                <Button>Ir para preferências</Button>
              </Link>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  const prevBookings = await getAvailability(
    session?.user.driverId.toString(),
    station
  );

  if (!(dates.length > 0)) {
    redirect("/driver-panel");
  }

  const shiftsOptions =
    choosed_station !== "LM"
      ? [
          { id: "AM", description: "6h às 10h" },
          { id: "PM", description: "15:30h às 18h", exclude: [0] },
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
        <CardDescription className="flex flex-col gap-2">
          <div>
            Informe sua disponibilidade para os próximos 3 dias de carregamento.
            Você pode selecionar quantos dias e horários quiser.{" "}
            <strong>Se não puder comparecer, por favor, desmarque!</strong>
          </div>
          {session?.user.ownflex && (
            <HubSelection
              defaultValue={parsedOptions?.hub}
              options={[
                { key: "LM", label: session.user.station },
                { key: "OF-Lapa", label: "Entrega Rápida - Lapa" },
              ]}
            />
          )}
          <Separator className="my-2" />
          Escolha quais turnos e datas você gostaria de carregar abaixo:
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <SchedulingForm
          dates={dates}
          shiftsOptions={shiftsOptions}
          prevBookings={prevBookings.filter(
            (booking) => booking.station == station
          )}
          station={station}
        />
      </CardContent>
    </Card>
  );
}
