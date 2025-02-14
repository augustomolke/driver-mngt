import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function StaticMap({ title, map, url, address }) {
  return (
    <div className="space-y-4 border-2 rounded-lg">
      <div className="bg-primary text-white flex justify-center text-xl py-2 rounded-t-lg">
        {title}
      </div>

      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <div className="relative">
          <Image
            src={map}
            alt="Mapa da região de atuação"
            width={600}
            height={400}
            className="rounded-lg border-2 border-[--background]"
          />
          <span className="absolute bottom-2 right-2 text-xs italic bg-white bg-opacity-75 px-2 py-1 rounded">
            *Região de atuação aproximada
          </span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <MapPin className="text-primary" />
          <p className="text-base">
            <strong>{address}</strong>
          </p>
        </div>
      </Link>
    </div>
  );
}
