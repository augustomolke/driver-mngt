"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bounce } from "react-awesome-reveal";
import { TriangleAlert, CircleCheckBig } from "lucide-react";

export default function TodoAlert({ amount }: { amount: number }) {
  return (
    <Bounce duration={1500}>
      {amount > 0 ? (
        <Alert className="bg-green flex justify-center items-center mb-8 w-full">
          <Bounce effect="tada" delay={1500}>
            <TriangleAlert className="h-8 w-8 mr-1" />
          </Bounce>
          <div>
            <AlertTitle>
              <strong>
                Você possui{" "}
                {`${amount > 1 ? amount + " pendências" : "uma pendência"}`}!
              </strong>
            </AlertTitle>
            <AlertDescription>
              Revise os itens abaixo para continuar.
            </AlertDescription>
          </div>
        </Alert>
      ) : (
        <Alert className="bg-green flex justify-center items-center mb-8 w-full">
          <Bounce delay={1500}>
            <CircleCheckBig className="h-8 w-8 mr-1" />
          </Bounce>
          <div>
            <AlertTitle>
              <strong>Você não possui pendências para revisar.</strong>
            </AlertTitle>
          </div>
        </Alert>
      )}
    </Bounce>
  );
}
