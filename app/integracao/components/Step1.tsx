import React from "react";
import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import deliveryIllustration from "@/components/assets/picked-up-package.svg";

export const Title = () => (
  <div className="flex items-center space-x-2">
    <CircleCheckBig className="size-10" style={{ color: "rgb(38, 170, 153)" }} />
    <p className="text-lg font-semibold" style={{ color: "rgb(38, 170, 153)" }}>
      Cadastro aprovado!
    </p>
  </div>
);

export const Content = () => (
  <div className="p-4 flex flex-col md:flex-row items-center">
    <div className="mt-4 mb-4 md:mb-0 md:mr-4">
      <Image
        src={deliveryIllustration}
        alt="Delivery illustration"
        className="max-w-xs w-full md:w-80"
      />
    </div>
    <p style={{ color: "#EE4D2D" }} className="text-center md:text-left">
      <strong>Parabéns</strong>, seu cadastro para ser um motorista parceiro da
      Shopee foi aprovado! Agora <strong>faltam poucos passos</strong> para você
      começar a realizar as entregas.
    </p>
  </div>
);

const Step1 = { Title, Content };
export default Step1;