"use client";
import { useState, useMemo } from "react";

import { useForm } from "react-hook-form";
import { CircleX, CircleCheckBig } from "lucide-react";
import { Badge } from "./ui/badge";
import { useCepsStore } from "@/lib/cepsStore";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { MultiSelect } from "./ui/multi-select";
import { savePreferences } from "@/lib/db/preferences";
import { OptionsForm } from "@/components/ownflex-options-form";
import { saveOptions } from "@/lib/db/options";

export default function OwnFlexCepsForm({
  defaultValues,
  macroRegions,
  loggedUser,
  defaultOptions,
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const resetCeps = useCepsStore((state) => state.resetCeps);
  const [options, setOptions] = useState(defaultOptions);

  const form = useForm({
    defaultValues,
  });

  const { watch, resetField } = form;
  const selectedMacro = watch("macro");
  const selectedCeps = watch("ceps");

  const ceps = useMemo(() => {
    if (!selectedMacro) return [];
    const [route, zona] = selectedMacro.split("_");

    const ceps = macroRegions[route]
      .filter((r) => r.zona == zona)
      .map((z) => ({ label: z.ceps, value: `${z.ceps}_${z.cluster}` }));

    return ceps;
  }, [selectedMacro]);

  const limit = useMemo(() => {
    if (!selectedMacro) return 0;
    const [route, zona] = selectedMacro.split("_");

    const ceps = macroRegions[route].filter((r) => r.zona == zona);

    return ceps.length < 3 ? ceps.length : 3;
  }, [selectedMacro]);

  async function onSubmit(data) {
    setLoading(true);

    try {
      const payload = data.ceps.map((pref) => ({
        driver_id: loggedUser.driverId.toString(),
        driver_name: loggedUser.driverName,
        phone: loggedUser.phone.toString(),
        station: loggedUser.choosed_station || loggedUser.station,
        vehicle: loggedUser.vehicle,
        city: data.macro,
        cep: pref,
        ownflex: true,
      }));

      await Promise.all([
        savePreferences(payload),
        saveOptions(JSON.stringify(options)),
      ]);

      toast({
        icon: (
          <CircleCheckBig color="hsl(var(--green))" height={48} width={48} />
        ),
        title: "Pronto!",
        description: "Sua preferência foi salva!",
      });

      router.push("/driver-panel");
    } catch (err) {
      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Algo deu errado!",
        description: "Tente novamente",
      });
      setLoading(false);
    }
  }

  const regions = [...new Set(Object.keys(macroRegions))];

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
                  <FormLabel className="text-xl">Regiões Disponíveis</FormLabel>
                  <FormDescription>
                    Selecione a região que você gostaria de realizar entregas.
                  </FormDescription>
                </div>
                <FormField
                  key={"macro"}
                  control={form.control}
                  name="macro"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={"macro"}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Select
                            className="w-full"
                            id={"macro"}
                            value={field.value}
                            onValueChange={(data) => {
                              resetField("ceps");
                              resetCeps();

                              field.onChange(data);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione uma área" />
                            </SelectTrigger>
                            <SelectContent>
                              {regions
                                .sort((a, b) =>
                                  macroRegions[a].length <
                                  macroRegions[b].length
                                    ? -1
                                    : 1
                                )
                                .map((region) => {
                                  const zonas = [
                                    ...new Set(
                                      macroRegions[region]
                                        .map((r) => r.zona)
                                        .filter((zona) => !!zona)
                                    ),
                                  ];

                                  return (
                                    <SelectGroup>
                                      <SelectLabel className="sticky top-[-5px] px-4 py-3 z-[51] bg-[white]">
                                        <Badge>{region}</Badge>
                                      </SelectLabel>

                                      {zonas.map((zona) => {
                                        return (
                                          <SelectItem
                                            value={`${region}_${zona}`}
                                            className="flex justify-between items-center"
                                          >
                                            {`${zona}`}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectGroup>
                                  );
                                })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        {/* <FormLabel className="text-sm font-normal">
                          {macro.label}
                        </FormLabel> */}
                      </FormItem>
                    );
                  }}
                />
                <FormMessage />
              </FormItem>
              <Separator />
            </div>
          )}
        />
        {selectedMacro ? (
          <FormField
            control={form.control}
            name="ceps"
            render={() => (
              <div className="flex flex-col gap-8">
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-xl">CEPs Disponívels</FormLabel>
                    <FormDescription>
                      Selecione pelo menos 3 faixas de CEPs que você gostaria de
                      realizar entregas.
                    </FormDescription>
                  </div>
                  <FormField
                    key={"ceps"}
                    control={form.control}
                    name="ceps"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={"ceps"}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <MultiSelect
                              options={ceps}
                              onValueChange={field.onChange}
                              defaultValue={selectedCeps}
                              placeholder="Selecione os CEPs"
                              variant="inverted"
                              maxCount={3}
                            />
                          </FormControl>
                          {/* <FormLabel className="text-sm font-normal">
                          {macro.label}
                        </FormLabel> */}
                        </FormItem>
                      );
                    }}
                  />
                  <FormMessage />
                </FormItem>
                <Separator />
              </div>
            )}
          />
        ) : null}

        <OptionsForm defaultValues={defaultOptions} setOptions={setOptions} />
        <Button
          type="submit"
          disabled={
            loading ||
            !selectedCeps ||
            selectedCeps.length < limit ||
            options.days.length <= 0 ||
            options.shifts.length <= 0
          }
        >
          {loading ? (
            <ReloadIcon className="mx-4 h-4 w-4 animate-spin" />
          ) : (
            "Salvar"
          )}
        </Button>
      </form>
    </Form>
  );
}
