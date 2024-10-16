"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bounce } from "react-awesome-reveal";
import { Truck } from "lucide-react";
import Link from "next/link";

export const ReviewPreferencesAlert = () => {
  return (
    <Link href={"/primeira-entrega/preferencias"}>
      <Bounce effect="tada" duration={1500}>
        <Alert className="flex justify-center items-center mb-8 w-full">
          <Bounce effect="tada" delay={1500}>
            <Truck className="h-8 w-8 mr-1" />
          </Bounce>
          <div>
            <AlertTitle>
              <strong>Quer começar logo?</strong>
            </AlertTitle>
            <AlertDescription>
              Toque aqui e revise suas áreas de preferência e selecione alguma
              área prioritária.
            </AlertDescription>
          </div>
        </Alert>
      </Bounce>
    </Link>
  );
};
