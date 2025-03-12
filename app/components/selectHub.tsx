import React from 'react';
import { AlertTitle, Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface SelectOption {
  value: string;
  label: string;
}

interface SelectHubProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  options: SelectOption[];
}

export default function SelectHub({ title, description, icon: Icon, options, }: SelectHubProps) {
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
        <Select>
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
