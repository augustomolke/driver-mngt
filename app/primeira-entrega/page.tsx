import Image from "next/image";
import { SignIn } from "@/components/ui/sign-in";
import { auth } from "@/auth";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { getCurrentWeekDates } from "./utils";
import parser from "cron-parser";
import FirstTripForm from "@/components/first-trip-form";
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

export default async function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Treinamento prático</CardTitle>
      </CardHeader>
      <CardContent>Agendar</CardContent>
      <CardFooter>
        <Link href={"/primeira-entrega/preferencias"}>
          <Button>Selecionar a data</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
