import React from "react";
import { BookOpen } from "lucide-react";

export const Title = () => (
  <div className="flex items-center space-x-2">
    <BookOpen className="h-5 w-5 text-yellow-500" />
    <span>Passo 4</span>
  </div>
);

export const Content = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">Treinamento</h3>
    <p>Complete o treinamento obrigatório para começar a fazer entregas.</p>
    <div className="mt-4">
      {/* Add a button or link to start the training */}
      <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        Iniciar Treinamento
      </button>
    </div>
  </div>
);

const Step4 = { Title, Content };
export default Step4;
