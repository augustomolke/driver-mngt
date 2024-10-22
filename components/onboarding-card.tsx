// src/App.js
"use client";
import { useState, useEffect } from "react";

// You'll need to import or create these components
import Logo from "@/components/logo";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";

const WelcomeContent = () => (
  <Card className="min-h-80 flex flex-col items-center justify-between p-6">
    <span className="text-4xl font-semibold mt-8">Vamos Começar?</span>
    {/* Add more content here */}
  </Card>
);

const DriverAppContent = () => (
  <Card className="p-6 min-h-80 flex flex-col justify-between">
    <div className="flex flex-col gap-2">
      <span className="text-center">
        Nesta etapa você conhecerá mais sobre a Shopee e como selecionar as
        regiões de entrega de sua preferência.
      </span>
      <span className="text-center">
        <strong>
          Você pode realizar o treinamento direto do seu celular. Escolha a sua
          sessão abaixo:
        </strong>
      </span>
    </div>
    {/* Add more content here */}
  </Card>
);

const ShopeePayContent = () => (
  <>
    <ShopeePayMobile />
    <ShopeePayDesktop />
  </>
);

const ShopeePayMobile = () => (
  <div className="block lg:hidden">{/* Mobile ShopeePay content */}</div>
);

const ShopeePayDesktop = () => (
  <div className="hidden lg:flex">{/* Desktop ShopeePay content */}</div>
);

const TrainingContent = () => (
  <Card className="p-6 min-h-80">
    <span className="text-md font-bold">Ativando a ShopeePay</span>
    {/* Add more content here */}
  </Card>
);

const OnboardingCard = () => {
  const [currentStep, setCurrentStep] = useState("#step1");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentStep(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const steps = [
    {
      id: 1,
      title: "Bem-vindo",
      content: WelcomeContent,
      buttonLabel: "Saiba mais!",
    },
    {
      id: 2,
      title: "Driver App",
      content: DriverAppContent,
      buttonLabel: "Já concluí esta etapa!",
    },
    { id: 3, title: "ShopeePay", content: ShopeePayContent },
    { id: 4, title: "Treinamento", content: TrainingContent },
  ];

  const handleStepChange = (step) => {
    setCurrentStep(`#step${step.id + 1}`);
    window.location.hash = `#step${step.id + 1}`;
  };

  return (
    <div className="container">
      <header className="header my-4 row-span-2">
        <Logo />
      </header>
      <section className="container row-span-6">
        <div className="h-100 flex justify-center items-center">
          <Accordion
            className="w-full sm:max-w-[70%] text-primary"
            value={currentStep}
          >
            {steps.map((step) => (
              <AccordionItem key={step.id} value={`#step${step.id}`}>
                <AccordionTrigger>{step.title}</AccordionTrigger>
                <AccordionContent>
                  <step.content />
                  {step.buttonLabel && (
                    <div className="flex justify-end">
                      <Button
                        id={`step${step.id}`}
                        href={`#step${step.id + 1}`}
                        onClick={() => handleStepChange(step)}
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
      </section>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* Dialog content */}
      </Dialog>
    </div>
  );
};

export default OnboardingCard;
