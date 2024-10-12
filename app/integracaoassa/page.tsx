import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleCheckBig } from "lucide-react";
import DeliveryIlustration from "@/components/assets/delivery";
import { cn } from "@/lib/utils";
import html from "./teste.html";

export default async function Integracao() {
  //   return (
  //     <section className="h-100 flex justify-center items-center">
  //       <Accordion
  //         type="single"
  //         collapsible
  //         className="w-full sm:max-w-[70%]  text-primary"
  //       >
  //         <div>
  //           <AccordionItem
  //             value="step-1"
  //             className={cn(
  //               "my-2 bg-foreground  rounded-lg px-3",
  //               "bg-foreground",
  //               "mt-6"
  //             )}
  //           >
  //             <AccordionTrigger>
  //               <div className="w-full">
  //                 <div className="flex items-center gap-4 relative">
  //                   <CircleCheckBig
  //                     className="animate-pulse"
  //                     color="#26AA99"
  //                     size="48"
  //                   />
  //                   <div className="absolute text-white top-[-40px]">Passo 1</div>
  //                   <h1 className="text-lg text-[#26AA99] no-underline">
  //                     Cadastro aprovado!
  //                   </h1>
  //                 </div>
  //               </div>
  //             </AccordionTrigger>
  //             <AccordionContent>
  //               <div
  //                 className={
  //                   "flex flex-col justify-center items-center lg:flex-row "
  //                 }
  //               >
  //                 <p className="text-center text-base mb-2">
  //                   Agora <strong>faltam poucos passos</strong> para você começar
  //                   a realizar as entregas.
  //                 </p>
  //                 <DeliveryIlustration />
  //               </div>

  //               {/* {#if step.buttonLabel}
  //                 <div className={"flex justify-end " + step.buttonclassName || ""}>
  //                   <Button
  //                     id={`step${step.id}`}
  //                     href={`#step${step.id + 1}`}
  //                     on:click={() => {
  //                       current.set(`#step${step.id + 1}`);
  //                     }}
  //                   >
  //                     {step.buttonLabel}
  //                   </Button>
  //                 </div>
  //               {/if} */}
  //             </AccordionContent>
  //           </AccordionItem>
  //         </div>
  //       </Accordion>
  //     </section>
  //   );

  return <div>não</div>;
}
