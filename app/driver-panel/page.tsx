import Image from "next/image";
import { SignIn } from "@/components/ui/sign-in";
import SignoutButton from "@/components/signout-button";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import IncentiveAlert from "@/components/incentive-alert";
import getMap from "@/lib/getMap";

export default async function Home() {
  const session = await auth();
  const station = session?.user.station;

  const preLoadedLocations = await fetchQuery(api.locations.get, {
    station,
  });

  const mapInfo = await getMap(station);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Olá, {session?.user.driverName.split(" ")[0]}!</CardTitle>
        {/* <CardDescription>description</CardDescription> */}
      </CardHeader>

      <CardContent>
        {preLoadedLocations.filter((location) => location.incentive != "")
          .length > 0 ? (
          <IncentiveAlert callback="/driver-panel/preferencias" />
        ) : null}

        <div className="flex flex-col justify-center items-center">
          <a
            href={`http://maps.google.com/?q=${mapInfo.latitude},${mapInfo.longitude}`}
            target="_blank"
          >
            <img
              src={mapInfo.map}
              alt="Mapa"
              className="border-[--background] border-2 rounded-lg"
            />
          </a>
          <div className="flex justify-end w-full">
            <span className="text-xs italic mr-8">
              *Região de atuação aproximada
            </span>
          </div>

          <p className="text-base mt-2">
            Endereço de coleta: <br />
            <strong>{mapInfo.address}</strong>
          </p>
        </div>
        <div className="w-full flex justify-end">
          <SignoutButton />
        </div>
      </CardContent>
    </Card>
  );
}
