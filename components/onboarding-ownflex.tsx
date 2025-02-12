import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getOptions } from "@/lib/db/options";
import { auth } from "@/auth";
import { getPreferences } from "@/lib/db/preferences";
import { getAvailability } from "@/lib/db/bookings";
import TodoAlert from "./todo-alert";

export default async function OnboardingOwnFlex() {
  const session = await auth();

  const [options, preferences, bookings] = await Promise.all([
    getOptions(session?.user.driverId),
    getPreferences(session?.user.driverId.toString()),
    getAvailability(session?.user.driverId.toString()),
  ]);

  const pendencias = [];
  if (bookings.length == 0) {
    pendencias.push("Disponibilidade");
  }

  if (preferences.length == 0 || !options?.options) {
    pendencias.push("Preferências");
  }

  return (
    <>
      <TodoAlert amount={pendencias.length} />
      <Accordion type="single" collapsible>
        {pendencias.includes("Preferências") && (
          <AccordionItem value="preferences">
            <AccordionTrigger className="text-2xl">
              <span className="flex justify-start gap-4">
                <TriangleAlert size={36} className="animate-pulse" />
                Preferências
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              Você pode selecionar áreas, dias e hoários de preferência para
              realizar carregamentos! Nós utilizamos essa informação para te dar
              a melhor experiência.
              <Link href="/driver-panel/preferencias">
                <Button>Informar minhas preferências</Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
        )}
        {pendencias.includes("Disponibilidade") && (
          <AccordionItem value="availability">
            <AccordionTrigger className="text-2xl">
              <span className="flex justify-start gap-4">
                <TriangleAlert size={36} className="animate-pulse" />
                Disponibilidade
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              Você pode informar se está disponível para carregamentos para cada
              turno.
              <Link href="/driver-panel/disponibilidade">
                <Button>Informar disponibilidade</Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </>
  );
}
