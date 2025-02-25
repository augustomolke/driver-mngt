import React from "react";
import { WalletCards } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import img1 from "@/components/assets/carroselgif3.gif";
import img2 from "@/components/assets/carosselgif4.gif";
import img3 from "@/components/assets/gifHere.gif";
import img4 from "@/components/assets/googleplay.png";
import deliveryIllustration from "@/components/assets/gifDocument.gif";

const images = [img1, img2];

const icons = [
  {
    src: img3
  },
  {
    src: img4,
    link: "https://play.google.com/store/apps/details?id=com.shopee.br",
  },
];

const slidesText = [
  {
    title: "Vamos Começar?",
  },
  {
    title: "Acessando a ShopeePay",
    text: "A ShopeePay está disponível no app Shopee (o mesmo que você usa para fazer as suas comprinhas) que pode ser encontrado na Play Store.",
  },
];

export const Title = () => (
  <div className="flex items-center space-x-2">
    <WalletCards className="size-10" style={{ color: "#EE4D2D" }} />
    <span className="font-semibold" style={{ color: "#EE4D2D" }}>
      ShopeePay
    </span>
  </div>
);

export const Content = () => (
  <div className="p-4">
    <div className="mt-4 w-full max-w-2xl mx-auto">
      <p style={{ color: "#EE4D2D" }}>
        A ShopeePay <strong> é um serviço de carteira digital </strong> oferecido
        pela Shopee por onde os Motoristas Parceiros{" "}
        <strong> recebem seus ganhos </strong>
      </p>
      <p
        style={{ color: "#EE4D2D" }}
        className="border-2 border-solid border-[#EE4D2D] text-center p-2 rounded-md my-2"
      >
        O cadastro na ShopeePay deve estar no{" "}
        <strong> mesmo nome e telefone do cadastro realizado no Driver App </strong>
        (aplicativo de entregas)
      </p>

      <div className="flex justify-center">
        <Carousel className="w-full max-w-[450px]">
          <CarouselContent>
            {Array.from({ length: 4 }).map((_, index) => {
              const slideNumber = index + 1;
              const slideContent = slideNumber <= 2 ? (
                <div className="flex flex-col items-start justify-center h-full px-4">
                  <h3 className="text-xl font-bold mb-2">
                    {slidesText[slideNumber - 1].title}
                  </h3>
                  <p className="text-[#EE4D2D] mr-4">
                    {slidesText[slideNumber - 1].text}
                  </p>
                  <div className="mt-4 w-full max-w-[120px]">
                    <a href={icons[slideNumber - 1].link} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={icons[slideNumber - 1].src}
                        alt={`Imagem do slide ${slideNumber}`}
                        width={120}
                        height={50}
                        className="w-full rounded-lg object-cover"
                        style={{
                          mixBlendMode: "multiply",
                        }}
                      />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    src={images[slideNumber - 3]}
                    alt={`Slide ${slideNumber}`}
                    fill
                    className="object-contain"
                  />
                </div>
              );

              return (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-square items-center justify-center p-4 min-h-[300px]">
                      {slideContent}
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex flex-col md:flex-row p-4 md:p-10 items-center">
        <div className="md:pt-14 md:pr-4">
          <div style={{ color: "#EE4D2D" }}>
            Já estamos quase finalizando! Agora você só precisa completar{" "}
            <strong> sua verificação de identidade</strong>
          </div>
          <div style={{ color: "#EE4D2D" }}>
            Faça a verificação facial e insira uma foto do seu documento de
            identificação. Não pule nenhuma etapa, pois{" "}
            <strong>
              sem o cadastro completo da ShopeePay não será possível começar as
              entregas
            </strong>
          </div>
        </div>
        <Image
          src={deliveryIllustration}
          alt="Delivery illustration"
          className="max-w-xs w-full md:w-80 mt-4 md:mt-0"
        />
      </div>

      <div className="flex justify-center p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Ativei minha conta ShopeePay!</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Você tem certeza?</DialogTitle>
              <DialogDescription>
                Não pule nenhuma etapa, pois sem o cadastro completo da ShopeePay não será possível começar as entregas.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button variant="outline" >
                  Minha carteira ShopeePay está ativa!
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>
);

const Step3 = { Title, Content };
export default Step3;