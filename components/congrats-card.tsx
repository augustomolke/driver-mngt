"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { deleteBookingAction } from "@/lib/booking-action";
import { useToast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signOut } from "@/auth";
import { signOutAction } from "@/lib/getSession";
import { redirect } from "next/dist/server/api-utils";

export default function ({ booking, user }) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirmação de Agendamento</CardTitle>
      </CardHeader>
      <CardContent>Informações do agendamento</CardContent>
      <CardFooter className="flex flex-col">
        <Button
          disabled={loading}
          onClick={async () => {
            await signOutAction({ redirectTo: "/login" });
          }}
        >
          {loading ? (
            <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
          ) : (
            "Já fiz minha primeira entrega!"
          )}
        </Button>

        <Button
          disabled={loading}
          variant={"outliner"}
          onClick={async () => {
            setLoading(true);
            try {
              await deleteBookingAction(user.driverId, booking._id);
            } catch (e) {
              toast({
                icon: <CircleX height={48} width={48} />,
                title: "Ops!",
                description: "Algo deu errado.",
              });
            }
          }}
        >
          {loading ? null : "Desistir do agendamento"}
        </Button>
      </CardFooter>
    </Card>
  );
}
