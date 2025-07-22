import { useEffect, useState } from "react";
import type { PrayerTimes } from "../types/prayer";

interface PrayerProgressProps {
  currentPrayer: string;
  allPrayers: PrayerTimes;
}

export default function PrayerProgress({
  currentPrayer,
  allPrayers,
}: PrayerProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      const currentIndex = prayerOrder.indexOf(currentPrayer);

      if (currentIndex === -1) return 0;

      const currentPrayerTime = allPrayers[currentPrayer as keyof PrayerTimes];
      const [hours, minutes] = currentPrayerTime.split(":").map(Number);
      const prayerTimeInMinutes = hours * 60 + minutes;

      // Get next prayer
      const nextIndex = (currentIndex + 1) % prayerOrder.length;
      const nextPrayer = prayerOrder[nextIndex];
      const nextPrayerTime = allPrayers[nextPrayer as keyof PrayerTimes];
      const [nextHours, nextMinutes] = nextPrayerTime.split(":").map(Number);
      let nextPrayerTimeInMinutes = nextHours * 60 + nextMinutes;

      // Handle overnight transition
      if (nextPrayerTimeInMinutes < prayerTimeInMinutes) {
        nextPrayerTimeInMinutes += 24 * 60;
      }

      const totalDuration = nextPrayerTimeInMinutes - prayerTimeInMinutes;
      const elapsed = currentTime - prayerTimeInMinutes;

      const progressPercent = Math.max(
        0,
        Math.min(100, (elapsed / totalDuration) * 100)
      );
      setProgress(progressPercent);
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 60000);

    return () => clearInterval(interval);
  }, [currentPrayer, allPrayers]);

  const circumference = 2 * Math.PI * 80;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex justify-center">
      <div className="relative w-40 h-40">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 200 200"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-in-out"
          />
          {/* Progress dots */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = i * 60 - 90; // Start from top, 60 degrees apart
            const x = 100 + 80 * Math.cos((angle * Math.PI) / 180);
            const y = 100 + 80 * Math.sin((angle * Math.PI) / 180);
            const isActive = (progress / 100) * 6 > i;

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={
                  isActive
                    ? "rgba(255, 255, 255, 1)"
                    : "rgba(255, 255, 255, 0.3)"
                }
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
