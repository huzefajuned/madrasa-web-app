import React from "react";
import { getPrayerIcon } from "../helpers/prayerIcons";
import { formatTimeOnly } from "../helpers/formatTime";
import type { PrayerTimes } from "../types/prayer";

interface Props {
  currentPrayer: string;
  allPrayers: PrayerTimes;
}

const PrayerTimeRow: React.FC<Props> = ({ currentPrayer, allPrayers }) => {
  return (
    <div className="flex justify-between items-center px-4">
      {Object.entries(allPrayers).map(([prayerName, prayerTime]) => {
        const isActive = prayerName === currentPrayer;
        const Icon = getPrayerIcon(prayerName);

        return (
          <div
            key={prayerName}
            className={` text-center  truncate flex flex-col justify-center items-center ${
              isActive ? " text-gray-50 " : "text-gray-300"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1               }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-xs opacity-75  ">{prayerName}</p>
            <p className={`text-sm`}>{formatTimeOnly(prayerTime)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PrayerTimeRow;
