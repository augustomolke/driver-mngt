"use client";
import {
  Card,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { saveOptions } from "@/lib/db/options";
import DateCheckbox from "../dateCheckbox";

interface LargePackageCardProps {
  options: {
    largePackages: boolean;
  };
}

export const LargePackageCard: React.FC<LargePackageCardProps> = ({ options }) => {
  const handleCheckedChange = async (value: boolean) => {
    await saveOptions(
      JSON.stringify({ ...options, largePackages: value })
    );
  };

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
              onCheckedChange={handleCheckedChange}
              text="Ativar rotas especiais"
              className="mt-2 py-2 px-1 font-base"
            />
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
