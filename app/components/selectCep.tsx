
'use client';


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
import { TrashIcon, PlusCircledIcon } from "@radix-ui/react-icons";


interface SelectOption {
  value: string;
  label: string;
}


interface SelectCepProps {
  options: SelectOption[];
  onDelete: (value: string) => void;
}


export default function SelectCep({ options, onDelete }: SelectCepProps) {
  const handleDelete = (value: string) => {
    onDelete(value); 
  };
  return (
    <div className='flex flex-col '>
      <div className="text-black flex ">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o Cep" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rio de janeiro</SelectLabel>
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
          className='p-3'
          onClick={() => handleDelete(options[0]?.value)}
        >
          <TrashIcon className="h-6 w-6  text-[#ee4d2d] " />
        </button>
      </div>
      <button
        type="button"
        className="rounded-full text-[#ee4d2d] flex items-center justify-center mt-3"
      >
        <PlusCircledIcon className="h-6 w-6" />
      </button>
    </div>
  );
}


