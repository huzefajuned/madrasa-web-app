import React from "react";
import type { NavItemType } from "../types/nav";

interface Props {
  item: NavItemType;
  isActive: boolean;
}

const NavItem: Props = ({ item, isActive }) => {
  return (
    <div className="flex flex-col items-center justify-center text-xs">
      <div
        className={`w-6 h-6 mb-1 ${
          isActive ? "text-purple-600" : "text-gray-400"
        }`}
      >
        <img src={item.icon} alt="item.icon" />
      </div>
      <span
        className={isActive ? "text-purple-600 font-semibold" : "text-gray-400"}
      >
        {item.name}
      </span>
    </div>
  );
};

export default NavItem;
