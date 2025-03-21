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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const title = "Ops, algum erro aconteceu.";

  const message = "Tente novamente";

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
