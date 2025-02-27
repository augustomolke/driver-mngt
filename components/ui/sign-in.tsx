"use client";
import React, { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import loginAction from "@/lib/login-action";
import { BadgeHelp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import photoDriverId from "@/components/assets/photoDriverId.jpeg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import LoginSubmitButton from "./login-submit-button";
import { useToast } from "@/hooks/use-toast";

interface FormValues {
  driverId: string;
  password: string;
}

export function SignIn() {
  const [values, setValues] = useState<FormValues>({
    driverId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    await loginAction(formData);
  };

  const isFormValid = Object.values(values).every(Boolean);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Que bom que você está aqui!</CardTitle>
        <CardDescription>
          Para começar, preencha o seu{" "}
          <strong>Driver ID, localizado no canto superior do APP Driver</strong>
          , e os
          <strong> 4 últimos dígitos do seu telefone cadastrado</strong>.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input type="hidden" name="redirectTo" value="/" />
            <FormField
              label="Driver ID"
              name="driverId"
              type="number"
              placeholder="Driver ID"
              value={values.driverId}
              onChange={handleInputChange}
              showHelpIcon={true}
            />

            <FormField
              label="Últimos 4 dígitos do seu telefone"
              name="password"
              type="password"
              placeholder="XXXX"
              maxLength={4}
              value={values.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full flex justify-end mt-4 ">
            <LoginSubmitButton disabled={loading || !isFormValid} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  showHelpIcon?: boolean;
}

function FormField({
  label,
  showHelpIcon = false,
  ...inputProps
}: FormFieldProps) {
  return (
    <Label>
      <div className="flex flex-col gap-2">
        <div className="flex flex items-center gap-2">
          <div className="flex flex-col justify-center items-center font-bold ">
            {label}
          </div>
          {showHelpIcon && (
            <Dialog>
              <DialogTrigger asChild>
                <BadgeHelp className="w-4 h-4 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md pb-8 px-0">
                <DialogHeader className="px-0">
                  <DialogTitle>Ajuda - Driver ID</DialogTitle>
                  <DialogDescription>
                    O Driver ID é encontrado no canto superior do Driver APP. É
                    um número único que identifica cada motorista.
                  </DialogDescription>
                  <Image
                    src={photoDriverId}
                    alt="photoDriverId"
                    className="w-full max-w-xs mx-auto"
                  />
                </DialogHeader>
                <DialogFooter className="sm:justify-start px-0">
                  <DialogClose asChild>
                    <Button type="button">Fechar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <Input className="text-primary" {...inputProps} />
      </div>
    </Label>
  );
}
