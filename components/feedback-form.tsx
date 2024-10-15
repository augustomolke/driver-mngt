import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "./ui/dialog";
import { useForm } from "react-hook-form";
import React from "react";
import { Separator } from "./ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "./ui/label";
import { createFeedbackAction } from "@/lib/feedback-actions";

const reasons = [
  "Fui dispensado pelo responsável do hub",
  "Não tinha os equipamentos de segurança necessários",
  "Tive problemas pessoais",
  "Tive problemas com a plataforma de agendamento",
];

export default function () {
  const form = useForm();
  const [direction, setDirection] = React.useState();
  const [nps, setNps] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [reason, setReason] = React.useState();
  const [text, setText] = React.useState();

  const { toast } = useToast();

  const onSubmit = () => {};

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <FormLabel>
          <strong> Você fez sua primeira entrega?</strong>
        </FormLabel>
        <ToggleGroup onValueChange={setDirection} type="single">
          <ToggleGroupItem className="text-xl text-bold border-2" value="yes">
            Sim
          </ToggleGroupItem>
          <ToggleGroupItem className="text-xl text-bold border-2" value="no">
            Não
          </ToggleGroupItem>
        </ToggleGroup>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          id="feedback"
        >
          {direction == "no" && (
            <>
              <Separator className="my-2" />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>
                        <strong>Conta pra gente o que aconteceu:</strong>
                      </FormLabel>
                      <FormControl>
                        <Select value={reason} onValueChange={setReason}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um motivo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {reasons.map((r) => (
                                <SelectItem value={r}>{r}</SelectItem>
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
              <div className="grid w-full gap-1.5">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Conte um pouco mais do que aconteceu."
                  id="message-2"
                />
                <p className="text-sm text-muted-foreground">
                  Sua mensagem vai ser encaminhada para a equipe responsável.
                </p>
              </div>
            </>
          )}

          {(direction == "yes" || (direction == "no" && !!reason)) && (
            <>
              <Separator className="my-2" />
              <FormLabel className="mt-2">
                <strong>Que nota você daria para sua experiência?</strong>
              </FormLabel>
              <ToggleGroup
                className="mb-8"
                onValueChange={setNps}
                value={nps}
                type="single"
              >
                {Array.from({ length: 5 }, (value, index) => index + 1).map(
                  (idx) => (
                    <ToggleGroupItem value={idx}>{idx}</ToggleGroupItem>
                  )
                )}
              </ToggleGroup>
            </>
          )}
        </form>
      </Form>

      <DialogFooter>
        <Button
          disabled={loading || !nps}
          onClick={async () => {
            setLoading(true);
            const answers = {
              nps,
              reason,
              first_trip: direction,
              text,
            };

            await createFeedbackAction(answers);

            setLoading(false);
          }}
        >
          {loading ? (
            <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
          ) : (
            "Confirmar"
          )}
        </Button>
      </DialogFooter>
    </div>
  );
}
