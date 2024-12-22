import React, { createContext, useContext, useState, useEffect } from 'react';
import { showToast } from '@/utils/toast';
import { BOTANY_TRACK } from '@/data/learningTracks';

const ProgressContext = createContext();

// Initialize with the first lesson of the Botany track
const firstUnit = BOTANY_TRACK.units[0];
const firstLesson = firstUnit.lessons[0];

const initialState = {
  completedLessons: {},
  xp: 0,
  streak: 0,
  currentLesson: {
    trackId: 'botany',
    unitId: firstUnit.id,
    lessonId: firstLesson.id,
    title: firstLesson.title,
    progress: 0
  },
  lastActive: new Date().toISOString()
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem('florawise-progress');
    return savedProgress ? JSON.parse(savedProgress) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('florawise-progress', JSON.stringify(progress));
  }, [progress]);

  const value = {
    progress,
    actions: {
      resetProgress: () => {
        localStorage.removeItem('florawise-progress');
        setProgress(initialState);
        showToast.resetProgress();
      },

      completeLesson: (lessonId, unitId) => {
        setProgress(prev => ({
          ...prev,
          completedLessons: {
            ...prev.completedLessons,
            [lessonId]: { 
              completed: true, 
              lastAttempt: new Date().toISOString() 
            }
          },
          currentLesson: {
            ...prev.currentLesson,
            progress: 100
          },
          xp: prev.xp + 50
        }));
        showToast.xpGain(50);
      },

      setCurrentLesson: (trackId, unitId, lessonId, title) => {
        setProgress(prev => ({
          ...prev,
          currentLesson: {
            trackId,
            unitId,
            lessonId,
            title,
            progress: prev.completedLessons[lessonId]?.completed ? 100 : 0
          }
        }));
      },

      updateLessonProgress: (progress) => {
        setProgress(prev => ({
          ...prev,
          currentLesson: {
            ...prev.currentLesson,
            progress
          }
        }));
      }
    }
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}