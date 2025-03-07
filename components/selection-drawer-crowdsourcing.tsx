"use client";
import * as React from "react";
import { useMemo } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { useCrowdSourcing } from "@/hooks/useCrowdSourcing";
import { useToast } from "@/hooks/use-toast";
import { CircleX, CircleCheckBig } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { OwnFlexShifts } from "@/components/assets/shifts";
import { createManyAllocations } from "@/lib/db/allocations";

export const SelectionDrawer = ({
  serverSession,
  choosed_station,
  crowdSourcing = [],
  availableShifts,
}) => {
  const { selected, setSelected, closeBtn } = useCrowdSourcing();
  const [selectedShifts, setSelectedShifts] = React.useState([]);
  const [loading, setLoading] = React.useState();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = React.useCallback(async () => {
    setLoading(true);

    try {
      const allocations = selectedShifts.map((shift) => {
        const offer = crowdSourcing.find((s) => s.shift === shift);

        const offerId = offer?.id;

        return offerId;
      });

      await createManyAllocations(allocations);
      toast({
        icon: (
          <CircleCheckBig color="hsl(var(--green))" height={48} width={48} />
        ),
        title: "Pronto!",
        description: "Sua preferência foi salva!",
      });

      setSelected([]);

      router.push("/driver-panel");
    } catch (err) {
      console.log("Erro", err);
      setLoading(false);
      setSelected([]);

      router.push("/error?message=FilledCluster");

      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Ops!",
        description: "Algo deu errado.",
      });
    }
  }, [selected, selectedShifts]); //, options]);

  const shifts = useMemo(() => {
    const shifts = crowdSourcing.filter((offer) => {
      return offer.cluster == selected[0];
    });

    return shifts.map((s) => ({ shift: s.shift, description: s.description }));
  }, [crowdSourcing, selected]);

  return (
    <Drawer
      onClose={() => {
        if (!loading) {
          setSelected([]);
        }
      }}
      open={!!selected.length}
    >
      <>
        <DrawerContent className="max-w-screen-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>
              Confirmar minha rota na região <b>{selected[0]}</b>!
            </DrawerTitle>
            <DrawerDescription className="flex flex-col gap-2">
              <div className="gap-2 flex flex-col">
                <Label>Escolha a janela de carregamento:</Label>
                {shifts.map(({ shift }) => {
                  const label =
                    OwnFlexShifts.find((s) => s.id === shift)?.description ||
                    shift;

                  return (
                    <div className="flex items-center gap-2 justify-center">
                      <Checkbox
                        disabled={!availableShifts[shift]}
                        checked={selectedShifts.includes(shift)}
                        onCheckedChange={(check) => {
                          if (check) {
                            setSelectedShifts((state) => [...state, shift]);
                          } else {
                            setSelectedShifts((state) =>
                              state.filter((s) => s != shift)
                            );
                          }
                        }}
                        key={shift}
                        id={shift}
                      ></Checkbox>
                      <Label htmlFor={shift}>
                        <Badge key={shift}>
                          {label}
                          {!availableShifts[shift] && " - Já alocado"}
                        </Badge>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={onSubmit}
              disabled={loading || selectedShifts.length == 0}
            >
              {loading ? (
                <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
              ) : (
                "Quero fazer esta rota!"
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </>
    </Drawer>
  );
};
