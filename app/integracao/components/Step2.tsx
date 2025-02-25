import React from "react";
import { ClipboardPen } from "lucide-react";
import Image from "next/image";
import deliveryIllustration from "@/components/assets/package-on-the-way.svg";

export const Title = () => (
  <div className="flex items-center space-x-2">
    <ClipboardPen className="size-10 " style={{ color: '#EE4D2D' }} />
    <span className="text-lg font-semibold" style={{ color: '#EE4D2D' }} >Termos & Condições</span>
  </div>
);

export const Content = () => (
  <div className="p-4">
    <div className="flex flex-col">
      <div className="flex flex-wrap items-start">
        <p className="w-full md:w-1/2 pr-4 mb-4 md:mb-0" style={{ color: '#EE4D2D' }}>
          Leia e aceite os <strong>Termos & Condições no Driver App</strong> antes de passar para a próxima etapa.
        </p>
        <Image
          src={deliveryIllustration}
          alt="Delivery illustration"
          className="w-full md:w-1/2 max-w-xs md:max-w-full"
        />
      </div>
    </div>
    <div className="mt-4">
      <div className="flex flex-col md:flex-row items-start">
        <Image
          height={150}
          width={290}
          src="https://lh3.googleusercontent.com/d/1yVAQZ-cuA3SrF0q2hjHC5Ix4o2s6X5S3"
          alt="Assinar o contrato"
          className="border-2 mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
        />
        <div className="flex flex-col md:pt-0 p-2">
          <p style={{ color: '#EE4D2D' }}> 1. No Driver App, <strong>clique em Revise e assine os Termos e Condições</strong></p>
          <p style={{ color: '#EE4D2D' }}>2.<strong>Leia o documento completo</strong> e clique em OK no final</p>
        </div>
      </div>
    </div>
  </div>
);

const Step2 = { Title, Content };
export default Step2;