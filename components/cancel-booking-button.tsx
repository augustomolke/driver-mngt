"use client";
import React from "react";
import { signOutAction } from "@/lib/getSession";
import { deleteBookingAction } from "@/lib/actions/booking-action";
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
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { saveFeedback } from "@/gsheets/feedback-gsheets";

export default ({ driverId, station, phone, bookingId, pastDate }) => {
  const [loading, setLoading] = React.useState(false);
  const [interest, setInterest] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button>Está com algum problema?</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Como podemos ajudar?</DialogTitle>

              <DialogDescription>
                <p className="my-4">
                  Você ainda tem interesse em ser um entregador parceiro Shopee?
                </p>

                <ToggleGroup
                  className="mb-4"
                  type="single"
                  value={interest}
                  onValueChange={(v) => setInterest(v)}
                >
                  <ToggleGroupItem
                    value="yes"
                    aria-label="Toggle bold"
                    className="border-2"
                  >
                    Sim
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="no"
                    aria-label="Toggle italic"
                    className="border-2"
                  >
                    Não
                  </ToggleGroupItem>
                </ToggleGroup>
                <DialogFooter>
                  {!!interest ? (
                    <div className="flex flex-col gap-8">
                      <Textarea
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                        placeholder="Escreva aqui suas sugestões, reclamações ou problemas que teve até agora."
                      />

                      {interest == "no" ? (
                        <Button
                          disabled={loading}
                          onClick={async () => {
                            setLoading(true);
                            try {
                              await saveFeedback({
                                driver_id: driverId,
                                station,
                                phone,
                                interest,
                                comment,
                              });
                              await deleteBookingAction(bookingId);
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
                            "Confirmar Cancelamento"
                          )}
                        </Button>
                      ) : (
                        <Button
                          disabled={loading}
                          onClick={async () => {
                            setLoading(true);
                            try {
                              await saveFeedback({
                                driver_id: driverId,
                                station,
                                phone,
                                interest,
                                comment,
                              });

                              setLoading(false);
                              setOpen(false);
                            } catch (e) {
                              setLoading(false);

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
                            "Enviar"
                          )}
                        </Button>
                      )}
                    </div>
                  ) : null}
                </DialogFooter>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
