import OnboardingOwnFlex from "@/components/onboarding-ownflex";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignoutButton from "@/components/signout-button";
import { auth } from "@/auth";
import StaticMap from "./static-map";
import { getCurrentMode } from "@/lib/getCurrentMode";
import { Suspense } from "react";
import { Spinner } from "./spinner";

const formatHub = (hub) => {
  if (!hub) return;

  return hub.split("_")[2];
};

export default async function HomeLm({ driverFirstName }) {
  const { choosed_station } = await getCurrentMode();

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
        <Suspense fallback={<Spinner />}>
          <StaticMap title={formatHub(choosed_station)} />
        </Suspense>
        <div className="flex justify-end">
          <SignoutButton />
        </div>
      </CardContent>
    </Card>
  );
}
