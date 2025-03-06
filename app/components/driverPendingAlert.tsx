import React from "react";
import { TriangleAlert, CircleCheckBig } from "lucide-react";

interface DriverPendingAlertProps {
  pendencias?: number;
}

const DriverPendingAlert: React.FC<DriverPendingAlertProps> = ({ pendencias = 0 }) => {
  const hasPendencias = pendencias > 0;
  const Icon = hasPendencias ? TriangleAlert : CircleCheckBig;
  const message = hasPendencias
    ? `Você possui ${pendencias} pendência${pendencias > 1 ? "s" : ""}!`
    : "Você não possui pendências para revisar.";

  return (
    <div className="bg-[#64a456] w-full h-auto p-4 rounded-md flex items-center justify-center">
      <div className="flex flex-row items-center">
        <Icon className="h-8 w-8 mr-1" />
        <div className="flex flex-col">
          <strong>{message}</strong>
          {hasPendencias && <p className="text-sm">Revise os itens abaixo para continuar.</p>}
        </div>
      </div>
    </div>
  );
};

export default DriverPendingAlert;
