import React from "react";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import deliveryIllustration from "@/components/assets/delivery-illustrations.svg";

export const Title = () => (
  <div className="flex items-center space-x-2">
    <CheckCircle2 className="h-5 w-5 text-green-500" />
    <span>Passo 1</span>
  </div>
);

export const Content = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">Cadastro aprovado!</h3>
    <p>Agora faltam poucos passos para você começar a realizar as entregas.</p>
    <div className="mt-4">
      <Image
        src={deliveryIllustration}
        alt="Delivery illustration"
        className="w-full max-w-xs mx-auto"
      />
    </div>
  </div>
);

const Step1 = { Title, Content };
export default Step1;
