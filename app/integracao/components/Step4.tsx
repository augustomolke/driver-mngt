import React from "react";
import { Tv } from "lucide-react";

export const Title = () => (
  <div className="flex items-center space-x-2">
    < Tv className="size-10 text-yellow-500" style={{ color: '#EE4D2D' }} />
    <span style={{ color: '#EE4D2D' }} className="font-semibold" >Treinamento</span>
  </div>
);

export const Content = () => (
  <div className="p-4 flex flex-col gap-2.5">
    <p style={{ color: "#EE4D2D" }} className="text-center" > <strong> Nos próximos dias ficará disponível para você  </strong> o treinamento   <strong>no Driver App </strong>  para ficar apto a receber as rotas. </p>
    <p style={{ color: "#EE4D2D" }} className="text-center" >Durante o curso, você será orientado sobre:</p>
    <p style={{ color: "#EE4D2D" }} > <strong>Como receber suas rotas de entrega  </strong> </p>
    <p style={{ color: "#EE4D2D" }} > <strong>O processo de entrega de pacotes</strong> </p>
    <p style={{ color: "#EE4D2D" }} > <strong>Detalhes sobre o funcionamento dos pagamentos.  </strong> </p>
    <p style={{ color: "#EE4D2D" }} > <strong> Atenção:</strong>  Somente após a conclusão do treinamento você estará habilitado para receber as rotas.   Acesse o treinamento no app e esteja pronto para começar! </p>

  </div>
);

const Step4 = { Title, Content };
export default Step4;
