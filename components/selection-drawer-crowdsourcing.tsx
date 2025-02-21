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
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { useCrowdSourcing } from "@/hooks/useCrowdSourcing";
import { useToast } from "@/hooks/use-toast";
import { CircleX, CircleCheckBig } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { saveCurrentCrowdSelection } from "@/lib/savecrowdSourcing";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { OwnFlexShifts } from "@/components/assets/shifts";

export const SelectionDrawer = ({
  serverSession,
  choosed_station,
  crowdSourcing = [],
}) => {
  const { selected, setSelected, closeBtn } = useCrowdSourcing();
  const [selectedShifts, setSelectedShifts] = React.useState([]);
  const [loading, setLoading] = React.useState();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = React.useCallback(async () => {
    setLoading(true);

    try {
      const promises = selectedShifts.map((shift) => {
        return saveCurrentCrowdSelection(
          serverSession.user.driverId,
          `${selected[0]}_${shift}`
        );
      });
      await Promise.all(promises);
      // await saveOptions(JSON.stringify(options));

      toast({
        icon: (
          <CircleCheckBig color="hsl(var(--green))" height={48} width={48} />
        ),
        title: "Pronto!",
        description: "Sua preferência foi salva!",
      });

      router.push("/driver-panel");
    } catch (err) {
      console.log("Erro", err);
      setLoading(false);
      router.push("/error?message=FilledCluster");

      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Ops!",
        description: "Algo deu errado.",
      });
    }
  }, [selected, selectedShifts]); //, options]);

  const shifts = useMemo(() => {
    const shifts = crowdSourcing.filter((cluster) => {
      return cluster.Cluster == selected[0];
    });

    return shifts.map((s) => s.shift);
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
              Temos rotas disponíveis HOJE para a região <b>{selected[0]}</b>!
            </DrawerTitle>
            <DrawerDescription className="flex flex-col gap-2">
              <div className="gap-2 flex flex-col">
                <Label>Escolha a janela de carregamento:</Label>
                {shifts.map((shift) => (
                  <div className="flex items-center gap-2 justify-center">
                    <Checkbox
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
                        {OwnFlexShifts.find((s) => s.id === shift)?.description}
                      </Badge>
                    </Label>
                  </div>
                ))}
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
