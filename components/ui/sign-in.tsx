"use client";
import React, { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import loginAction from "@/lib/login-action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginSubmitButton from "./login-submit-button";
import { useToast } from "@/hooks/use-toast";
import { CircleX } from "lucide-react";

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
    try {
      setLoading(true);
      await loginAction(formData);
    } catch (e) {
      setLoading(false);
      toast({
        icon: <CircleX height={48} width={48} />,
        title: "Algo deu errado!",
        description: e.message.split(".")[0],
      });
    }
  };

  const isFormValid = Object.values(values).every(Boolean);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Que bom que você está aqui!</CardTitle>
        <CardDescription>
          Para começar, preencha o seu{" "}
          <strong>Driver ID, localizado no canto superior do APP Driver</strong>
          , e os
          <strong> 4 últimos dígitos do seu telefone cadastrado</strong>.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={handleSubmit}>
          <input type="hidden" name="redirectTo" value="/" />
          <FormField
            label="Driver ID"
            name="driverId"
            type="number"
            placeholder="Driver ID"
            value={values.driverId}
            onChange={handleInputChange}
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
          <div className="w-full flex justify-end mt-4">
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
}

function FormField({ label, ...inputProps }: FormFieldProps) {
  return (
    <Label>
      {label}
      <Input className="text-primary" {...inputProps} />
    </Label>
  );
}
