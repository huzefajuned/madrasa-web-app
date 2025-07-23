import type { NavItemType } from "../types/nav";


const NavItem = ({ item, isActive }: { item: NavItemType; isActive: boolean }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-xs ${
        item.name === "" && "bg-[#6D2DD3]  h-12 w-12 rounded-full"
      }`}
    >
      <div
        className={`w-6 h-6 mb-1  ${
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
