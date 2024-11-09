"use client"; // Error boundaries must be Client Components

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
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error, error.message, error.cause, error.name, error.stack);
  }, []);
  const title =
    error.message == "No locations"
      ? "Seu hub não está em operação ainda."
      : "Ops, algum erro aconteceu.";

  const message =
    error.message == "No locations"
      ? "Por enquanto, não existem áreas de atendimento para o seu hub. Para saber mais, entre em contato com nosso suporte oficial."
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
