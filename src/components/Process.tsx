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
    const updateProgress = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      const currentIndex = order.indexOf(currentPrayer);
      if (currentIndex === -1) return;

      const [ch, cm] = allPrayers[currentPrayer as keyof PrayerTimes]
        .split(":")
        .map(Number);
      const currentPrayerMin = ch * 60 + cm;

      const next = order[(currentIndex + 1) % order.length];
      const [nh, nm] = allPrayers[next as keyof PrayerTimes]
        .split(":")
        .map(Number);
      let nextPrayerMin = nh * 60 + nm;

      if (nextPrayerMin < currentPrayerMin) nextPrayerMin += 24 * 60;

      const total = nextPrayerMin - currentPrayerMin;
      const elapsed = currentMinutes - currentPrayerMin;

      const percent = Math.max(0, Math.min(100, (elapsed / total) * 100));
      setProgress(percent);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000);
    return () => clearInterval(interval);
  }, [currentPrayer, allPrayers]);

  // Arc settings
  const radius = 80;
  const circumference = Math.PI * radius; // Half circle
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full flex justify-center">
      <svg viewBox="0 0 200 100" className="w-full max-w-xs ">
        {/* Track */}
        <path
          d="M20,100 A80,80 0 0,1 180,100"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="12"
        />
        {/* Progress */}
        <path
          d="M20,100 A80,80 0 0,1 180,100"
          fill="none"
          stroke="white"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out"
        />
        {/* Dots */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = Math.PI * (i / 5); // 0 to π
          const x = 100 + radius * Math.cos(angle - Math.PI);
          const y = 100 + radius * Math.sin(angle - Math.PI);
          const active = (progress / 100) * 5 >= i;

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              fill={active ? "white" : "rgba(255,255,255,0.3)"}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>
    </div>
  );
}
