"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { CircleCheckBig, CircleX, Calendar, Sun, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { confirmAvailability } from "@/lib/actions/booking-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import DateCheckbox from "./date-checkbox";
import { motion } from "framer-motion";
import { ReloadIcon } from "@radix-ui/react-icons";

interface SchedulingProps {
  dates: Array<{
    value: string;
    formatted: string;
    name: string;
    instance: string;
  }>;
  preloadedBookings: any;
  station: string;
}

interface FormValues {
  [key: string]: {
    AM: boolean;
    PM: boolean;
    SD: boolean;
  };
}

export default function Scheduling({
  dates,
  prevBookings,
  shiftsOptions,
  station,
}: SchedulingProps) {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    defaultValues: dates.reduce((acc, date) => {
      const prevBooking = prevBookings.find(
        (prev) =>
          new Date(prev.date).getDate() === new Date(date.value).getDate()
      );

      acc[date.value] = {
        AM: prevBooking?.info.includes("AM") || false,
        PM: prevBooking?.info.includes("PM") || false,
        SD: prevBooking?.info.includes("SD") || false,
      };
      return acc;
    }, {} as FormValues),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: FormValues) => {
    try {
      await confirmAvailability(values, prevBookings, dates, station);
      toast({
        icon: (
          <CircleCheckBig color="hsl(var(--green))" height={48} width={48} />
        ),
        title: "Pronto!",
        description: "Você confirmou sua disponibilidade!",
      });
    } catch (err) {
      console.error(err);
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
        className="max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {dates.map((date, idx) => (
            <motion.div
              key={date.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <Calendar className="mr-3 text-primary w-16 h-16" />
                  <FormLabel className="text-2xl font-semibold text-primary">
                    {date.formatted}
                  </FormLabel>
                </div>
                <div className="flex flex-col gap-2">
                  {shiftsOptions.map(({ id, description, exclude = [] }) => {
                    const dateObj = new Date(date.value);

                    if (exclude.includes(dateObj.getDay())) {
                      return null;
                    }
                    return (
                      <Controller
                        key={id}
                        name={`${date.value}.${id}`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <DateCheckbox
                                text={description}
                                id={`${date.name}.${id}`}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="min-w-16 h-16 text-xl"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
              </div>
              {idx < dates.length - 1 && <Separator className="my-8" />}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: dates.length * 0.1 }}
            className="flex justify-center mt-12"
          ></motion.div>
        </motion.div>
        <div className="flex justify-end">
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            ) : (
              "Confirmar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
