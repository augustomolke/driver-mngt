import Image from "next/image";
import { SignIn } from "@/components/ui/sign-in";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const secret = process.env.SECRET;

const api_url = process.env.GSHEET_AUTH_API_URL;

export default async function Home() {
  const session = await auth();

  const body = JSON.stringify({
    method: "GETMAP",
    key: secret,
    sheet: "hubs",
    filter: { "Station Name": session?.user.station },
  });

  const result = await fetch(api_url, {
    method: "POST",
    body,
  });

  const mapInfo = await result.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bem vindo</CardTitle>
        <CardDescription>description</CardDescription>
      </CardHeader>

      <CardContent>
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
      </CardContent>
    </Card>
  );
}
