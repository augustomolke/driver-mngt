import Image from "next/image";
import { auth } from "@/auth";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SignoutButton from "@/components/signout-button";
import IncentiveAlert from "@/components/incentive-alert";
import getMap from "@/lib/getMap";
import { MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DriverPanel() {
  const session = await auth();
  const station = session?.user.station;
  const driverFirstName = session?.user.driverName.split(" ")[0];

  const preLoadedLocations = await fetchQuery(api.locations.get, { station });
  const mapInfo = await getMap(station);

  const hasIncentives = preLoadedLocations.some(
    (location) => location.incentive !== ""
  );

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Olá, {driverFirstName}!</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {hasIncentives && (
          <IncentiveAlert callback="/driver-panel/preferencias" />
        )}

        <div className="space-y-4">
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
                Endereço de coleta: <strong>{mapInfo.address}</strong>
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
