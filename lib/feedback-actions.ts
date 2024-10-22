"use server";
import { auth } from "@/auth";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

const api_url = process.env.GSHEET_AUTH_API_URL;

export const createFeedbackAction = async (answers) => {
  const session = await auth();

  await fetchMutation(api.feedbacks.createFeedback, {
    answers: {
      ...answers,
      driver_id: session.user?.driverId.toString(),
    },
  });

  redirect("/logout");
};
