import React from "react";

import { useProgress } from "@/context/ProgressContext";
import { showToast } from "@/helpers/toast";
import { StorageService } from "@/services/storage";

const Settings = () => {
  const { setProgress } = useProgress();

  const handleResetProgress = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all progress? This cannot be undone.",
    );

    if (confirmed) {
      // Reset to initial state
      const initialState = {
        xp: 0,
        streak: 0,
        completedLessons: {},
        currentLesson: null,
        lastActive: new Date().toISOString(),
      };

      setProgress(initialState);
      StorageService.setProgress(initialState);
      showToast.resetProgress();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Reset Progress</h2>
        <p className="text-gray-600 mb-4">
          This will reset all your progress, including completed lessons and XP.
          This action cannot be undone.
        </p>
        <button
          onClick={handleResetProgress}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
};

export default Settings;
