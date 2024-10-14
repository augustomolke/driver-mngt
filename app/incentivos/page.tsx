import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Page({ searchParams }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incentivos</CardTitle>
        <CardDescription>Explicar como funciona</CardDescription>
      </CardHeader>
      <CardContent></CardContent>

      <CardFooter className="flex justify-end gap-16">
        <Link href={"/"}>
          <Button variant={"outliner"}>
            <ArrowLeft />
          </Button>
        </Link>
        {searchParams.callback ? (
          <Link href={searchParams.callback}>
            <Button>Selecionar áreas</Button>
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
}
