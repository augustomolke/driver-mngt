import { unstable_cache } from "next/cache";

const EVENTS_API_URL = process.env.EVENTS_API || "";
const SECRET = process.env.SECRET || "";

export const getFirstTripBooking = async (driver_id) => {
  const body = JSON.stringify({
    method: "GET",
    sheet: "bookings",
    key: SECRET,
    filter: { driver_id, event_id: "first-trip-sem-data" },
  });

  const result = await fetch(EVENTS_API_URL, {
    method: "POST",
    body,
  });

  const booking = await result.json();

  return booking.data;
};

export const getAvailability = unstable_cache(
  async (driver_id) => {
    const body = JSON.stringify({
      method: "GET",
      sheet: "availability",
      key: SECRET,
      filter: { driver_id, all: true, unordered: true, limit: 3 },
      order: "desc",
    });

    const result = await fetch(EVENTS_API_URL, {
      method: "POST",
      body,
    });

    const booking = await result.json();

    return booking.data.map((b) => ({
      ...b,
      info: JSON.parse(b.info),
      date: new Date(b.date).toLocaleDateString("en-GB", {
        timeZone: "America/Sao_Paulo",
      }),
    }));
  },
  ["availability"],
  {
    revalidate: 1800,
    tags: ["availability"],
  }
);

export const createBooking = async (bookings) => {
  const body = JSON.stringify(
    bookings.map((payload) => ({
      method: "POST",
      sheet: "bookings",
      key: SECRET,
      payload,
    }))
  );

  const result = await fetch(EVENTS_API_URL, {
    method: "POST",
    body,
  });
};

export const deleteBooking = async (ids) => {
  const body = ids.map((id) =>
    JSON.stringify({
      method: "DELETE",
      sheet: "bookings",
      key: SECRET,
      id,
    })
  );

  const result = await fetch(EVENTS_API_URL, {
    method: "POST",
    body,
  });

  const booking = await result.json();

  return booking.data;
};

export const createAvailability = async (bookings) => {
  const body = JSON.stringify(
    bookings.map((payload) => ({
      method: "POST",
      sheet: "availability",
      key: SECRET,
      payload,
    }))
  );

  const result = await fetch(EVENTS_API_URL, {
    method: "POST",
    body,
  });
};

export const deleteAvailability = async (ids) => {
  const body = ids.map((id) =>
    JSON.stringify({
      method: "DELETE",
      sheet: "availability",
      key: SECRET,
      id,
    })
  );

  const result = await fetch(EVENTS_API_URL, {
    method: "POST",
    body,
  });

  const booking = await result.json();

  return booking.data;
};

export const updateAvailability = async (updates) => {
  const body = JSON.stringify(
    updates.map(({ id, payload }) => ({
      method: "PUT",
      sheet: "availability",
      key: SECRET,
      id,
      payload,
    }))
  );

  const result = await fetch(EVENTS_API_URL, {
    method: "POST",
    body,
  });
};
