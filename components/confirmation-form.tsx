"use client";
import * as React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Handshake, DollarSign } from "lucide-react";
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

export default function FirstTripForm({ checks, noSpots, event_id }) {
  const router = useRouter();

  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState([]);

  const form = useForm();

  const onSubmit = async () => {
    try {
      setLoading(true);
      await createBookingAction(new Date(), event_id);
    } catch (e) {
      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Ops!",
        description: "Algo deu errado.",
      });
      setLoading(false);
    }
  };

  if (noSpots) {
    return <NoSpotsCard />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-4 items-center">
          <Handshake height={32} width={32} />
          Confirmar interesse
        </CardTitle>

        <CardDescription>
          Ao confirmar seu interesse,{" "}
          <strong>entraremos em contato em até 7 dias</strong> para passar mais
          detalhes sobre sua primeira entrega conosco!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={driverArrived} />

        <CardDescription className="text-xl text-bold flex justify-center mt-4">
          <strong> Vamos começar nossa jornada juntos?</strong>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!loading && (
          <Button onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
        )}

        <Dialog>
          <DialogTrigger>
            <Button>Confirmar interesse!</Button>
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
                          onCheckedChange={(value) => {
                            if (value) {
                              setChecked((state) => [...state, c]);
                            } else {
                              setChecked((state) =>
                                state.filter((v) => v != c)
                              );
                            }
                          }}
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
                    onClick={onSubmit}
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
