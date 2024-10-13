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
import { useSession } from "next-auth/react";
import { usePreloadedQuery } from "convex/react";
import { compareArrays } from "@/lib/utils";

export default async function Scheduling({ dates, preloadedBookings }) {
  const createBooking = useMutation(api.bookings.createBooking);
  const deleteBooking = useMutation(api.bookings.deleteBooking);
  const prevBookings = usePreloadedQuery(preloadedBookings);
  const { data: session } = useSession();

  const form = useForm();

  const { toast } = useToast();

  const onSubmit = async (values) => {
    const booking = Object.entries(values)
      .map(([event_name, bookings]) => {
        const event = dates.filter((d) => d.name == event_name)[0];
        const prev = prevBookings
          .filter((prev) => prev.instance == event.instance)
          .find(Boolean);

        if (
          compareArrays(
            prev?.info.shifts,
            Object.entries(bookings)
              .filter((book) => !!book[1])
              .map((book) => book[0])
          )
        ) {
          //nothing to do
          return null;
        }

        if (Object.entries(bookings).findIndex((book) => !!book[1]) < 0) {
          //deletar
          return null;
        } else {
          return {
            driver_id: session.user.driverId.toString(),
            event_id: event.id,
            instance: event.instance,
            info: {
              shifts: Object.entries(bookings)
                .filter((book) => !!book[1])
                .map((book) => book[0]),
            },
            ...(!!prev && { booking_id: prev._id }),
          };
        }
      })
      .filter((v) => !!v);

    const bookingToDelete = Object.entries(values)
      .map(([event_name, bookings]) => {
        const event = dates.filter((d) => d.name == event_name)[0];
        const prev = prevBookings
          .filter((prev) => prev.instance == event.instance)
          .find(Boolean);
        if (Object.entries(bookings).findIndex((book) => !!book[1]) < 0) {
          //deletar
          return prev._id;
        }
      })
      .filter((v) => !!v);

    try {
      const promises = [];

      if (booking.length > 0) {
        promises.push(createBooking({ booking }));
      }

      if (bookingToDelete.length > 0) {
        promises.push(deleteBooking({ ids: bookingToDelete }));
      }

      await Promise.all(promises);

      toast({
        title: "Pronto!",
        description: "Você confirmou sua disponibilidade!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
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
        className="flex justify-center flex-col items-start gap-2"
      >
        {dates.map((date) => {
          return (
            <div key={date.value}>
              <FormLabel>{date.formatted}</FormLabel>

              <div className="flex gap-4">
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
            </div>
          );
        })}
        <div class="mt-12 w-full flex justify-end">
          <Button type="submit">Confirmar</Button>
        </div>
      </form>
    </Form>
  );
}
