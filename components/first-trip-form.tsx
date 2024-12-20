"use client";
import * as React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CalendarClock, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TrashIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { ArrowLeft, CircleX } from "lucide-react";
import worker from "@/components/assets/warehouse-worker.svg";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { BadgeIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { createBookingAction } from "@/lib/actions/booking-action";
import driverArrived from "@/components/assets/driver-arrived.svg";
import Image from "next/image";
import { NoSpotsCard } from "./no-spots-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export default function FirstTripForm({
  dates,
  checks,
  event,
  preloadedPreferences,
  shifts,
}) {
  const router = useRouter();

  const preferences = preloadedPreferences;

  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState();
  const [shift, setShift] = React.useState();
  const [exp, setExp] = React.useState();

  const [checked, setChecked] = React.useState([]);

  const form = useForm();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const selectedDate = dates.find((d) => d.evString == value);

      const options = JSON.parse(event.options);

      const instructions = options?.instructions;

      await createBookingAction(
        selectedDate.evDate,
        event.id,
        shift,
        exp,
        shifts.find((s) => s.name == shift)?.description,
        instructions
      );
    } catch (e) {
      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Ops!",
        description: "Algo deu errado.",
      });
      setLoading(false);
    }
  };

  // if (
  //   dates.length == 0 ||
  //   preferences.filter((p) => !!p.priority).length == 0
  // ) {
  //   return <NoSpotsCard />;
  // }

  if (dates.length == 1) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-4 items-center">
            <CalendarClock height={32} width={32} />
            Data e horário
          </CardTitle>{" "}
        </CardHeader>

        <CardContent>
          A próxima data disponível será
          <strong>{dates[0].evString}</strong>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-4 items-center">
          <CalendarClock height={32} width={32} />
          Data e horário
        </CardTitle>
        <Image src={driverArrived} />

        <CardDescription>
          Estas são as datas disponíveis para você no momento.{" "}
          <strong>Escolha uma para agendar seu treinamento prático.</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            id="first-trip"
          >
            <FormField
              control={form.control}
              name="booking-date"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={value}
                        onValueChange={(a) => {
                          console.log(a);
                          setValue(a);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Escolha uma data" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Datas disponíveis</SelectLabel>
                            {dates.map(({ evString: date }) => (
                              <SelectItem value={date}>{date}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Separator />

            {value ? (
              <FormField
                control={form.control}
                name="shift"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <CardDescription>
                        Você deve{" "}
                        <strong>escolher uma janela de expedição</strong> que se
                        encaixe melhor na sua agenda:
                      </CardDescription>
                      <FormControl>
                        <Select
                          value={shift}
                          onValueChange={(a) => setShift(a)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Escolha uma janela" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Janelas disponíveis</SelectLabel>

                              {shifts
                                .filter(
                                  (s) =>
                                    ([
                                      "terça-feira, 24 de dezembro",
                                      "terça-feira, 31 de dezembro",
                                    ].includes(value) &&
                                      s.name != "PM") ||
                                    ![
                                      "terça-feira, 24 de dezembro",
                                      "terça-feira, 31 de dezembro",
                                    ].includes(value)
                                )
                                .map(({ name, description }) => (
                                  <SelectItem value={name}>
                                    {name} - {description}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ) : null}

            {shift ? (
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <CardDescription>
                        Queremos que sua primeira entrega com a Shopee seja
                        especial! Para isso,{" "}
                        <strong>
                          conta pra gente se você já realizou entregas em outras
                          plataformas
                        </strong>
                        .
                      </CardDescription>
                      <FormControl>
                        <Select value={exp} onValueChange={(a) => setExp(a)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Escolha uma janela" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Minha experiência</SelectLabel>

                              <SelectItem value={"sim"}>
                                Já possuo experiência
                              </SelectItem>

                              <SelectItem value={"não"}>
                                Vai ser minha primeira vez!
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ) : null}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!loading && (
          <Button onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
        )}

        <Dialog>
          <DialogTrigger>
            <Button disabled={!value || !shift || !exp}>
              Confirmar agendamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sua segurança é nossa prioridade!</DialogTitle>
              <DialogDescription>
                Antes de prosseguir, é necessário garantir que você possui os
                equipamentos de segurança obrigatórios!{" "}
                <strong>
                  Sem esses itens, não será permitida a entrada nas instalações!
                </strong>
                <div className="flex justify-center items-center">
                  <Image src={worker} width={120} className="tra" />
                  <div className="gap-4 flex flex-col justify-start items-start">
                    {checks.map((c, idx) => (
                      <div className="flex gap-2 w-full">
                        <Checkbox
                          id={idx}
                          value={c}
                          onCheckedChange={() =>
                            setChecked((state) => [...state, c])
                          }
                        />
                        <Label className="text-left" for={idx}>
                          {c}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    form="first-trip"
                    disabled={!(checked.length == checks.length)}
                  >
                    {loading ? (
                      <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
                    ) : (
                      "Confirmar agendamento"
                    )}
                  </Button>
                </DialogFooter>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
