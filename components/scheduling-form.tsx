"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, usePreloadedQuery } from "convex/react";
import { CircleCheckBig, CircleX, Calendar, Sun, Moon } from "lucide-react";
import { api } from "../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { confirmAvailability } from "@/lib/booking-action";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import DateCheckbox from "./date-checkbox";
import { motion } from "framer-motion";

interface SchedulingProps {
  dates: Array<{
    value: string;
    formatted: string;
    name: string;
    instance: string;
  }>;
  preloadedBookings: any; // Replace 'any' with the actual type from your Convex setup
}

interface FormValues {
  [key: string]: {
    AM: boolean;
    PM: boolean;
  };
}

export default function Scheduling({ dates, preloadedBookings }: SchedulingProps) {
  const createBooking = useMutation(api.bookings.createBooking);
  const deleteBooking = useMutation(api.bookings.deleteBooking);
  const prevBookings = usePreloadedQuery(preloadedBookings);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    defaultValues: dates.reduce((acc, date) => {
      const prevBooking = prevBookings.find(prev => prev.instance === date.instance);
      acc[date.name] = {
        AM: prevBooking?.info?.shifts.includes("AM") || false,
        PM: prevBooking?.info?.shifts.includes("PM") || false,
      };
      return acc;
    }, {} as FormValues),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await confirmAvailability(values, prevBookings, dates);
      toast({
        icon: <CircleCheckBig color="hsl(var(--green))" height={48} width={48} />,
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
      <form onSubmit={form.handleSubmit(onSubmit)} id="disponibilidade" className="max-w-3xl mx-auto">
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
                  <Calendar className="mr-3 text-primary w-8 h-8" />
                  <FormLabel className="text-2xl font-semibold text-primary">{date.formatted}</FormLabel>
                </div>
                <div className="flex justify-center gap-8">
                  {["AM", "PM"].map((shift) => (
                    <Controller
                      key={shift}
                      name={`${date.name}.${shift}`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <DateCheckbox
                              text={shift}
                              id={`${date.name}.${shift}`}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="w-32 h-32 text-xl"
                              icon={shift === "AM" ? Sun : Moon}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
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
          >

          </motion.div>
        </motion.div>
      </form>
    </Form>
  );
}
