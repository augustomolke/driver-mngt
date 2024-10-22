"use client";
import React from "react";
import { signOutAction } from "@/lib/getSession";
import { deleteBookingAction } from "@/lib/booking-action";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CircleX } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FeedbackForm from "./feedback-form";

export default ({ driverId, bookingId, pastDate }) => {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  return (
    <>
      {pastDate ? (
        <Dialog>
          <DialogTrigger>
            <Button className="p-8 text-xl text-bold text-white">
              Conta pra gente como <br />
              foi seu primeiro dia!
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Como foi sua experiência?</DialogTitle>
              <DialogDescription>
                <FeedbackForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button>Desistir do agendamento</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Você tem certeza?</DialogTitle>
              <DialogDescription>
                Caso queira,{" "}
                <strong>
                  você poderá agendar novamente se houverem vagas.
                </strong>
                <DialogFooter>
                  <Button
                    disabled={loading}
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
                    {loading ? (
                      <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
                    ) : (
                      "Confirmar"
                    )}
                  </Button>
                </DialogFooter>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
