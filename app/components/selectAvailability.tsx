import React from 'react';
import {  Calendar } from "lucide-react";

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
  return (
  <Card className="p-2">
    <CardDescription className=" flex items-center ">
      <Calendar className="mr-3 text-primary w-16 h-16" />
      <span className="text-lg font-bold text-primary">{dateAvailability}</span>
    </CardDescription>
  </Card>
  );
}
