export function getCurrentWeekDates() {
  const today = new Date();

  // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDayOfWeek = today.getDay();

  // Calculate the first day of the week (Sunday)
  const currentDate = new Date(today);
  currentDate.setDate(today.getDate() + 2);

  // Calculate the last day of the week (Saturday)
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (6 - currentDayOfWeek) + 14);

  return {
    currentDate, // Format: YYYY-MM-DD
    endDate, // Format: YYYY-MM-DD
  };
}
