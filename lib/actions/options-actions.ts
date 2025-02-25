"use server";

import { saveOptions } from "../db/options";

export const saveOptionsAction = async (options: string) => {
  await saveOptions(options);
};
