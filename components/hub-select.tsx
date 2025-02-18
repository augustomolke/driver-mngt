import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { saveOptionsAction } from "@/lib/actions/options-actions";
import { redirect } from "next/navigation";

export default function HubSelect({
  options = [],
  defaultValue,
}: {
  options: { key: string; label: string }[];
}) {
  if (!options.length) return null;

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={async (hub: string) => {
        "use server";
        await saveOptionsAction(JSON.stringify({ hub }));
        redirect("/driver-panel");
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione um hub" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex flex-col gap-2">
          {options.map(({ key, label }) => (
            <SelectItem className="text-primary" value={key}>
              {label}
              {/* <Dialog>
                <DialogTrigger>{label}</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Trocar de modalidade</DialogTitle>
                    <DialogDescription className="flex flex-col gap-2">
                      <span>
                        Na modalidade Flex, você pode realizar coletas e
                        entregas no mesmo dia e maximizar os ganhos.
                      </span>
                      <strong>
                        A troca de modalidade pode demorar até 24h para ser
                        efetivada.
                      </strong>
                    </DialogDescription>

                    <DialogFooter>
                      <Button
                      onClick={async () => {
                        await saveOptionsAction(JSON.stringify({ hub: key }));
                      }}
                    >
                      Confirmar
                    </Button>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog> */}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
