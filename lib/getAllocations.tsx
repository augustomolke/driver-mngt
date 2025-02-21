"use server";
import { unstable_cache } from "next/cache";

const secret = process.env.SECRET;

const api_url = process.env.ALLOCATIONS_API;

export default async function (driver_id) {
  const body = JSON.stringify({
    method: "GET",
    key: secret,
    sheet: "allocations",
    filter: { driver_id, all: true },
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
}

export const getCrowdSelection = async (driver_id) => {
  const body = JSON.stringify({
    method: "GET",
    key: secret,
    sheet: "allocations_crowdsourcing",
    filter: { driver_id, all: true },
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

export const getCrowdSourcingCluster = async () => {
  const bodyCrowd = JSON.stringify({
    method: "GET",
    key: secret,
    sheet: "crowdsourcing",
  });

  const bodyAlloc = JSON.stringify({
    method: "GET",
    key: secret,
    sheet: "allocations_crowdsourcing",
  });

  const [resultCrowd, resultAlloc] = await Promise.all([
    fetch(api_url, {
      method: "POST",
      body: bodyCrowd,
    }),
    fetch(api_url, {
      method: "POST",
      body: bodyAlloc,
    }),
  ]);

  const [clusters, allocated] = await Promise.all([
    resultCrowd.json(),
    resultAlloc.json(),
  ]);

  const openClusters = clusters.data.filter((cluster) => {
    const found = !!allocated.data.find(
      (a) => a.chosen_cluster == cluster.Cluster && a.shift == cluster.shift
    );

    return !found;
  });

  return openClusters;
};
