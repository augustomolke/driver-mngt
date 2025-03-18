import React from "react";
import { TriangleAlert, CircleCheckBig } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CancelAllocationDialog from "./cancelAllocationDialog";
import { Badge } from "@/components/ui/badge";
import { getDescription } from "@/lib/utils";

interface DriverPendingAlertProps {
  pendencias?: string[];
  allocations?: any[];
  deleteAllocation?: (id: string) => void;
}

const DriverPendingAlert: React.FC<DriverPendingAlertProps> = ({
  pendencias = [],
  allocations = [],
  deleteAllocation,
}) => {
  const hasPendencias = pendencias.length > 0;
  const Icon = hasPendencias ? TriangleAlert : CircleCheckBig;
  const message = hasPendencias
    ? `Você possui ${pendencias.length} pendência${pendencias.length > 1 ? "s" : ""}!`
    : "Você não possui pendências para revisar.";

  return (
    <div>
      <div className="bg-[#64a456] w-full h-auto p-4 rounded-md flex flex-col items-center">
        <div className="flex flex-row items-center">
          <Icon className="h-8 w-8 mr-2" />
          <strong>{message}</strong>
        </div>
      </div>


      {hasPendencias && (
        <Accordion type="single" collapsible className="w-full mt-4">
          {pendencias.includes("Rotas") && (
            <AccordionItem value="rotas">
              <AccordionTrigger className="text-xl flex items-center gap-4 text-[#384b8f]">
                <TriangleAlert size={24} className="animate-pulse text-[#384b8f]" />
                <p className=" w-full flex "> Você foi escalado! </p>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <p className="text-[#384b8f]">Você foi escalado para realizar entregas nos seguintes horários:</p>
                <div className="flex flex-col gap-2">
                  {allocations?.map((a) => {
                    const description = getDescription(a);
                    return (
                      <div key={a.id} className="flex border rounded-full justify-between drop-shadow-md w-full p-2">
                        <Badge className="font-bold">{a.offer.cluster}</Badge>
                        <span className="font-bold">{description}</span>
                        {deleteAllocation && (
                          <CancelAllocationDialog action={deleteAllocation} id={a.id} />
                        )}
                      </div>
                    );
                  })}
                </div>
                <span className="font-bold">Contamos com a sua presença!</span>
              </AccordionContent>
            </AccordionItem>
          )}


          {pendencias.includes("Preferências") && (
            <AccordionItem value="preferencias">
              <AccordionTrigger className="text-xl flex items-center gap-4 text-[#384b8f]">
                <TriangleAlert size={24} className="animate-pulse text-[#384b8f]" />
                <p className=" w-full flex "> Regiões de Entrega </p>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[#384b8f]">
                  Você pode selecionar quantas regiões quiser. Quanto mais regiões selecionadas, maior a
                  chance de terem rotas disponíveis para você.
                </p>
                <Link href="/driver-panel/preferencias">
                  <Button>Selecionar minha preferência</Button>
                </Link>
              </AccordionContent>
            </AccordionItem>
          )}


          {pendencias.includes("Disponibilidade") && (
            <AccordionItem value="disponibilidade">
            <AccordionTrigger className="text-xl gap-4 text-[#384b8f] ">
              <TriangleAlert size={35} className="animate-pulse text-[#384b8f] " />
               <p className=" w-full flex "> Disponibilidade </p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-[#384b8f]">
                Informe sua disponibilidade para os próximos 3 dias de carregamento. Você pode selecionar
                quantos dias e horários quiser.
                <strong> Se não puder comparecer, por favor, desmarque!</strong>
              </p>
              <Link href="/driver-panel/disponibilidade">
                <Button className="mt-10">Atualizar disponibilidade</Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
          )}
        </Accordion>
      )}
    </div>
  );
};

export default DriverPendingAlert;