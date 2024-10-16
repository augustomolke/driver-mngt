"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Bounce, AttentionSeeker } from "react-awesome-reveal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Truck } from "lucide-react";

export default ({ callback }) => (
  <Bounce duration={1500}>
    <Link href={`/incentivos?callback=${callback}`}>
      <Alert className="bg-green flex justify-center items-center mb-8 w-full">
        <Bounce effect="tada" delay={1500}>
          <Truck className="h-8 w-8 mr-1" />
        </Bounce>
        <div>
          <AlertTitle>
            <strong>Quer prioridade no início da sua jornada?</strong>
          </AlertTitle>
          <AlertDescription>
            Algumas áreas de entrega garantem prioridade no agendamento. Toque
            aqui e saiba mais!
          </AlertDescription>
        </div>
      </Alert>
    </Link>
  </Bounce>
);
