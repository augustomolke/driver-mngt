"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Bounce } from "react-awesome-reveal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { DollarSign } from "lucide-react";

export default () => (
  <Bounce>
    <Link href="/driver-panel/preferencias">
      <Alert className="bg-green flex justify-center items-center mb-8">
        <div>
          <DollarSign className="h-8 w-8 animate-ping mr-1" />
        </div>
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
