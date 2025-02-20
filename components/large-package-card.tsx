"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { saveOptions } from "@/lib/db/options";
import { getOptions } from "@/lib/db/options";
import { auth } from "@/auth";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import DateCheckbox from "./date-checkbox";

export const LargePackageCard = ({ options }: { options: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <span>
            Você tem a possibilidade de realizar entregas de pacotes mais
            <strong> volumosos</strong>. Essas rotas são geralmente mais curtas
            e, portanto, podem resultar em <strong>mais ganhos</strong>!
          </span>
          <div className="flex items-center space-x-2 mt-2">
            <DateCheckbox
              defaultChecked={options?.largePackages}
              onCheckedChange={async (value) => {
                await saveOptions(
                  JSON.stringify({ ...options, largePackages: value })
                );
              }}
              text="Ativar rotas especiais"
              className="mt-2 py-2 px-1 font-base"
            />
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
