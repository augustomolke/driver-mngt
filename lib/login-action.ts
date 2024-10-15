"use server";
import { signIn } from "@/auth";

export default async (formData) => {
  await signIn("credentials", formData);
};
