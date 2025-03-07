import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TriangleAlert, PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getDescription } from "@/lib/utils";

import TodoAlert from "./todo-alert";

import { LargePackageCard } from "./large-package-card";

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
                    <div className="flex border rounded-full justify-between pr-4 drop-shadow-md w-[90%]">
                      <Badge className="font-bold">{a.offer.cluster}</Badge>
                      <span key={a.offer.id} className="font-bold">
                        {/* {OwnFlexShifts.find((s) => s.id === a.shift)?.description} */}
                        {description}
                      </span>
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
