import Image from "next/image";
import GooglePlay from "@/public/google-play.png";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import Link from "next/link";
import SpxExpress from "@/public/spx_express_logo.svg";
import Trackage from "@/public/trackage.png";
import { CardDescription } from "./ui/card";

export default function OwnFleetApps() {
  return (
    <div className="flex flex-col gap-4">
      <Alert variant={"secondary"} className="p-2">
        <AlertTitle>
          <div>
            <Link
              href="https://shopee.com.br/m/entregadores-shopee"
              target="_blank"
              className="flex gap-2 items-center"
            >
              <Image
                src={SpxExpress}
                alt="Google Play"
                width={36}
                height={36}
              />
              <span className="font-bold">Driver App</span>
            </Link>
          </div>
        </AlertTitle>
        <AlertDescription>
          <CardDescription>
            Aplicativo oficial para Motoristas Parceiros Shopee.
          </CardDescription>
        </AlertDescription>
      </Alert>

      <Alert variant={"secondary"} className="p-2">
        <AlertTitle>
          <Link
            href="https://play.google.com/store/apps/details?id=nexmove.nexcode"
            target="_blank"
            className="flex gap-2 items-center"
          >
            <Image src={GooglePlay} alt="Google Play" width={36} height={36} />
            <span className="font-bold">NexMove </span>
          </Link>
        </AlertTitle>
        <AlertDescription className="gap-4 flex flex-col items-center">
          <Link
            target="_blank"
            href={
              "https://docs.google.com/presentation/d/e/2PACX-1vRCjoOawkPw97Ktq4RP9BskRX8TIXC9Cs84WWmiLxxYfXVLdsneoi0G31ux-rlPoPojuhO4A3nN6KRw/pub?start=true&loop=false&delayms=3000"
            }
          >
            <CardDescription>
              Para acessar o galpão (apresentar QR Code na portaria) Clique aqui
              para instruções de configuração.
            </CardDescription>
          </Link>
        </AlertDescription>
      </Alert>

      <Alert variant={"secondary"} className="p-2">
        <AlertTitle>
          <Link
            href="https://drive.google.com/file/d/1yQxHP4laIz6A8Q5xmZ6qHRhXHUgFHp8v/view"
            target="_blank"
            className="flex gap-2 items-center"
          >
            <Image src={Trackage} alt="Google Play" width={36} height={36} />
            <span className="font-bold">Motorista Trackage</span>
          </Link>
        </AlertTitle>

        <AlertDescription className="flex items-center justify-center">
          <CardDescription>
            Para controle de filas de carregamento, devolução e descarregamento.
            Clique aqui para instruções de configuração.
          </CardDescription>
        </AlertDescription>
      </Alert>
    </div>
  );
}
