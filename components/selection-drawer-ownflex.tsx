"use client";
import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useClusters } from "@/hooks/useClusters";
import { useToast } from "@/hooks/use-toast";
import { CircleX, CircleCheckBig } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { savePreferences } from "@/lib/db/clusters";
import { Badge } from "./ui/badge";
import { Bounce, AttentionSeeker } from "react-awesome-reveal";

const limit = 5;

export const SelectionDrawer = ({ serverSession, choosed_station }) => {
  const { selected, setSelected, closeBtn } = useClusters();
  const [loading, setLoading] = React.useState();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = React.useCallback(async () => {
    setLoading(true);

    try {
      await savePreferences(selected, serverSession.user, choosed_station);
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

      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Ops!",
        description: "Algo deu errado.",
      });
    }
  }, [selected]); //, options]);

  return (
    <Drawer
      onClose={() => {
        closeBtn();
      }}
    >
      <Bounce className="fixed bottom-20 right-4 z-50 ">
        <DrawerTrigger className="flex items-center justify-center shadow-lg transform active:scale-x-75 transition-transform rounded-full bg-green-600 hover:bg-green-600 text-white p-3">
          <CircleCheckBig className="w-6 h-6 mr-1" />
          <span className="font-bold">Confirmar</span>
        </DrawerTrigger>
      </Bounce>

      {selected.length >= limit ? (
        <>
          <DrawerContent className="max-w-screen-sm mx-auto">
            <DrawerHeader>
              <DrawerTitle>Confirmar seleção</DrawerTitle>
              <DrawerDescription className="flex flex-col gap-2">
                <span>
                  Essas serão as regiões que utilizaremos para disponibilizar
                  suas rotas.{" "}
                </span>

                <span>
                  Você pode atualizar as suas preferências quando precisar
                  sempre até
                  <strong> 22h do dia anterior do seu carregamento.</strong>
                </span>
                <div>
                  As regiões selecionadas são:
                  <div>
                    {selected.map((c) => (
                      <Badge className="m-1">{c}</Badge>
                    ))}
                  </div>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                onClick={onSubmit}
                disabled={loading || selected.length < limit}
              >
                {loading ? (
                  <ReloadIcon className="mx-12 h-4 w-4 animate-spin" />
                ) : (
                  "Confirmar"
                )}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </>
      ) : (
        <>
          <DrawerContent className="max-w-screen-sm mx-auto">
            <DrawerHeader>
              <DrawerTitle>{`Por favor, escolha ao menos ${limit} regiões`}</DrawerTitle>
              <DrawerDescription>
                Selecione regiões que gostaria de realizar entregas clicando no
                mapa.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </>
      )}
    </Drawer>
  );
};
