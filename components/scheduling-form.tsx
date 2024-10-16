"use client";
import * as React from "react";
import DateCheckbox from "./date-checkbox";
import { fetchDates } from "@/lib/getEvents";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Controller,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { usePreloadedQuery } from "convex/react";
import { compareArrays } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { confirmAvailability } from "@/lib/booking-action";
import { CircleCheckBig, CircleX } from "lucide-react";

export default async function Scheduling({ dates, preloadedBookings }) {
  const createBooking = useMutation(api.bookings.createBooking);
  const deleteBooking = useMutation(api.bookings.deleteBooking);
  const prevBookings = usePreloadedQuery(preloadedBookings);
  const form = useForm();

  const { toast } = useToast();

  const onSubmit = async (values) => {
    try {
      await confirmAvailability(values, prevBookings, dates);

      toast({
        icon: (
          <CircleCheckBig color="hsl(var(--green))" height={48} width={48} />
        ),
        title: "Pronto!",
        description: "Você confirmou sua disponibilidade!",
      });
    } catch (err) {
      console.log(err);
      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Ops!",
        description: "Algo deu errado.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="disponibilidade"
        className="flex justify-center flex-col items-start gap-4"
      >
        {dates.map((date, idx) => {
          return (
            <div key={date.value} className="w-full">
              <FormLabel className="text-xl">{date.formatted}</FormLabel>

              <div className="flex justify-evenly gap-4 w-full">
                {["AM", "PM"].map((shift) => (
                  <FormField
                    key={shift}
                    control={form.control}
                    name={`${date.name}.${shift}`}
                    defaultValue={
                      prevBookings
                        .filter((prev) => prev.instance == date.instance)
                        .find(Boolean)
                        ?.info?.shifts.filter((s) => s == shift).length > 0
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <DateCheckbox
                            text={shift}
                            id={`${date.name}.${shift}`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        {/* <div className="space-y-1 leading-none">
                  <FormLabel>Featured</FormLabel>
                  <FormDescription>
                    This product will appear on the home page
                  </FormDescription>
                </div> */}
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {idx < dates.length - 1 ? <Separator className="my-4" /> : null}
            </div>
          );
        })}
      </form>
    </Form>
  );
}
