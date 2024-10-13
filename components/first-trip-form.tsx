"use client";
import * as React from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TrashIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Preloaded } from "convex/react";
import { useSession } from "next-auth/react";
import { usePreloadedQuery } from "convex/react";
import { BadgeIcon } from "@radix-ui/react-icons";

export default function FirstTripForm({ dates }) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const form = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agende seu treinamento Prático</CardTitle>
        <CardDescription>Selecione uma data</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            id="first-trip"
          >
            <FormField
              control={form.control}
              name="booking-date"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Escolha uma data" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Datas disponíveis</SelectLabel>
                            {dates.map((date) => (
                              <SelectItem value={date}>{date}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" form="preferences" disabled={false}>
          {loading ? (
            <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
          ) : (
            "Confirmar agendamento"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
