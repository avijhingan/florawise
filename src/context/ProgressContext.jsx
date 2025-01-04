// Context for managing user progress throughout the application
import React, { createContext, useContext, useState } from "react";

import { StorageService } from "@/services/storage";

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    // Load initial state from storage or use defaults
    return (
      StorageService.getProgress() || {
        completedLessons: {},
        xp: 0,
        streak: 0,
        currentLesson: null,
        lastActive: new Date().toISOString(),
      }
    );
  });

  const addXP = (amount) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        xp: prev.xp + amount,
      };
      StorageService.setProgress(newProgress);
      return newProgress;
    });
  };

  const completeLesson = (lessonId) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        completedLessons: {
          ...prev.completedLessons,
          [lessonId]: {
            completed: true,
            completedAt: new Date().toISOString(),
          },
        },
        xp: prev.xp + 50, // Award XP for completion
      };
      StorageService.setProgress(newProgress);
      return newProgress;
    });
  };

  const value = {
    progress,
    setProgress,
    addXP,
    completeLesson,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
