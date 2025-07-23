import React from "react";
import NavItem from "./NavItem";
import type { NavItemType } from "../types/nav";
import Home from "../assets/Home.svg";
import Quran from "../assets/Quran.svg";
import Frame from "../assets/Frame.svg";
import Maktab from "../assets/Maktab.svg";
import Dua from "../assets/Dua.svg";

const navItems: NavItemType[] = [
  {
    name: "Home",
    path: "/home",
    icon: Home,
  },
  {
    name: "Quran",
    path: "/quran",
    icon: Quran,
  },
  {
    name: "",
    path: "/plus",
    icon: Frame,
  },
  {
    name: "Maktab",
    path: "/maktab",
    icon: Maktab,
  },
  {
    name: "Dua",
    path: "/dua",
    icon: Dua,
  },
];

const BottomNav: React.FC = () => {
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-white  flex justify-between items-center px-8 py-2 md:hidden z-50`}
    >
      {navItems.map((item: NavItemType, idx) => {
        const isActive = location.pathname === item.path;
        return <NavItem key={idx} item={item} isActive={isActive} />;
      })}
    </nav>
  );
};

export default BottomNav;
