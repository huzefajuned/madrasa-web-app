import { gradients, prayerNames } from "../helpers/prayerIcons";
import PrayerCard from "./Prayer";
import type { PrayerName, PrayerTimes } from "../types/prayer";

const Hero = ({ prayerTimes }: { prayerTimes: PrayerTimes }) => {
  return (
    <main className="px-4 py-6 space-y-4 mb-20">
      {prayerNames.map((prayer, index) => {
        const nextPrayer = prayerNames[index + 1] || prayerNames[0];
        const nextPrayerTime = prayerTimes[nextPrayer as PrayerName];

        return (
          <div key={prayer}>
            <PrayerCard
              prayer={prayer}
              nextPrayer={nextPrayer}
              nextPrayerTime={nextPrayerTime}
              gradient={gradients[prayer]}
              allPrayers={prayerTimes}
            />
          </div>
        );
      })}
    </main>
  );
};

export default Hero;
