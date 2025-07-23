"use client";

import { MapPin } from "lucide-react";
import { usePrayerStore } from "../store/store.prayer";
import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
export default function LocationHeader() {
  const [fetchLoc, setFetchLoc] = useState<boolean>(false);
  const { location, fetchLocation, isLoading } = usePrayerStore();

  useEffect(() => {
    setFetchLoc(false);
  }, [fetchLoc, setFetchLoc, isLoading, fetchLocation]);
  return (
    <header className="sticky top-0 z-50 px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between ">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <img src={logo} alt="logo" />
        </div>

        {/* Right side - Location */}
        <div className="flex items-center space-x-1 text-black cursor-pointer">
          <div className="text-right">
            <div className="text-sm font-bold ">
              {" "}
              <span className="text-md font-bold text-gray-900">
                Your location
              </span>
            </div>
            <div className="text-[10px] leading-tight flex items-center">
              <MapPin className="w-3 h-3 mr-0.5" />
              <div
                onClick={() => setFetchLoc(true)}
                className="text-[12px] leading-tight text-[#8A57DC]"
              >
                {fetchLoc ? (
                  "Detecting location..."
                ) : (
                  <>
                    {location?.city
                      ? `${location.city}, ${location.country}`
                      : "Detecting location..."}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
