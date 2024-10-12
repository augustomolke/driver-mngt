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

export default async function Scheduling({ dates, preloadedBookings }) {
  const [bookings, setBookings] = React.useState(preloadedBookings || []);

  const form = useForm();

  const { toast } = useToast();

  const onSubmit = (values) => {
    console.log("SUBMITOOOOU", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="disponibilidade"
        className="flex justify-center flex-col items-start gap-2"
      >
        {dates.map((date) => (
          <div>
            <FormLabel>{date.formatted}</FormLabel>

            <div className="flex gap-4">
              {["AM", "PM"].map((shift) => (
                <FormField
                  control={form.control}
                  name={`${date.name}.${shift}`}
                  defaultValue={true}
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
