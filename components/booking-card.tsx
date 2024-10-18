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
import { Siren } from "lucide-react";

export const NoSpotsCard = () => {
  return (
    <div>
      <main className="flex flex-col items-center sm:items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-4 items-center">
              Alerta desvio de rota!
              <TrafficCone height={64} width={64} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="my-4">
              <strong>Para as regiões que você selecionou</strong>, não há mais
              vagas neste momento.{" "}
            </CardDescription>
            <ReviewPreferencesAlert />
            <Separator className="my-4" />

            <div className="flex items-center justify-center gap-8">
              <Siren height={48} width={48} />
              <strong className="max-w-48">
                Caso prefira esperar, fique de olho! A qualquer momento
                entraremos em contato.
              </strong>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
