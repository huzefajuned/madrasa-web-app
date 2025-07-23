import { gradients, prayerNames } from "../helpers/prayerIcons";
import PrayerCard from "./Prayer";
import type { PrayerName, PrayerTimes } from "../types/prayer";
import { parse, isBefore, isAfter } from "date-fns";

const Hero = ({ prayerTimes }: { prayerTimes: PrayerTimes }) => {
  const getCurrentPrayer = () => {
    const now = new Date();

    // Go through all prayers in order and find the current one
    for (let i = 0; i < prayerNames.length; i++) {
      const currentPrayer = prayerNames[i] as PrayerName;
      const nextPrayer = prayerNames[i + 1] as PrayerName | undefined;

      const currentTime = parse(
        prayerTimes[currentPrayer],
        "HH:mm",
        new Date()
      );
      const nextTime = nextPrayer
        ? parse(prayerTimes[nextPrayer], "HH:mm", new Date())
        : null;

      // If now is after current time and before next prayer (or no next)
      if (isAfter(now, currentTime) && (!nextTime || isBefore(now, nextTime))) {
        return {
          prayer: currentPrayer,
          nextPrayer: nextPrayer || prayerNames[0],
        };
      }
    }

    // Fallback to last prayer
    return {
      prayer: prayerNames[prayerNames.length - 1] as PrayerName,
      nextPrayer: prayerNames[0] as PrayerName,
    };
  };

  const { prayer, nextPrayer } = getCurrentPrayer();
        const nextPrayerTime = prayerTimes[nextPrayer as PrayerName];
  const gradient = gradients[prayer];

  return (
    <main className="px-4 py-6 space-y-4 mb-20">
      <PrayerCard
        prayer={prayer}
        nextPrayer={nextPrayer}
        nextPrayerTime={nextPrayerTime}
        gradient={gradient}
        allPrayers={prayerTimes}
      />
    </main>
  );
};

export default Hero;
