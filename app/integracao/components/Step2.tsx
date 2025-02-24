import React from "react";
import { ClipboardPen } from "lucide-react";
import Image from "next/image";
import deliveryIllustration from "@/components/assets/package-on-the-way.svg";

export const Title = () => (
  <div className="flex items-center space-x-2">
    < ClipboardPen className="size-10 " style={{ color: '#EE4D2D' }} />
    <span className="text-lg font-semibold" style={{ color: '#EE4D2D' }} >Termos & Condições</span>
  </div>
);

export const Content = () => (
  <div className="p-4">
    {/* <h3 className="text-lg font-semibold mb-2">Termos & Condições</h3> */}
    <div className="flex flex-col ">
      <div className="flex">
        <p style={{ color: '#EE4D2D' }} >Leia e aceite os  <strong>Termos & Condições no Driver App</strong>  antes de passar para a próxima etapa.</p>
        <Image
          src={deliveryIllustration}
          alt="Delivery illustration"
          className=" max-w-xs  w-40"
        />
      </div>
    </div>
    <div>
      <div className="flex ">
        <Image
          height={150}
          width={290}
          src="https://lh3.googleusercontent.com/d/1yVAQZ-cuA3SrF0q2hjHC5Ix4o2s6X5S3"
          alt="Assinar o contrato"
          className=" border-2 "
        />
        <div className="flex  flex-col pt-56 p-2">
          <p style={{ color: '#EE4D2D' }} > 1. No Driver App, <strong>clique em Revise e assine os Termos e Condições</strong></p>
          <p style={{ color: '#EE4D2D' }} >2.<strong>Leia o documento completo</strong> e clique em OK no final</p>
        </div>
       
      </div>
    </div>


  </div>
);

const Step2 = { Title, Content };
export default Step2;
