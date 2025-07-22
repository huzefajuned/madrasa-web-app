"use client";

import { MapPin } from "lucide-react";
import { usePrayerStore } from "../store/store.prayer";
import logo from "../assets/logo.svg";
export default function LocationHeader() {
  const { location } = usePrayerStore();
    console.log("location in header :", location)
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <img src={logo} alt="logo" />
        </div>

        {/* Right side - Location */}
        <div className="flex items-center space-x-1 text-black cursor-pointer">
          <div className="text-right">
            <div className="text-sm font-bold ">
              {" "}
              {/* <span className="text-sm font-medium text-gray-900"> */}
                {location?.city
                  ? `${location.city}, ${location.country}`
                  : "Detecting location..."}
             
            </div>
            <div className="text-[10px] leading-tight flex items-center">
              <MapPin className="w-3 h-3 mr-0.5" />
              <div className="text-[12px] leading-tight text-[#8A57DC]">
                Get accurate namaz time
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
