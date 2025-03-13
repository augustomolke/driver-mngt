"use client";

import React from 'react';
import { Check, Calendar } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SelectAvailabilityProps {
  dateAvailability: string;

}


export default function SelectAvailability({ dateAvailability }: SelectAvailabilityProps) {
  const [selected, setSelected] = useState(false);
  return (
    <Card className="p-2">
      <CardDescription className=" flex items-center ">
        <Calendar className="mr-3 text-primary w-16 h-16" />
        <span className="text-lg font-bold text-primary">{dateAvailability}</span>
      </CardDescription>
      <Card
        className={`p-4 cursor-pointer transition-all duration-300 transform border-2 border-[#384b70] font-bold ${selected ? "bg-[#384b70]  scale-105" : "bg-white  scale-100"}`}
        onClick={() => setSelected(!selected)}
        onMouseEnter={(e) => e.currentTarget.classList.add("scale-105")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("scale-105")}
      >

          <CardDescription
            className={`flex items-center w-full  ${
              selected ? "text-[#fff]" : "text-[#384b70]"
            }`}
          >
            <span className="flex-grow text-center">15:30h às 18h</span>
            {selected && <Check className="ml-auto" />}
          </CardDescription>
      </Card>
    </Card>

  );
}
