"use client";
import * as React from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
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
import { ArrowLeft } from "lucide-react";

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Preloaded } from "convex/react";
import { useSession } from "next-auth/react";
import { usePreloadedQuery } from "convex/react";
import { BadgeIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { createBookingAction } from "@/lib/booking-action";
import driverArrived from "@/components/assets/driver-arrived.svg";
import Image from "next/image";

export default function FirstTripForm({ dates, eventId }) {
  const router = useRouter();

  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState();

  const form = useForm();

  const onSubmit = async () => {
    try {
      setLoading(true);
      await createBookingAction(value, eventId);
    } catch (e) {
      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Ops!",
        description: "Algo deu errado.",
      });
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-4 items-center">
          <CalendarClock height={32} width={32} />
          Data e horário
        </CardTitle>
        <CardDescription>
          Estas são as datas disponíveis para você no momento. Escolha uma para
          agendar seu treinamento prático.
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
                      <Select value={value} onValueChange={(a) => setValue(a)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Escolha uma data" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Datas disponíveis</SelectLabel>
                            {dates.map((date) => (
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
          </form>
        </Form>
        <Image src={driverArrived} />

        <CardDescription>
          Caso não encontre uma data, não se preocupe!{" "}
          <strong>Estamos sempre abrindo novas vagas.</strong> Fique de olho!
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!loading && (
          <Button onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
        )}

        <Button type="submit" form="first-trip" disabled={!value}>
          {loading ? (
            <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
          ) : (
            "Confirmar agendamento"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
