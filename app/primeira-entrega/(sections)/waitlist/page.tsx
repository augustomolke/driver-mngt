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
import { NoSpotsCard } from "@/components/no-spots-card";

export default async function () {
  return <NoSpotsCard />;
}
