// Context for managing user progress throughout the application
// Handles lesson completion, XP, streaks, and current lesson tracking
import React, { createContext, useContext, useState } from "react";

const ProgressContext = createContext();

// Custom hook to ensure context is used within provider
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    completedLessons: {},
    xp: 0,
    streak: 0,
    currentLesson: null,
    lastActive: new Date().toISOString(),
  });

  const addXP = (amount) => {
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  };

  const completeLesson = (lessonId, unitId) => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: {
        ...prev.completedLessons,
        [lessonId]: {
          completed: true,
          unitId,
          completedAt: new Date().toISOString(),
        },
      },
    }));
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
