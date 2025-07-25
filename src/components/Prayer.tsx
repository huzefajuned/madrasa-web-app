import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import type { PrayerTimes } from "../types/prayer";
import { getPrayerIcon } from "../helpers/prayerIcons";
import { getTimeUntilNext } from "../helpers/getTimeUntilNext";
import PrayerProgress from "./Process";
import PrayerTimeRow from "./PrayerTimeRow";

interface PrayerCardProps {
  prayer: string;
  nextPrayer: string;
  nextPrayerTime: string;
  gradient: string;
  allPrayers: PrayerTimes;
}

const PrayerCard: React.FC<PrayerCardProps> = ({
  prayer,
  nextPrayerTime,
  gradient,
  allPrayers,
}) => {
  const [timeUntilNext, setTimeUntilNext] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      setCurrentDay(format(new Date(), "EEEE"));
      setTimeUntilNext(getTimeUntilNext(nextPrayerTime));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [nextPrayerTime]);

  const Icon = getPrayerIcon(prayer);

  return (
    <div
      className={`relative overflow-hidden bg-teal-950 rounded-2xl bg-gradient-to-br max-h-72 max-w-[350px] ${gradient} mx-auto  p-4 text-white shadow-lg`}
    >
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-6 w-full">
        <div className="flex items-center space-x-3 m-2">
          <div className=" w-full">
           <div className="flex
            flex-row items-center gap-2">
             <Icon className="w-7 h-7" />

            <h2 className="text-2xl font-bold">{prayer}</h2>
           </div>
            <p className="text-sm opacity-90 flex w-full">
              <p> Next prayer in {timeUntilNext}</p>
            </p>
          </div>
        </div>
        <div className="text-right relative">
          <p className="text-sm opacity-90 absolute bottom-0 right-0 bg-[#FFFFFF45] px-3 py-1 rounded-full">
            {currentDay}
          </p>
        </div>
      </div>

      {/* Prayer Times Row */}
      <PrayerTimeRow currentPrayer={prayer} allPrayers={allPrayers} />

      {/* Progress */}
      <PrayerProgress currentPrayer={prayer} allPrayers={allPrayers} />
    </div>
  );
};

export default PrayerCard;
