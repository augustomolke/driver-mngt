import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewPreferencesAlert } from "./review-preferences-alert";
import { Separator } from "./ui/separator";
import { Siren, TrafficCone } from "lucide-react";
import SignOutButton from "./signout-button";

export const NoSpotsCard = () => {
  return (
    <div>
      <main className="flex flex-col items-center sm:items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-4 items-center">
              Agora é com a gente!
              <TrafficCone height={64} width={64} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="my-4">
              <strong>
                Obrigado por confirmar seu interesse em ser um Motorista
                Parceiro Shopee
              </strong>
              . Entraremos em contato para informar os próximos passos. Por
              favor, mantenha seus dados de contato atualizados no App Driver.{" "}
            </CardDescription>
            <ReviewPreferencesAlert />
            <Separator className="my-4" />

            {/* <div className="flex items-center justify-center gap-8">
              <Siren height={48} width={48} />
              <strong className="max-w-48">
                Caso prefira esperar, fique de olho! A qualquer momento
                abriremos mais vagas.
              </strong>
            </div> */}

            <div className="flex justify-end">
              <SignOutButton text="Sair" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
