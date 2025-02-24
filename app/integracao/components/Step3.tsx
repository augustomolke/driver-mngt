import React from "react";
import { WalletCards } from "lucide-react";

export const Title = () => (
  <div className="flex items-center space-x-2">
    < WalletCards className="size-10  " style={{color: '#EE4D2D'}}/>
   
    <span className="font-semibold " style={{ color: '#EE4D2D' }} >ShopeePay</span>
  </div>
);

export const Content = () => (
  <div className="p-4">
    <div className="mt-4 ">
      <p style={{ color: '#EE4D2D' }} >A ShopeePay <strong> é um serviço de carteira digital </strong>   oferecido pela Shopee por onde os Motoristas Parceiros  <strong> recebem seus ganhos </strong></p>
      <p  style={{ color: '#EE4D2D' }} className="border-2 border-solid border-[#EE4D2D] text-center p-2 rounded-md">O cadastro na ShopeePay deve estar no <strong> mesmo nome e telefone do cadastro realizado no Driver App </strong>(aplicativo de entregas)</p>
      <div className="flex justify-center p-4">
      <button className="bg-[#EE4D2D]  px-4 py-2 rounded ">
         Ativei minha conta ShopeePay!
      </button>
      </div>
    </div>
  </div>
);

const Step3 = { Title, Content };
export default Step3;
