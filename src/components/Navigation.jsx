import { Home, Book, Settings } from "lucide-react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

// Navigation items with their routes and icons
const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    route: ROUTES.HOME,
  },
  {
    id: "tracks",
    label: "Tracks",
    icon: Book,
    route: ROUTES.TRACKS,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    route: ROUTES.SETTINGS,
  },
];

// Bottom navigation bar for main app sections
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.route;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className={`flex flex-col items-center p-2 ${
                isActive ? "text-emerald-600" : "text-gray-500"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
