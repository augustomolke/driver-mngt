"use server";

import { redirect } from "next/navigation";

const secret = process.env.SECRET;

const api_url = process.env.ALLOCATIONS_API;

export const getCurrentCrowdSelection = async (driver_id) => {
  const body = JSON.stringify({
    method: "GET",
    key: secret,
    sheet: "allocations_crowdsourcing",
    filter: { driver_id },
  });

  const result = await fetch(api_url, {
    method: "POST",
    body,
  });

  try {
    const { data } = await result.json();
    return data;
  } catch {
    return [];
  }
};

export const saveCurrentCrowdSelection = async (driver_id, key) => {
  const body = JSON.stringify({
    method: "GET",
    key: secret,
    sheet: "allocations_crowdsourcing",
    filter: { key },
  });

  const result = await fetch(api_url, {
    method: "POST",
    body,
  });

  const currentList = await result.json();

  if (currentList.status == 400) {
    const [cluster, shift] = key.split("_");

    const body = JSON.stringify({
      method: "POST",
      key: secret,
      sheet: "allocations_crowdsourcing",
      payload: {
        driver_id,
        chosen_cluster: cluster,
        shift,
        timestamp: new Date().toISOString(),
        key,
      },
    });

    const result = await fetch(api_url, {
      method: "POST",
      body,
    });
  } else {
    throw new Error("Erro");
  }
};
