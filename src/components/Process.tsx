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

  // Arc properties
  const arcCount = 5;
  const filledArcs = Math.round((progress / 100) * arcCount);

  // These are the precomputed paths for each 25° arc slice (you can pre-generate or use polar to cartesian)
  const arcPaths = [
    // Leftmost arc
    "M36.7 97.17 A125 125 0 0 1 61.92 61.3",
    "M73.82 50.9 A125 125 0 0 1 112.72 30.7",
    "M128.08 26.94 A125 125 0 0 1 171.92 26.94",
    "M187.28 30.7 A125 125 0 0 1 226.18 50.9",
    "M238.08 61.3 A125 125 0 0 1 263.29 97.17",
  ];

  return (
    <div className="overflow-clip -mx-12 -mt-4 -mb-1">
      <svg viewBox="0 0 300 100" className="bg-transparent w-full">
        {arcPaths.map((d, i) => (
          <g key={i}>
            {/* Background arc (dimmed) */}
            <path
              d={d}
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="11.875"
              fill="none"
              strokeLinecap="round"
            />
            {/* Foreground arc (active fill) */}
            {i < filledArcs && (
              <path
                d={d}
                stroke="white"
                strokeWidth="11.875"
                fill="none"
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
