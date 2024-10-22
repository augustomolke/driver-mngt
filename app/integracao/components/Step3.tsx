import React from "react";
import { CreditCard } from "lucide-react";

export const Title = () => (
  <div className="flex items-center space-x-2">
    <CreditCard className="h-5 w-5 text-purple-500" />
    <span>Passo 3</span>
  </div>
);

export const Content = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">ShopeePay</h3>
    <p>Configure sua conta ShopeePay para receber pagamentos.</p>
    <div className="mt-4">
      {/* Add a button or link to set up ShopeePay */}
      <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
        Configurar ShopeePay
      </button>
    </div>
  </div>
);

const Step3 = { Title, Content };
export default Step3;
