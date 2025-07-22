import { Sun, Moon, Sunrise, Sunset, Star } from "lucide-react";

// prayerNames
export const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export const gradients: Record<string, string> = {
  Fajr: "from-sky-400 to-blue-600",
  Dhuhr: "from-yellow-300 to-yellow-500",
  Asr: "from-lime-400 to-green-600",
  Maghrib: "from-orange-400 to-pink-500",
  Isha: "from-indigo-500 to-purple-700",
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
