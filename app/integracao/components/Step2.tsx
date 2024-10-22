import React from "react";
import { FileText } from "lucide-react";
import Image from "next/image";

export const Title = () => (
  <div className="flex items-center space-x-2">
    <FileText className="h-5 w-5 text-blue-500" />
    <span>Passo 2</span>
  </div>
);

export const Content = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">Termos & Condições</h3>
    <p>Por favor, leia e aceite os termos e condições para continuar.</p>
    <div className="mt-4">
      {/* Add a link or button to view terms and conditions */}
      <Image
        height={150}
        width={90}
        src="https://lh3.googleusercontent.com/d/1yVAQZ-cuA3SrF0q2hjHC5Ix4o2s6X5S3"
        alt="Assinar o contrato"
        class="scale-75 border-2 mt-[-60px]"
      />
    </div>
  </div>
);

const Step2 = { Title, Content };
export default Step2;
