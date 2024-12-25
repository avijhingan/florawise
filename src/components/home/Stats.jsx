// Stats: Displays user statistics and achievements
// Currently shows streak information, will be expanded for more stats
import { Flame } from "lucide-react";
import React from "react";

import { useProgress } from "@/context/ProgressContext";
import { showToast } from "@/helpers/toast";

const Stats = () => {
  const { progress } = useProgress();

  const handleClick = () => {
    showToast.unimplemented();
  };

  return (
    <div
      className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm cursor-pointer opacity-50"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-orange-50 p-2 rounded-full">
          <Flame className="w-4 h-4 text-orange-500" />
        </div>
        <h2 className="font-semibold text-gray-900">
          {progress.streak} Day Streak
        </h2>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${((progress.streak % 7) / 7) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Stats;
