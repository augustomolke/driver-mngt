import OnboardingOwnFlex from "@/components/onboarding-ownflex";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignoutButton from "@/components/signout-button";
import IncentiveAlert from "@/components/incentive-alert";
import getMap from "@/lib/getMap";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { MapPin, SquarePen } from "lucide-react";
import OwnFleetApps from "./ownflex-apps";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Whatsapp from "@/public/whatsapp.png";

// const formatHub = (hub) => {
//   if (!hub) return;

//   return hub.split("_")[2];
// };

export default async function HomeOwnFlex({ driverFirstName }) {
  const session = await auth();
  // const station = session?.user.station;
  // const mapInfo = await getMap(station);
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Olá, {driverFirstName}!</CardTitle>
        <CardDescription>
          Que bom ter você aqui! <br />
          Aqui é onde você encontrará informações sobre a sua jornada como
          motorista parceiro Shopee. <br />
          Além disso, você poderá{" "}
          <strong>selecionar suas preferências de entrega </strong>e confirmar
          sua <strong>disponibilidade diariamente</strong>. <br />
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <OnboardingOwnFlex />

        {/* <div className="space-y-4 border-2 rounded-lg">
          <div className="bg-primary text-white flex justify-center text-2xl py-2 rounded-t-lg">
            <strong>Hub</strong>&nbsp;
            {formatHub(session?.user.choosed_station || session?.user.station)}
          </div>
          <Link
            href={`http://maps.google.com/?q=${mapInfo.latitude},${mapInfo.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <div className="relative">
              <Image
                src={mapInfo.map}
                alt="Mapa da região de atuação"
                width={600}
                height={400}
                className="rounded-lg border-2 border-[--background]"
              />
              <span className="absolute bottom-2 right-2 text-xs italic bg-white bg-opacity-75 px-2 py-1 rounded">
                *Região de atuação aproximada
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="text-primary" />
              <p className="text-base">
                Endereço: <strong>{mapInfo.address}</strong>
              </p>
            </div>
          </Link>
        </div> */}
        <CardTitle className="text-2xl">+ Informações</CardTitle>

        <CardDescription>
          Verifique abaixo os aplicativos mencionados no treinamento.
        </CardDescription>
        <OwnFleetApps />

        <CardTitle className="text-2xl">Ajuda </CardTitle>

        <div className="flex flex-col gap-4">
          <Link href="https://forms.gle/o1CmdEY5qNUn5hFJ7" target="_blank">
            <Button>
              <div className="flex items-center gap-2 font-bold">
                <SquarePen />
                Alterar dados cadastrais
              </div>
            </Button>
          </Link>

          <Link
            href={`https://wa.me/551128386686?text=Ol%C3%A1%2C%20preciso%20de%20ajuda.%20Sou%20entregador%20OwnFlex%20e%20meu%20id%20%C3%A9%3A%20" +
              ${session?.user.driver_id}`}
            target="_blank"
          >
            <Button variant="whatsapp">
              <div className="flex items-center space-x-2">
                <Image src={Whatsapp} alt="Whatsapp" height={36} width={36} />
                Precisa de Ajuda?
              </div>
            </Button>
          </Link>
        </div>

        <div className="flex justify-end">
          <SignoutButton />
        </div>
      </CardContent>
    </Card>
  );
}
