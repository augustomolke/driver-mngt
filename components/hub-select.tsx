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
  currentOptions,
}: {
  options: { key: string; label: string }[];
}) {
  if (!options.length) return null;

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={async (hub: string) => {
        "use server";
        await saveOptionsAction(JSON.stringify({ ...currentOptions, hub }));
        redirect("/driver-panel");
      }}
    >
      <SelectTrigger className="[&>span]:font-bold">
        <SelectValue placeholder="Selecione um hub" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex flex-col gap-2">
          {options.map(({ key, label }) => (
            <SelectItem className="text-primary" value={key}>
              {label}
             
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
