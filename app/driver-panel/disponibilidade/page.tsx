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
import { AlertTitle, Alert, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default async function Disponibilidade() {
  const session = await auth();

  const dates = await fetchDates(session?.user.ownflex);

  const options = await getOptions(session?.user.driverId);
  const parsedOptions = options?.options ? JSON.parse(options?.options) : {};

  const choosed_station =
    !!parsedOptions?.hub && parsedOptions?.hub != "LM"
      ? parsedOptions?.hub
      : session?.user.station;

  const preferences = await getPreferences(
    session?.user.driverId.toString(),
    choosed_station
  );

  if (
    !!parsedOptions?.hub &&
    parsedOptions?.hub !== "LM" &&
    preferences.length < 5
  ) {
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
    choosed_station
  );

  if (!(dates.length > 0)) {
    redirect("/driver-panel");
  }

  const shiftsOptions =
    !!parsedOptions?.hub && parsedOptions?.hub !== "LM"
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
        <CardDescription className="flex flex-col gap-4">
          <div>
            Informe sua disponibilidade para os próximos 3 dias de carregamento.
            Você pode selecionar quantos dias e horários quiser.{" "}
            <strong>Se não puder comparecer, por favor, desmarque!</strong>
          </div>
          {session?.user.ownflex && (
            <Alert variant={"secondary"} className="space-y-2">
              <AlertTitle className="font-bold flex gap-2 items-center">
                <TriangleAlert className="animate-pulse" />
                Atenção!
              </AlertTitle>

              <AlertDescription>
                Você está confirmando sua disponibilidade para o hub:
              </AlertDescription>

              <HubSelection
                defaultValue={parsedOptions?.hub}
                options={[
                  { key: "LM", label: session.user.station.split("_")[2] },
                  { key: "OF-Lapa", label: "Entrega Rápida - Lapa" },
                ]}
              />
            </Alert>
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
            (booking) => booking.station == choosed_station
          )}
          station={choosed_station}
          ownflex={
            !!parsedOptions?.hub && parsedOptions?.hub !== "LM" ? true : false
          }
        />
      </CardContent>
    </Card>
  );
}
