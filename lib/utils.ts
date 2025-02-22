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
  const nowInSaoPaulo = new Date().toLocaleString("en-US", {
    timeZone: "America/Sao_Paulo",
  });
  const eventEndTimeInSaoPaulo = new Date(eventEndTime).toLocaleString(
    "en-US",
    { timeZone: "America/Sao_Paulo" }
  );

  return new Date(nowInSaoPaulo) > new Date(eventEndTimeInSaoPaulo);
}

export function getTodayAndTomorrowInSaoPaulo() {
  const now = new Date();
  const options = {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const todayStr = new Intl.DateTimeFormat("en-CA", options).format(now);
  const today = new Date(`${todayStr}T00:00:00-03:00`);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    startDate: today,
    endDate: tomorrow,
  };
}
