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
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const generateMessage = (code) => {
  if (code == "WrongId") {
    return {
      title: "Seu Driver Id não foi encontrado",
      message:
        "Verifique se existe alguma pendência no seu cadastro através dos nossos canais de suporte oficial.",
      action: (
        <div className="flex flex-col justify-center items-center w-full">
          <Link href="/login">
            <Button> Tentar Novamente</Button>
          </Link>
          <Link href="/integracao">
            <Button variant="outliner" className="flex flex-col p-8">
              <span>Verificar requisitos </span>
              <span>para ser motorista Shopee</span>
            </Button>
          </Link>
        </div>
      ),
    };
  }
  if (code == "FilledCluster") {
    return {
      title: "Esta região já foi preenchida",
      message: "Por favor, volte e escolha outra região.",
      action: (
        <div className="flex flex-col justify-center items-center w-full">
          <Link href="/driver-panel/crowdsourcing">
            <Button> Tentar Novamente</Button>
          </Link>
        </div>
      ),
    };
  }

  if (code == "WrongPhone") {
    return {
      title: "O telefone informado está incorreto",
      message:
        "Por favor, informe os 4 últimos dígitos do seu toelefone cadastrado no App Drivers.",
      action: (
        <Link href="/login">
          <Button>Tentar Novamente</Button>
        </Link>
      ),
    };
  }

  if (code == "NoLocations") {
    return {
      title: "Seu hub ainda não está em operação",
      action: <SignOutButton text={"Sair"} size="xl" />,
      message:
        "Por favor, aguarde até a operação de entregas iniciar no seu hub. Para saber mais entre em contato com o suporte pelos nossos canais oficiais.",
    };
  }

  return {
    title: "Ops, algum erro aconteceu.",
    action: <SignOutButton text={"Sair"} size="default" />,
  };
};

export default function Error({}: {}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("message");

  const { title, message, action } = generateMessage(code);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="max-w-80">
        <CardTitle className="text-2xl flex justify-center items-center gap-2 ">
          <CircleX height={48} width={48} />

          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">{message}</CardContent>
      <CardFooter className="flex justify-end">{action}</CardFooter>
    </Card>
  );
}
