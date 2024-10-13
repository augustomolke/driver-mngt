"use server";
import { signIn } from "@/auth";

export default async (prevState, formData) => {
  const result = await signIn("credentials", formData);
};
