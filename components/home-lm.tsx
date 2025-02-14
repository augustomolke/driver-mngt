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
import { auth } from "@/auth";
import StaticMap from "./static-map";

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
        <StaticMap
          title={formatHub(
            session?.user.choosed_station || session?.user.station
          )}
          map={mapInfo.map}
          url={`http://maps.google.com/?q=${mapInfo.latitude},${mapInfo.longitude}`}
          address={mapInfo.address}
        />

        <div className="flex justify-end">
          <SignoutButton />
        </div>
      </CardContent>
    </Card>
  );
}
