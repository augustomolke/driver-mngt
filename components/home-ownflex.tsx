import OnboardingOwnFlex from "@/components/onboarding-ownflex";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignoutButton from "@/components/signout-button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SquarePen, Handshake } from "lucide-react";
import OwnFleetApps from "./ownflex-apps";
import { Button } from "./ui/button";
import StaticMap from "./static-map";
import { MapPin, Calendar, Smartphone } from "lucide-react";
import { Suspense } from "react";
import { Spinner } from "./spinner";
import AllocationsCard from "./allocations-card";
import HubSelection from "@/components/hub-select";
import { AlertTitle, Alert, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { getCurrentMode } from "@/lib/getCurrentMode";
import { auth } from "@/auth";


export default async function HomeOwnFlex({
  driverFirstName,
  pendencias,
  largePackagesCard,
  options,
  allocations,
  crowdSelection,
}) {
  const { choosed_station, mode } = await getCurrentMode();
  const session = await auth();





  const station = session?.user.station;
  // const mapInfo = await getMap(station);
  return (
    <Card className="max-w-3xl mx-auto  md:w-96">
      <CardHeader>
      <ApresentationDriver/>
        <CardTitle className="text-2xl">Olá, {driverFirstName}!</CardTitle>
        <CardDescription>
          Que bom ter você por aqui! <br />
          Esse é um espaço exclusivo para gerenciar suas regiões de preferência
          de entrega e sua disponibilidade diária no HUB Entrega Rápida - Lapa.
        </CardDescription>

        <Alert variant={"secondary"} className="space-y-2">
          <AlertTitle className="font-bold flex gap-2 items-center">
            <TriangleAlert className="animate-pulse" />
            Atenção!
          </AlertTitle>

          <AlertDescription>
            Para alterar sua modalidade, selecione o hub desejado:
          </AlertDescription>

          <HubSelection
            defaultValue={mode == "OF" ? choosed_station : "LM"}
            currentOptions={options}
            options={[
              { key: "LM", label: station.split("_")[2] },
              { key: "OF Hub_SP_Lapa", label: "Entrega Rápida - Lapa" },
            ]}
          />
        </Alert>
      </CardHeader>

      <CardContent className="space-y-6">
        <OnboardingOwnFlex
          allocations={allocations}
          pendencias={pendencias}
          largePackagesCard={largePackagesCard}
          options={options}
        />

        

        <CardTitle className="text-2xl">+ Informações Úteis</CardTitle>

        <Accordion defaultValue="address" type="single" collapsible>
          <AccordionItem value="address">
            <AccordionTrigger className="text-md">
              <span className="flex justify-start items-center gap-4">
                <MapPin size={24} />
                Endereço Entrega Rápida
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <Suspense fallback={<Spinner />}>
                <StaticMap title={"Entrega Rápida Lapa"} />
              </Suspense>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datetime">
            <AccordionTrigger className="text-md">
              <span className="flex justify-start items-center gap-4">
                <Calendar size={24} />
                Dias e horário
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <CardDescription className="flex flex-col gap-4">
                <div>
                  Segunda a sábado (domingos são informados previamente)
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold">Janela 1: 6 às 10h </div>
                  <div className="font-bold">Janela 2: 15:30 às 18h</div>
                </div>
              </CardDescription>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="apps">
            <AccordionTrigger className="text-md">
              <span className="flex justify-start items-center gap-4">
                <Smartphone size={24} />
                Aplicativos necessários
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <OwnFleetApps />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <CardTitle className="text-2xl">+ Ajuda</CardTitle>

        <div className="flex flex-col gap-4">
          <CardDescription className="text-primary">
            Acesse o menu inicial do Driver App e clique em{" "}
            <strong>Treinamentos</strong> ou
            <strong> Central de Ajuda</strong> para tirar suas dúvidas!
          </CardDescription>

          <Alert
            variant={"secondary"}
            className="border-none text-muted-foreground"
          >
            <strong>Treinamentos:</strong> guias rápidos e vídeos curtos com as
            principais dicas para você.
          </Alert>
          <Alert
            variant={"secondary"}
            className="border-none text-muted-foreground"
          >
            <strong>Central de Ajuda:</strong> tire suas dúvidas de pagamento,
            nota fiscal, acareação e muito mais.
          </Alert>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="https://forms.gle/o1CmdEY5qNUn5hFJ7" target="_blank">
            <Button>
              <div className="flex items-center gap-2 font-bold">
                <SquarePen />
                Alterar dados cadastrais
              </div>
            </Button>
          </Link>

          <CardTitle className="text-2xl">+ Indicação</CardTitle>

          <CardDescription className="text-primary">
            Que tal ganhar até <strong>R$200</strong> por indicar novos
            Motoristas Parceiros? <br />E tem mais:{" "}
            <strong>seu indicado também ganha R$100</strong> após concluir suas
            primeiras 5 rotas.
          </CardDescription>

          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSdbprI-ygYpZv4k2uEkJnV7yHMb3-nTeTLswgEK7ouRUqRdCQ/formResponse"
            target="_blank"
          >
            <Button>
              <div className="flex items-center gap-2 font-bold">
                <Handshake />
                Indicar um amigo
              </div>
            </Button>
          </Link>
          {/* <Link
            href={`https://wa.me/551128386686?text=Ol%C3%A1%2C%20preciso%20de%20ajuda.%20Sou%20entregador%20OwnFlex%20e%20meu%20id%20%C3%A9%3A%20${session?.user.driverId}`}
            target="_blank"
          >
            <Button variant="whatsapp">
              <div className="flex items-center space-x-2">
                <Image src={Whatsapp} alt="Whatsapp" height={36} width={36} />
                Precisa de Ajuda?
              </div>
            </Button>
          </Link> */}
        </div>

        <div className="flex justify-end">
          <SignoutButton />
        </div>
      </CardContent>
    </Card>
  );
}
