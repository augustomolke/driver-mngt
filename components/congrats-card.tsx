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

export default function ({ booking, user }) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirmação de Agendamento</CardTitle>
      </CardHeader>
      <CardContent>Informações do agendamento</CardContent>
      <CardFooter>
        <Button
          disabled={loading}
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
          {loading ? (
            <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
          ) : (
            "Desistir do agendamento"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
