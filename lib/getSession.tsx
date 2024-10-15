"use server";
import { auth, signOut } from "@/auth";

export async function getCurrentUser() {
  const session = await auth();
  return session;
}

export async function signOutAction() {
  "use server";
  await signOut();
}
