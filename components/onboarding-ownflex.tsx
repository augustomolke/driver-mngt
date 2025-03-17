import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TriangleAlert, PackagePlus, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getDescription } from "@/lib/utils";

import TodoAlert from "./todo-alert";

import { LargePackageCard } from "./large-package-card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteAllocation } from "@/lib/db/allocations";
import CancelAllocationDialog from "./cancel-allocation-dialog";

export default function OnboardingOwnFlex({
  pendencias = [],
  largePackagesCard,
  options,
  allocations,
}) {
  return (
    <>
      <TodoAlert amount={pendencias.length} />
      <Accordion type="single" collapsible>
        {pendencias.includes("Rotas") && (
          <AccordionItem value="preferences">
            <AccordionTrigger className="text-xl">
              <span className="flex justify-start items-center gap-4">
                <TriangleAlert
                  size={36}
                  className="animate-pulse"
                  color="#EE4D2D"
                />
                Você foi escalado!
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              Você foi escalado para realizar entregas nos seguintes horários:
              <div className="flex  flex-col gap-2 items-center justify-center">
                {allocations?.map((a) => {
                  const description = getDescription(a);

                  return (
                    <div className="flex border rounded-full justify-between drop-shadow-md w-[100%]">
                      <Badge className="font-bold">{a.offer.cluster}</Badge>
                      <span key={a.offer.id} className="font-bold">
                        {/* {OwnFlexShifts.find((s) => s.id === a.shift)?.description} */}
                        {description}
                      </span>

                      {/* <Dialog>
                        <DialogTrigger>
                          <XCircle className="text-muted-foreground" />
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Você tem certeza?</DialogTitle>
                            <DialogDescription>
                              Se você cancelar, poderá escolher outra rota
                              somente se houverem vagas.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button
                                onClick={async () => {
                                  "use server";
                                  console.log("a");
                                }}
                              >
                                Cancelar minha rota
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog> */}

                      <CancelAllocationDialog
                        action={deleteAllocation}
                        id={a.id}
                      />
                    </div>
                  );
                })}
              </div>
              <span className="font-bold">Contamos com a sua presença!</span>
            </AccordionContent>
          </AccordionItem>
        )}

        {pendencias.includes("Preferências") && (
          <AccordionItem value="preferences">
            <AccordionTrigger className="text-xl">
              <span className="flex justify-start items-center gap-4">
                <TriangleAlert size={36} className="animate-pulse" />
                Regiões de Entrega
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              Você pode selecionar quantas regiões quiser. Quanto mais regiões
              selecionadas, maior a chance de terem rotas disponíveis para você.
              <Link href="/driver-panel/preferencias">
                <Button>Selecionar minha preferência</Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
        )}
        {pendencias.includes("Disponibilidade") && (
          <AccordionItem value="availability">
            <AccordionTrigger className="text-xl">
              <span className="flex justify-start items-center gap-4">
                <TriangleAlert size={36} className="animate-pulse" />
                Disponibilidade
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              Informe sua disponibilidade para os próximos 3 dias de
              carregamento. Você pode selecionar quantos dias e horários quiser.{" "}
              <strong>Se não puder comparecer, por favor, desmarque!</strong>
              <Link href="/driver-panel/disponibilidade">
                <Button>Informar disponibilidade</Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
        )}
        {largePackagesCard ? (
          <AccordionItem value="large-packages">
            <AccordionTrigger className="text-xl">
              <span className="flex justify-start items-center gap-4">
                <PackagePlus size={36} className="animate-pulse" />
                Rotas Especiais
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col">
              <LargePackageCard options={options} />
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>
    </>
  );
}
