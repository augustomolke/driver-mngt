"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import or create these components
import Logo from "@/components/assets/logo";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import { redirect } from "next/navigation";

export default function Integracao() {
  const [current, setCurrent] = useState("#step1");

  const steps = [
    {
      id: 1,
      title: <Step1.Title />,
      content: <Step1.Content />,
      buttonLabel: "Saiba mais!",
    },
    {
      id: 2,
      title: <Step2.Title />,
      content: <Step2.Content />,
      buttonLabel: "Já concluí esta etapa!",
    },
    {
      id: 3,
      title: <Step3.Title />,
      content: <Step3.Content />,
    },
    {
      id: 4,
      title: <Step4.Title />,
      content: <Step4.Content />,
    },
  ];

  return (
    <>
    <div  className=" ">
      <Accordion
        collapsible
        type="single"
        value={current}
        onValueChange={setCurrent}
        className="w-full md:w-[600px] lg:w-[600px] flex flex-col"
      >
        {steps.map((step) => (
          <AccordionItem
            key={step.id}
            value={`#step${step.id}`}
            className={cn(
              "my-2 bg-foreground rounded-lg px-3",
              "bg-foreground",
              "mt-6"
            )}
          >
            <AccordionTrigger>{step.title}</AccordionTrigger>
            <AccordionContent>
              {step.content}
              {step.buttonLabel && (
                <div className={cn("flex justify-end", step.buttonClass)}>
                  <Button
                    id={`step${step.id}`}
                    onClick={() => setCurrent(`#step${step.id + 1}`)}
                  >
                    {step.buttonLabel}
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
     </div>
    </>
  );
}
