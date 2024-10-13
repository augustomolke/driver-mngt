"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Bounce } from "react-awesome-reveal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { DollarSign } from "lucide-react";

export default () => (
  <Bounce duration={2500}>
    <Link href="/driver-panel/preferencias">
      <Alert className="bg-green flex justify-center items-center mb-8 w-full">
        <Bounce delay={2500}>
          <DollarSign className="h-8 w-8 mr-1" />
        </Bounce>
        <div>
          <AlertTitle>
            <strong>Quer ganhar mais?</strong>
          </AlertTitle>
          <AlertDescription>
            Revise suas preferências de entrega para ganhos extras!
          </AlertDescription>
        </div>
      </Alert>
    </Link>
  </Bounce>
);
