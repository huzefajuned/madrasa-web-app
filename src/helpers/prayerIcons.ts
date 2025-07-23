import { Sun, Moon, Sunrise, Sunset, Star } from "lucide-react";

// prayerNames
export const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export const gradients: Record<string, string> = {
  Fajr: "from-sky-600 to-blue-300",
  Dhuhr: "from-yellow-600 to-yellow-400",
  Asr: "from-lime-600 to-green-400",
  Maghrib: "from-orange-600 to-pink-400",
  Isha: "from-indigo-700 to-purple-600",
};

export const prayerIcons = {
  Fajr: Sunrise,
  Dhuhr: Sun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon,
};

export const getPrayerIcon = (prayer: string) =>
  prayerIcons[prayer as keyof typeof prayerIcons] || Star;
