"use server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const session = await auth();
  return session;
}

export async function signOutAction() {
  redirect("/logout");
}
