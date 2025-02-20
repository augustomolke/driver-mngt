import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TriangleAlert, PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import TodoAlert from "./todo-alert";

import { LargePackageCard } from "./large-package-card";

export default function OnboardingOwnFlex({
  pendencias = [],
  largePackagesCard,
  options,
}) {
  return (
    <>
      <TodoAlert amount={pendencias.length} />
      <Accordion type="single" collapsible>
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
