import React from 'react';
import { AlertTitle, Alert, AlertDescription } from "@/components/ui/alert";
import { saveOptionsAction } from "@/lib/actions/options-actions";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectHubProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  options: SelectOption[];
  defaultValue?: string;
  currentOptions?: object;
}

export default function SelectHub({
  title,
  description,
  icon: Icon,
  options,
  defaultValue,
  currentOptions = {},
}: SelectHubProps) {
  
  const handleChange = async (hub: string) => {
    "use server";
    await saveOptionsAction(JSON.stringify({ ...currentOptions, hub }));
    redirect("/driver-panel");
  };

  return (
    <div className="text-black">
      <Alert variant={"secondary"} className="space-y-2">
        <AlertTitle className="font-bold flex gap-2 items-center">
          {Icon && <Icon />}
          {title}
        </AlertTitle>
        <AlertDescription>
          {description}
        </AlertDescription>
        <Select defaultValue={defaultValue} onValueChange={handleChange}>
          <SelectTrigger className="[&>span]:font-bold">
            <SelectValue className="text-black" placeholder="Selecione um hub" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem className="text-black" key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Alert>
    </div>
  );
}
