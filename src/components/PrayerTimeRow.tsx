import React from "react";
import { getPrayerIcon } from "../helpers/prayerIcons";
import { formatTime } from "../helpers/formatTime";
import type { PrayerTimes } from "../types/prayer";

interface Props {
  currentPrayer: string;
  allPrayers: PrayerTimes;
}

const PrayerTimeRow: React.FC<Props> = ({ currentPrayer, allPrayers }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {Object.entries(allPrayers).map(([prayerName, prayerTime]) => {
        const isActive = prayerName === currentPrayer;
        const Icon = getPrayerIcon(prayerName);

        return (
          <div key={prayerName} className="text-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                isActive ? "bg-white bg-opacity-30" : "bg-white bg-opacity-10"
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-xs opacity-75 mb-1">{prayerName}</p>
            <p className={`text-sm font-medium ${isActive ? "text-white" : "opacity-90"}`}>
              {formatTime(prayerTime)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PrayerTimeRow;
