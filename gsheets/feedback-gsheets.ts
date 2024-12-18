"use server";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import {
  ServerActionError,
  createServerAction,
} from "@/lib/actions/action-utils";
import { redirect } from "next/navigation";

const url = process.env.GSHEET_PREFERENCES_URL;
const secret = process.env.SECRET;

export const saveFeedback = createServerAction(async (data) => {
  const body = JSON.stringify({
    method: "POST",
    sheet: "feedbacks",
    key: secret,
    payload: data,
  });

  const result = await fetch(url, {
    method: "POST",
    body,
  });

  const location = await result.json();

  const { status } = location;

  if (status != 200) {
    throw new ServerActionError("Erro");
  }
});
