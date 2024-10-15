"use client";
import React from "react";
import { signOutAction } from "@/lib/getSession";
import { deleteBookingAction } from "@/lib/booking-action";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CircleX } from "lucide-react";

export default ({ driverId, bookingId }) => {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  return (
    <>
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
            await deleteBookingAction(driverId, bookingId);
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
    </>
  );
};
