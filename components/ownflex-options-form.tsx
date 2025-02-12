"use client";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { CircleX, CircleCheckBig } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "./ui/separator";
import { saveOptions } from "@/lib/db/options";

const items = [
  {
    id: "seg",
    label: "Segunda-feira",
  },
  {
    id: "ter",
    label: "Terça-feira",
  },
  {
    id: "qua",
    label: "Quarta-feira",
  },
  {
    id: "qui",
    label: "Quinta-feira",
  },
  {
    id: "sex",
    label: "Sexta-feira",
  },
  {
    id: "sab",
    label: "Sábado",
  },
] as const;

const shifts = [
  {
    id: "janela1",
    label: "Janela 1: 6h as 10h",
  },
  {
    id: "janela2",
    label: "Janela 2: 15:30h as 18h",
  },
  // {
  //   id: "janela3",
  //   label: "Janela 3: 16PM",
  // },
] as const;

export function OptionsForm({
  defaultValues = { days: [], shifts: [] },
  setOptions,
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues,
  });

  async function onSubmit(data) {
    setLoading(true);

    try {
      await saveOptions(JSON.stringify(data));
      toast({
        icon: (
          <CircleCheckBig color="hsl(var(--green))" height={48} width={48} />
        ),
        title: "Pronto!",
        description: "Sua preferência foi salva!",
      });

      setLoading(false);
    } catch (err) {
      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Algo deu errado!",
        description: "Tente novamente",
      });
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <div className="flex flex-col gap-8">
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-xl">Dias da semana</FormLabel>

                  <FormDescription>
                    Selecione os dias que você gostaria de realizar entregas
                  </FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="days"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, item.id]);
                                  setOptions((state) => ({
                                    ...state,
                                    days: [...field?.value, item.id],
                                  }));
                                } else {
                                  setOptions((state) => ({
                                    ...state,
                                    days: field.value?.filter(
                                      (value) => value !== item.id
                                    ),
                                  }));
                                  field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
              <Separator />

              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-xl">
                    Janelas de Carregamento
                  </FormLabel>

                  <FormDescription>
                    Selecione os horários que você gostaria de realizar entregas
                  </FormDescription>
                </div>

                {shifts.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="shifts"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, item.id]);
                                  setOptions((state) => ({
                                    ...state,
                                    shifts: [...field.value, item.id],
                                  }));
                                } else {
                                  setOptions((state) => ({
                                    ...state,
                                    shifts: field.value?.filter(
                                      (value) => value !== item.id
                                    ),
                                  }));
                                  field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        {/* <Button type="submit" disabled={loading}>
          {loading ? (
            <ReloadIcon className="mx-4 h-4 w-4 animate-spin" />
          ) : (
            "Salvar"
          )}
        </Button> */}
      </form>
    </Form>
  );
}
