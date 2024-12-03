import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // User progress state
  const [progress, setProgress] = useState({
    completedLessons: {},  // { lessonId: { completed: true, score: 90, lastAttempt: date } }
    xp: 253,
    streak: 7,
    plantsIdentified: 15,
    currentLesson: {
      unitNumber: 1,
      lessonNumber: 3,
      title: "Plant Structure Basics",
      progress: 65
    }
  });

  // Track completion of a lesson
  const completeLesson = (lessonId, score) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: {
        ...prev.completedLessons,
        [lessonId]: {
          completed: true,
          score,
          lastAttempt: new Date()
        }
      },
      xp: prev.xp + score
    }));
  };

  // Track progress within a lesson
  const updateLessonProgress = (unitNumber, lessonNumber, progress) => {
    setProgress(prev => ({
      ...prev,
      currentLesson: {
        unitNumber,
        lessonNumber,
        title: prev.currentLesson.title,
        progress
      }
    }));
  };

  // Update streak
  const updateStreak = () => {
    setProgress(prev => ({
      ...prev,
      streak: prev.streak + 1
    }));
  };

  // Add identified plant
  const addIdentifiedPlant = () => {
    setProgress(prev => ({
      ...prev,
      plantsIdentified: prev.plantsIdentified + 1
    }));
  };

  return (
    <AppContext.Provider 
      value={{
        progress,
        completeLesson,
        updateLessonProgress,
        updateStreak,
        addIdentifiedPlant
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the app context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}