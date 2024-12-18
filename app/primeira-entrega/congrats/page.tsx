import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Clock, CircleHelp } from "lucide-react";
import CancelBookingButton from "@/components/cancel-booking-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CircleCheckBig } from "lucide-react";
import getMap from "@/lib/getMap";
import pckg from "@/components/assets/picked-up-package.svg";
import Image from "next/image";
import FeedbackForm from "@/components/feedback-form";
import { getFirstTripBooking } from "@/lib/db/bookings";

const secret = process.env.SECRET;

const api_url = process.env.GSHEET_AUTH_API_URL;

const sevenDays = (bookedDate) => {
  const date = new Date(bookedDate);

  date.setDate(date.getDate() + 7);

  return {
    date,
    formatted: date.toLocaleDateString("pt-br", {
      day: "numeric",
      month: "long",
      weekday: "long",
    }),
  };
};

function stringParaDataPassada(dataStr) {
  // Mapeamento dos meses em português para os índices (0-11)
  const meses = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
  };

  // Regex para capturar dia, mês, ano e hora
  const regex = /(\d{1,2})\sde\s(\w+)\sàs\s(\d{2}):(\d{2})/;
  const match = dataStr.match(regex);

  if (!match) {
    throw new Error("Formato de data inválido");
  }

  const dia = parseInt(match[1], 10);
  const mes = meses[match[2].toLowerCase()];
  const anoAtual = new Date().getFullYear();
  const horas = parseInt(match[3], 10);
  const minutos = parseInt(match[4], 10);

  // Criação da data
  const dataInformada = new Date(anoAtual, mes, dia, horas, minutos);

  // Comparação com a data atual
  const agora = new Date();

  // Retorna true se a data informada já passou
  return dataInformada < agora;
}

export default async function () {
  const session = await auth();

  const user = session?.user;

  const booking = await getFirstTripBooking(session.user.driverId.toString());

  if (!booking) {
    redirect("/");
  }

  console.log(booking);

  const info = JSON.parse(booking.info);

  const instructions = info[3];

  const time = info[2];

  const mapInfo = await getMap(session?.user.station);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-4">
          <CircleCheckBig color="hsl(var(--green))" height={64} width={96} />
          Agendamento realizado com sucesso!
        </CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="mb-4">
          Compareça no endereço na data agendada, e dentro da janela de horário
          escolhida.
        </CardDescription>

        <CardDescription className="mb-4">
          Não se esqueça de concluir o treinamento disponível no App do
          Motorista, e garantir que possui os equipamentos necessários.{" "}
          <strong>
            Sem isso, não será permitida a entrada nos estabelecimentos
          </strong>
        </CardDescription>

        {instructions ? (
          <>
            <div className="flex items-center justify-start mb-2 gap-8">
              <CircleHelp />
              <p className="text-base max-w-[10rem]">
                <strong>Instruções do Hub:</strong> <br />
                {instructions}
              </p>
            </div>
            <Separator className="my-2" />
          </>
        ) : null}

        <div className="flex items-center justify-start mb-2 gap-8">
          <Calendar />
          <p className="text-base max-w-[10rem]">
            <strong>Data:</strong> <br />
            {new Date(booking?.date).toLocaleDateString("pt-br", {
              day: "numeric",
              month: "long",
              weekday: "long",
            })}
          </p>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-start mb-2 gap-8">
          <Clock />
          <p className="text-base max-w-[10rem]">
            <strong>Horário:</strong> <br />
            {`De ${time}`}
          </p>
        </div>

        <Separator className="my-2" />

        <a
          href={`http://maps.google.com/?q=${mapInfo.latitude},${mapInfo.longitude}`}
          target="_blank"
        >
          <div className="flex items-center justify-start mb-2 gap-8">
            <MapPin />
            <p className="text-base max-w-[10rem]">
              <strong>Endereço:</strong> <br />
              {mapInfo.address}
            </p>
          </div>
        </a>
        <div className="flex flex-col justify-center items-center">
          <a
            href={`http://maps.google.com/?q=${mapInfo.latitude},${mapInfo.longitude}`}
            target="_blank"
          >
            <img
              src={mapInfo.map}
              alt="Mapa"
              className="border-[--background] border-2 rounded-lg"
            />
          </a>
          <div className="flex justify-end w-full">
            <span className="text-xs italic mr-8">
              *Região de atuação aproximada
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <CancelBookingButton
          driverId={session?.user.driverId}
          bookingId={booking.id}
          station={session?.user.station}
          phone={session?.user.phone}
          pastDate={booking.date < new Date()}
        />
      </CardFooter>
    </Card>
  );
}
