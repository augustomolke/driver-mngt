"use server";
import { auth } from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/db";

const api_url = process.env.GSHEET_AUTH_API_URL;

export const createFeedbackAction = async (answers) => {
  const session = await auth();

  await prisma.feedbacks.create({
    data: { ...answers, driver_id: session.user?.driverId.toString() },
  });

  redirect("/logout");
};
