

import { useState, useEffect } from 'react';
import { auth } from "@/auth";
import { getPreferences } from "@/lib/db/preferences";
import { getAvailability } from "@/lib/db/bookings";
import { getAllocations } from "@/lib/db/allocations";
import { getCurrentMode } from "@/lib/getCurrentMode";
import ApresentationDriver from "../components/apresentationDriver";
import DriverPendingAlert from "../components/driverPendingAlert";
import StaticMaps from "../components/staticMaps";
import DeliveryWindow from "../components/deliveryWindow";
import RequiredApplications from "../components/requiredApplications";
import SpxExpress from "@/public/spx_express_logo.svg";
import GooglePlay from "@/public/google-play.png";
import Trackage from "@/public/trackage.png";
import InfoHelp from "../components/infoHelp";
import SelectCep from "../components/selectCep";
import { TriangleAlert } from "lucide-react";
import CardPending from "../components/cardPending";
import SelectHub from "../components/selectHub";
import { SquarePen } from "lucide-react";
import HomeLm from "@/components/home-lm";
import { Badge } from "@/components/ui/badge";



export default async function DriverPanel() {
  const session = await auth();
  const driverFirstName = session?.user.driverName.split(" ")[0];

  const { choosed_station, mode, options } = await getCurrentMode();


  if (mode === "OF") {
    const [preferences, bookings, allocations] = await Promise.all([
      getPreferences(session?.user.driverId.toString(), choosed_station),
      getAvailability(session?.user.driverId.toString(), choosed_station),
      getAllocations(),
    ]);

    const pendencias = [];
    if (bookings.length == 0) {
      pendencias.push("Disponibilidade");
    }

    if (preferences.length < 5) {
      pendencias.push("Preferências");
    }

    if (allocations?.length > 0) {
      pendencias.push("Rotas");
    }
    const driverTexts = {
      title: "Olá, Driver",
      message: "Que bom ter você por aqui! Esse é um espaço exclusivo para gerenciar suas regiões de preferência de entrega e sua disponibilidade diária no HUB Entrega Rápida - Lapa."
    };
    const deliveryWindowTexts = {
      title: "Segunda a sábado (domingos são informados previamente)",
      Option1: "Janela 1: 6 às 10h",
      Option2: "Janela 2: 15:30 às 18h"
    };
    const cardPendingContent = {
      descriptionText: "Informe sua disponibilidade para os próximos 3 dias de carregamento. Você pode selecionar quantos dias e horários quiser.",
      buttonText: "Informar disponibilidade",
      buttonLink: "https://forms.gle/o1CmdEY5qNUn5hFJ7"
    };
    const textInfoHelp = {
      title: (
        <>
          Acesse o menu inicial do Driver App e clique em <span className="font-bold">Treinamentos</span> ou <span className="font-bold">Central de Ajuda</span> para tirar suas dúvidas!
        </>
      ),
      trainingText: (
        <>
          <span className="font-bold">Treinamentos:</span> guias rápidos e vídeos curtos com as principais dicas para você.
        </>
      ),
      helpCenterText: (
        <>
          <span className="font-bold">Central de Ajuda:</span> tire suas dúvidas de pagamento, nota fiscal, acareação e muito mais.
        </>
      ),
      buttonText: "Acessar Treinamentos",
      buttonLink: "https://forms.gle/o1CmdEY5qNUn5hFJ7"

    };
    const textSelectHub = {
      title: "Atenção!",
      description: "Para alterar sua modalidade, selecione o hub desejado:"
    };
    const hubOptions = [
      { value: "Entrega Rápida - Lapa", label: "Entrega Rápida - Lapa" },
      { value: "São Bernardo do Campo", label: "São Bernardo do Campo" },
    ];


    const cepOptions = [
      { value: "Entrega Rápida - Lapa", label: "Entrega Rápida - Lapa" },
      { value: "São Bernardo do Campo", label: "São Bernardo do Campo" },
    ];


   


    return (
      <div className="h-full relative">
        {/* <Badge
          id="ownflex-badge"
          className="absolute top-2 right-2 text-sm font-medium font-bold italic"
        >
          Flex
        </Badge>  */}

        {/* <HomeOwnFlex
          allocations={allocations}
          driverFirstName={driverFirstName}
          choosed_station={choosed_station}
          pendencias={pendencias}
          largePackagesCard={(session?.user.vehicle as string).includes(
            "FIORINO"
          )}
          options={options}
        /> */}



        <div className="bg-white w-full h-auto p-3 rounded-md flex gap-2 flex-col md:w-96" >
          <ApresentationDriver {...driverTexts} />
          <DriverPendingAlert pendencias={0} />
          <StaticMaps title={"Entrega"} />
          <DeliveryWindow  {...deliveryWindowTexts} />
          <RequiredApplications
            iconSrc={SpxExpress}
            iconName="Driver App"
            description="Aplicativo oficial para Motoristas Parceiros Shopee."
            link="https://shopee.com.br/m/entregadores-shopee"
          />
          <RequiredApplications
            iconSrc={GooglePlay}
            iconName="NexMove"
            description="Para acessar o galpão (apresentar QR Code na portaria) Clique aqui para instruções de configuração."
            link="https://play.google.com/store/apps/details?id=nexmove.nexcode"
          />
          <RequiredApplications
            iconSrc={Trackage}
            iconName="Motorista Trackage"
            description="Para controle de filas de carregamento, devolução e descarregamento. Clique aqui para instruções de configuração."
            link="https://docs.google.com/presentation/d/e/2PACX-1vRCjoOawkPw97Ktq4RP9BskRX8TIXC9Cs84WWmiLxxYfXVLdsneoi0G31ux-rlPoPojuhO4A3nN6KRw/pub?start=true&loop=false&delayms=3000"
          />
          <InfoHelp {...textInfoHelp} icon={SquarePen} />;
          <CardPending {...cardPendingContent} />
          <SelectHub {...textSelectHub} icon={TriangleAlert} options={hubOptions} />
          <SelectCep options={cepOptions}  />
        </div>
        <div className="h-[64px]"></div>
      </div>
    );
  }

  // const station = session?.user.station;

  // // const locations = await getLocations(station);

  return (
    <>
      <HomeLm driverFirstName={driverFirstName} />
    </>
  );
}
