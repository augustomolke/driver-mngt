import React from 'react';
import getMap from "@/lib/getMap"
import { getCurrentMode } from "@/lib/getCurrentMode";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StaticMapProps {
  title: string;
}

export default async function StaticMap({ title }: StaticMapProps) {
  const { choosed_station } = await getCurrentMode()

  const mapInfo = await getMap(choosed_station);
  const stationName = choosed_station.split('_').pop();

  if (!mapInfo.map) return null;

  return (
    <div className="space-y-4 border-2 rounded-lg">
      <div className="bg-primary text-white flex justify-center text-xl py-2 rounded-t-lg">
        {title} {stationName}
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
          <span className="absolute bottom-2 right-2 text-xs italic bg-white bg-opacity-75 px-2 py-1 rounded text-[#384b70]">
            *Região de atuação aproximada
          </span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <MapPin className="text-primary" />
          <p className="text-base text-[#384b70]">
            <strong>{mapInfo.address}</strong>
          </p>
        </div>
      </Link>
    </div>
  );
}
