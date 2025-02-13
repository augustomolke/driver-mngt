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
import { Badge } from "@/components/ui/badge";

import { Alert } from "@/components/ui/alert";
export default async function Disponibilidade() {
  const session = await auth();

  const dates = await fetchDates(session?.user.ownflex);

  const preferences = await getPreferences(session?.user.driverId.toString());
  const options = await getOptions(session?.user.driverId);

  if (session?.user.ownflex && (!preferences.length > 0 || !options)) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Você ainda não preencheu suas preferências!
            </DialogTitle>
            <DialogDescription>
              Para informar sua disponibilidade, é preciso preencher suas
              preferências.
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

  const prevBookings = await getAvailability(session?.user.driverId.toString());

  if (!(dates.length > 0)) {
    redirect("/driver-panel");
  }

  const shiftsOptions = session?.user.ownflex
    ? [
        { id: "AM", description: "6h às 10h" },
        { id: "PM", description: "15:30h às 18h" },
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
            Você pode sempre informar a sua disponibilidade para realizar
            entregas. Assim, a gente pode se preparar para{" "}
            <strong>dar a melhor experiência de carregamento!</strong>
          </div>
          <Dialog>
            <DialogTrigger>
              <Badge variant={"secondary"}>
                {`Modalidade ${
                  session?.user.ownflex ? "Flex" : "Entrega Comum"
                }`}
              </Badge>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Trocar de modalidade</DialogTitle>
                <DialogDescription className="flex flex-col gap-2">
                  <span>
                    Na modalidade Flex, você pode realizar coletas e entregas no
                    mesmo dia e maximizar os ganhos.
                  </span>
                  <strong>
                    A troca de modalidade pode demorar até 24h para ser
                    efetivada.
                  </strong>
                </DialogDescription>

                <DialogFooter>
                  <Link href="/driver-panel/preferencias">
                    <Button>
                      {`Trocar para 
                      ${session?.user.ownflex ? "Entrega Comum" : "Flex"}`}
                    </Button>
                  </Link>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
