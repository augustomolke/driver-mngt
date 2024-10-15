"use client";
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
import React from "react";
import LoginSubmitButton from "./login-submit-button";
import { useToast } from "@/hooks/use-toast";
import { CircleX } from "lucide-react";

export function SignIn() {
  const [values, setValues] = React.useState({ driverId: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bem vindo</CardTitle>
        <CardDescription>
          Por favor, informe seu Driver ID e os 4 últimos dígitos do seu
          telefone cadastrado.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          action={async (formData) => {
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
          }}
        >
          <input className="" type="hidden" name="redirectTo" value="/" />
          <Label>
            Driver ID
            <Input
              className="text-primary"
              name="driverId"
              type="number"
              placeholder="Driver ID"
              value={values.driverId}
              onChange={(e) =>
                setValues((state) => ({ ...state, driverId: e.target.value }))
              }
            />
          </Label>
          <Label>
            Senha
            <Input
              className="text-primary"
              name="password"
              type="password"
              placeholder="XXXX"
              maxLength="4"
              value={values.password}
              onChange={(e) =>
                setValues((state) => ({ ...state, password: e.target.value }))
              }
            />
          </Label>
          <div className="w-full flex justify-end mt-4">
            <LoginSubmitButton
              disabled={
                loading ||
                Object.entries(values)
                  .map((a) => a[1])
                  .filter((v) => !!v).length < 2
              }
            />
          </div>
          {/* <p aria-live="polite" className="sr-only">
            {loading?.message}
          </p> */}
        </form>
      </CardContent>
    </Card>
  );
}
