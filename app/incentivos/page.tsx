import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import motorista from "@/components/assets/package-on-the-way.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Page({ searchParams }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Algumas áreas garantem benefícios extras!</CardTitle>
        <CardDescription>
          Nós selecionamos algumas regiões de entrega especiais. Confira abaixo:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Badge className="bg-green">+$</Badge>{" "}
              <strong> Áreas com incentivo</strong>
            </AccordionTrigger>
            <AccordionContent>
              Áreas marcadas com este símbolo garantem ganhos extras.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <Badge variant="default">
                <Truck height={15} width={15} />
              </Badge>
              <strong>Áreas prioritárias</strong>
            </AccordionTrigger>
            <AccordionContent>
              Áreas marcadas com este simbolo são áreas prioritárias que
              garantem mais rotas e prioridade no carregamento.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Image src={motorista} alt="Motorista" />
      </CardContent>

      <CardFooter className="flex justify-end gap-16">
        <Link href={"/"}>
          <Button variant={"outliner"}>
            <ArrowLeft />
          </Button>
        </Link>
        {searchParams.callback ? (
          <Link href={searchParams.callback}>
            <Button>Selecionar áreas</Button>
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
}
