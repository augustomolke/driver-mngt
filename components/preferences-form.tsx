"use client";
import * as React from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Fade } from "react-awesome-reveal";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TrashIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Preloaded } from "convex/react";
import { useSession } from "next-auth/react";
import { usePreloadedQuery } from "convex/react";
import { BadgeIcon } from "@radix-ui/react-icons";

export default ({
  preloadedPreferences,
  regions = [],
  redirectTo = null,
  backButton = false,
}) => {
  const router = useRouter();
  const prevPreferences = usePreloadedQuery(preloadedPreferences);

  const { toast } = useToast();
  const { data: session } = useSession();
  const updatePreferences = useMutation(api.preferences.updatePreferences);

  const [loading, setLoading] = React.useState(false);

  const [cascadeState, setCascade] = React.useState(true);
  const [values, setValues] = React.useState(
    prevPreferences?.length > 0
      ? prevPreferences[0].preferences.length > 0
        ? prevPreferences[0].preferences.map((pref) => ({
            id: `${pref.city}_${pref?.neighbor}_${pref.cep}`,
            value: `${pref.city}_${pref?.neighbor}_${pref.cep}`,
            label: `[${pref.cep}-XXX] ${pref?.neighbor}`,
          }))
        : Array.from(Array(3).keys()).map((v, idx) => ({
            id: idx,
            value: "",
            label: "",
          }))
      : Array.from(Array(3).keys()).map((v, idx) => ({
          id: idx,
          value: "",
          label: "",
        }))
  );

  React.useEffect(() => {
    setValues(
      prevPreferences?.length > 0
        ? prevPreferences[0].preferences.length > 0
          ? prevPreferences[0].preferences.map((pref) => ({
              id: `${pref.city}_${pref?.neighbor}_${pref.cep}`,
              value: `${pref.city}_${pref?.neighbor}_${pref.cep}`,
              label: `[${pref.cep}-XXX] ${pref?.neighbor}`,
            }))
          : Array.from(Array(3).keys()).map((v, idx) => ({
              id: idx,
              value: "",
              label: "",
            }))
        : Array.from(Array(3).keys()).map((v, idx) => ({
            id: idx,
            value: "",
            label: "",
          }))
    );
  }, [prevPreferences]);

  const form = useForm();

  const preferences = React.useMemo(
    () =>
      values.map(({ value }) => {
        const [city, neighbor, cep] = value.split("_");

        return { cep, neighbor, city };
      }),
    [values]
  );

  const onSubmit = React.useCallback(
    async function onSubmit() {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.

      try {
        setLoading(true);

        const user = prevPreferences.find(Boolean);

        if (!user) {
          const newUser = {
            driver_id: session.user.driverId.toString(),
            driver_name: session.user.driverName,
            phone: session.user.phone.toString(),
            preferences,
            station: session.user.station,
            vehicle: session.user.vehicle,
          };

          await updatePreferences({
            user: newUser,
            preferences,
          });
        } else {
          await updatePreferences({
            user: prevPreferences[0],
            preferences,
          });
        }

        toast({
          title: "Pronto!",
          description: "Suas preferências foram salvas!",
        });

        if (!!redirectTo) {
          router.push(redirectTo);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Ops!",
          description: "Algo deu errado.",
        });
        console.log(err);
      }
    },
    [preferences]
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Áreas de Preferência</CardTitle>
        <CardDescription>
          Selecione pelo menos 3 áreas de preferência
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            id="preferences"
          >
            <Fade cascade={cascadeState} damping={0.1} triggerOnce>
              {values.map(({ id, value, label }) => {
                return (
                  <FormField
                    control={form.control}
                    name={value}
                    render={({ field }) => {
                      return (
                        <div className="flex w-full">
                          <FormItem className="w-full" id={id}>
                            <FormControl>
                              <Select
                                className="w-full"
                                id={`select${id}`}
                                value={value}
                                onValueChange={(a) =>
                                  setValues((state) => {
                                    const newState = state.map((toChange) => {
                                      if (toChange.id == id) {
                                        const labelArr = a.split("_");

                                        return {
                                          ...toChange,
                                          value: a,
                                          label: `${labelArr[1]}-${labelArr[0]}`,
                                        };
                                      }
                                      return toChange;
                                    });
                                    return newState;
                                  })
                                }
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Selecione uma área" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    ...new Set(
                                      regions
                                        .sort((a, b) => {
                                          if (a.incentive > b.incentive) {
                                            return -1;
                                          }
                                          if (a.incentive < b.incentive) {
                                            return 1;
                                          }

                                          return 0;
                                        })
                                        .map(({ value }) => {
                                          return value.split("_");
                                        })
                                        .map((a) => a[0])
                                    ),
                                  ].map((city) => {
                                    const incentives = regions
                                      .filter(
                                        (region) =>
                                          region.value.split("_")[0] == city
                                      )
                                      .filter((region) => !!region.incentive);
                                    return (
                                      <SelectGroup>
                                        {incentives.length > 0 ? (
                                          <SelectLabel className="sticky top-[-5px] px-4 py-3 z-[51] bg-[white]">
                                            <Badge>
                                              <DollarSign />
                                              {city}
                                            </Badge>
                                          </SelectLabel>
                                        ) : (
                                          <SelectLabel className="sticky top-[-5px] px-4 py-3 z-[51] bg-[white]">
                                            {city}
                                          </SelectLabel>
                                        )}

                                        {regions
                                          .filter(
                                            (region) =>
                                              region.value.split("_")[0] == city
                                          )
                                          .sort((a, b) => {
                                            if (a.incentive > b.incentive) {
                                              return -1;
                                            }
                                            if (a.incentive < b.incentive) {
                                              return 1;
                                            }

                                            return 0;
                                          })
                                          .map((region) => {
                                            return (
                                              <SelectItem
                                                disabled={
                                                  values.findIndex(
                                                    (value) =>
                                                      value.value ==
                                                      region.value
                                                  ) >= 0
                                                }
                                                value={region.value}
                                              >
                                                {region.incentive ? (
                                                  <Badge className="bg-green">
                                                    {region.incentive}
                                                  </Badge>
                                                ) : null}{" "}
                                                {region.label}
                                              </SelectItem>
                                            );
                                          })}
                                      </SelectGroup>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                          <Button
                            variant="outliner"
                            type="button"
                            disabled={values.length <= 3}
                            onClick={() =>
                              setValues((state) => {
                                return state.filter(
                                  (toDelete) => toDelete.id !== id
                                );
                              })
                            }
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    }}
                  />
                );
              })}
            </Fade>
          </form>
        </Form>
        <div className="flex justify-center mt-4">
          <Button
            onClick={() =>
              setValues((state) => {
                setCascade(false);
                const newState = [
                  ...state,
                  {
                    id: (Object.keys(state).length + 1).toString(),
                    value: "",
                  },
                ];

                return newState;
              })
            }
            variant="outliner"
            className="rounded-full"
          >
            <PlusCircledIcon className="h-6 w-6  " />
          </Button>
        </div>
      </CardContent>
      <CardFooter
        className={`flex ${backButton ? "justify-between" : "justify-end"}`}
      >
        {backButton ? (
          <Button onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
        ) : null}
        <Button
          type="submit"
          form="preferences"
          disabled={values.findIndex((v) => v.value == "") > -1}
        >
          {loading ? (
            <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
          ) : (
            "Salvar Alterações"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
