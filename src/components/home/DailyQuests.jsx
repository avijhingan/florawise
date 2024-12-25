import { Target } from "lucide-react";
import React from "react";

import { showToast } from "@/helpers/toast";

const DAILY_QUESTS = [
  {
    id: "lessons",
    title: "Complete 3 Lessons",
    progress: 0,
    target: 3,
    xp: 50,
  },
  {
    id: "streak",
    title: "Maintain Your Streak",
    progress: 0,
    target: 1,
    xp: 25,
  },
];

const DailyQuests = () => {
  const handleQuestClick = () => {
    showToast.unimplemented();
  };

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 opacity-50 cursor-pointer"
      onClick={handleQuestClick}
    >
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-emerald-500" />
        <h2 className="font-semibold">Daily Quests</h2>
      </div>

      <div className="space-y-3">
        {DAILY_QUESTS.map((quest) => (
          <div
            key={quest.id}
            className="p-3 rounded-lg border border-gray-200 flex justify-between items-center"
          >
            <span>{quest.title}</span>
            <span className="text-emerald-600">+{quest.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyQuests;
