"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export default async (formData) => {
  try {
    await signIn("credentials", formData);
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    if (err.message.split(".")[0] == "Driver ID não encontrado") {
      redirect("/error?message=WrongId");
    }

    if (err.message.split(".")[0] == "Telefone Incorreto") {
      redirect("/error?message=WrongPhone");
    }

    if (
      err.message.split(".")[0] ==
      "São os 4 últimos dígitos do seu telefone cadastrado"
    ) {
      redirect("/error?message=WrongPhone");
    }

    redirect("/error?message=Unknown");
  }
};
