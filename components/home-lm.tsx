import OnboardingOwnFlex from "@/components/onboarding-ownflex";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignoutButton from "@/components/signout-button";
import getMap from "@/lib/getMap";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { MapPin } from "lucide-react";

const formatHub = (hub) => {
  if (!hub) return;

  return hub.split("_")[2];
};

export default async function HomeLm({ driverFirstName }) {
  const session = await auth();
  const station = session?.user.station;
  const mapInfo = await getMap(station);
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
        <div className="space-y-4 border-2 rounded-lg">
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
        </div>

        <div className="flex justify-end">
          <SignoutButton />
        </div>
      </CardContent>
    </Card>
  );
}
