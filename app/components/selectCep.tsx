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



export default function SelectCep() {
  return (
    <div className='flex flex-col '>
      <div className="text-black flex ">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem className="text-[#ee4d2d] border-none bg-transparent !hover:bg-transparent !hover:border-none !hover:shadow-none !focus:outline-none !active:bg-transparent" value="apple">Apple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <button
          type="button"
          className='p-3'
        >
          <TrashIcon className="h-4 w-4  text-[#ee4d2d] " />
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
