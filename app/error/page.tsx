"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignOutButton from "@/components/signout-button";
import { CircleX } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Error({}: {}) {
  const searchParams = useSearchParams();

  const code = searchParams.get("message");

  const title =
    code == "NoLocations"
      ? "Seu hub ainda não está em operação"
      : "Ops, algum erro aconteceu.";

  const message =
    code == "NoLocations"
      ? "Por favor, aguarde até a operação de entregas iniciar no seu hub. Para saber mais entre em contato com o suporte pelos nossos canais oficiais."
      : "Tente novamente";

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="max-w-80">
        <CardTitle className="text-2xl flex justify-center items-center gap-2 ">
          <CircleX height={48} width={48} />

          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">{message}</CardContent>
      <CardFooter className="flex justify-end">
        <SignOutButton text={"Sair"} size="default" />
      </CardFooter>
    </Card>
  );
}
