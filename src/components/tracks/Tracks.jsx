// Displays available learning tracks
// Each track represents a different area of plant knowledge
import { BookOpen, Flower2, Trees } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { showToast } from "@/helpers/toast";

// Track configuration with visual styles
// Each track represents a different learning path (botany, gardening, foraging)
const TRACKS = [
  {
    id: "botany",
    title: "General Botany",
    description: "Foundation of plant science and biology",
    icon: BookOpen,
    gradient: "from-blue-50 to-emerald-50",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    inDevelopment: false,
  },
  {
    id: "garden",
    title: "Garden & Landscape",
    description:
      "Practical knowledge for growing and maintaining a beautiful garden",
    icon: Flower2,
    gradient: "from-rose-50 to-emerald-50",
    borderColor: "border-rose-200",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    inDevelopment: true,
  },
  {
    id: "foraging",
    title: "Wild Plants & Foraging",
    description:
      "Learn to safely identify and utilize wild edible and medicinal plants",
    icon: Trees,
    gradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    inDevelopment: true,
  },
];

// Entry point for learning tracks
// Displays available tracks with visual distinction and progress
const Tracks = () => {
  const navigate = useNavigate();

  const handleTrackClick = (track) => {
    if (track.inDevelopment) {
      showToast.unimplemented();
      return;
    }
    navigate(`${ROUTES.TRACKS}/${track.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Learning Tracks</h1>

      <div className="space-y-4">
        {TRACKS.map((track) => (
          <div
            key={track.id}
            onClick={() => handleTrackClick(track)}
            className={`bg-white rounded-lg p-4 border ${track.borderColor} shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              track.inDevelopment ? "opacity-50" : ""
            }`}
          >
            <div className="flex gap-4">
              <div
                className={`w-12 h-12 ${track.iconBg} rounded-lg flex items-center justify-center`}
              >
                <track.icon className={`w-6 h-6 ${track.iconColor}`} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{track.title}</h2>
                  {!track.inDevelopment && (
                    <BookOpen className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {track.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracks;
