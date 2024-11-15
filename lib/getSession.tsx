"use server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function signOutAction() {
  redirect("/logout");
}
