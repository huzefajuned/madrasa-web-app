import { format, parseISO, addDays, differenceInMinutes } from "date-fns";

export const getTimeUntilNext = (nextPrayerTime: string): string => {
  const now = new Date();
  const today = format(now, "yyyy-MM-dd");
  let nextPrayerDateTime = parseISO(`${today}T${nextPrayerTime}:00`);

  if (nextPrayerDateTime <= now) {
    nextPrayerDateTime = addDays(nextPrayerDateTime, 1);
  }

  const minutesUntil = differenceInMinutes(nextPrayerDateTime, now);

  if (minutesUntil > 60) {
    const hours = Math.floor(minutesUntil / 60);
    const minutes = minutesUntil % 60;
    return `${hours}h ${minutes}m`;
  }
  return `${minutesUntil}m`;
};
