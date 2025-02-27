import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compareArrays(array1, array2) {
  if (!array1 || !array2) return false;
  return (
    array1.length === array2.length &&
    array1.every(function (value, index) {
      return value === array2[index];
    })
  );
}

export function hasEventEnded(startDate: Date, durationMs: number) {
  if (!(startDate instanceof Date) || isNaN(startDate)) {
    throw new Error("Invalid start date");
  }
  if (typeof durationMs !== "number" || durationMs < 0) {
    throw new Error("Invalid duration");
  }

  const eventEndTime = startDate.getTime() + durationMs * 1000 * 60;

  return new Date() > new Date(eventEndTime);
}

export function isLaterThan(hour: number, day = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    hour12: false,
  });
  const currentHour = parseInt(formatter.format(day));
  return currentHour >= hour;
}
