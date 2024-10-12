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

export default async function Scheduling({ dates, preloadedBookings }) {
  const [bookings, setBookings] = React.useState(preloadedBookings || []);
  const createBooking = useMutation(api.bookings.createBooking);
  const { data: session } = useSession();

  const form = useForm({ initialValues: { "event1.AM": false } });

  // const { toast } = useToast();

  const onSubmit = async (values) => {
    const booking = Object.entries(values)
      .map(([event_name, bookings]) => {
        const event = dates.filter((d) => d.name == event_name)[0];
        if (Object.entries(bookings).findIndex((book) => !!book[1]) < 0) {
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
          };
        }
      })
      .filter((v) => !!v);

    const results = await createBooking({ booking });
    console.log(results);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="disponibilidade"
        className="flex justify-center flex-col items-start gap-2"
      >
        {dates.map((date) => (
          <div key={date.value}>
            <FormLabel>{date.formatted}</FormLabel>

            <div className="flex gap-4">
              {["AM", "PM"].map((shift) => (
                <FormField
                  key={shift}
                  control={form.control}
                  name={`${date.name}.${shift}`}
                  defaultValue={
                    dates
                      .filter((d) => d.name == date.name)[0]
                      .checked.filter((c) => c == shift).length > 0
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DateCheckbox
                          text={shift}
                          id={`${date.id}-${shift}`}
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
        ))}
        <div class="mt-12 w-full flex justify-end">
          <Button type="submit">Confirmar</Button>
        </div>
      </form>
    </Form>
  );
}
