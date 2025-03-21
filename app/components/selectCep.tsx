
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Truck, DollarSign, } from "lucide-react";
import { TrashIcon, PlusCircledIcon } from "@radix-ui/react-icons";


interface SelectOption {
  value: string;
  label: string;
}


interface SelectCepProps {
  options: SelectOption[];
  descriptionCard: string; 
}


export default function SelectCep({ options, descriptionCard }: SelectCepProps) {

  return (
    <Card className="p-2">
      <CardDescription className="mb-2">
        { descriptionCard }
      </CardDescription>
      <div className='flex flex-col '>
        <div className="text-black flex ">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o Cep" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className=""> 
                  <Badge  >
                    <DollarSign />
                    {/* <Truck /> */}
                    Rio de janeiro
                  </Badge>
              </SelectLabel>
                {options.map((option) => (
                  <SelectItem className="text-black" key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button
            type="button"
            className='p-1'
          >
            <TrashIcon className="h-6 w-6  text-[#ee4d2d] " />
          </button>
        </div>
        <button
          type="button"
          className="rounded-full text-[#ee4d2d] flex items-center justify-center mt-1"
        >
          <PlusCircledIcon className="h-6 w-6" />
        </button>
      </div>
    </Card >
  );
}


