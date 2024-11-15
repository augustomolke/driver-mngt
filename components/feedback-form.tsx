"use client";
import React from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createFeedbackAction } from "@/lib/actions/feedback-actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Textarea } from "@/components/ui/textarea";

const reasons = [
  "Ninguém entrou em contato comigo",
  "Não me ofereceram uma rota adequada",
  "Eu não tinha os equipamentos de segurança necessários",
  "Tive problemas pessoais",
  "Tive problemas com a plataforma de agendamento",
  "Outro",
];

export default function FeedbackForm() {
  const form = useForm({
    defaultValues: {
      first_trip: "",
      reason: "",
      text: "",
      nps: "",
    },
  });

  const { control, handleSubmit, watch } = form;
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const first_trip = watch("first_trip");
  const reason = watch("reason");
  const nps = watch("nps");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createFeedbackAction({
        ...data,
        first_trip: data.first_trip === "sim",
        nps: Number(data.nps),
      });
      toast({
        title: "Feedback enviado",
        description: "Obrigado por compartilhar sua experiência!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description:
          "Houve um problema ao enviar seu feedback. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="first_trip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <strong>Você fez sua primeira entrega?</strong>
              </FormLabel>
              <FormControl>
                <ToggleGroup
                  onValueChange={field.onChange}
                  type="single"
                  value={field.value}
                >
                  <ToggleGroupItem
                    className="text-xl font-bold border-2"
                    value="yes"
                  >
                    Sim
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="text-xl font-bold border-2"
                    value="no"
                  >
                    Não
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {first_trip === "yes" || first_trip === "no" ? (
          <>
            <Separator className="my-4" />
            {first_trip === "no" && (
              <FormField
                control={control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <strong>Conta pra gente o que aconteceu:</strong>
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um motivo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {reasons.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={
                        first_trip === "yes"
                          ? "Conte como foi sua experiência."
                          : "Conte um pouco mais do que aconteceu."
                      }
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Sua mensagem vai ser encaminhada para a equipe responsável.
                  </p>
                </FormItem>
              )}
            />
          </>
        ) : null}

        {(first_trip === "yes" || (first_trip === "no" && reason)) && (
          <>
            <Separator className="my-4" />
            <FormField
              control={control}
              name="nps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <strong>Que nota você daria para sua experiência?</strong>
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      className="mb-4 flex justify-center"
                      onValueChange={field.onChange}
                      type="single"
                    >
                      {[1, 2, 3, 4, 5].map((idx) => (
                        <ToggleGroupItem
                          key={idx}
                          value={idx.toString()}
                          className="p-2 bg-white"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              field.value >= idx.toString()
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}

        <DialogFooter>
          <Button type="submit" disabled={loading || !nps}>
            {loading ? (
              <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
