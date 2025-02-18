"use server";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { saveOptions } from "../db/options";

export const saveOptionsAction = async (options: string) => {
  await saveOptions(options);
};
