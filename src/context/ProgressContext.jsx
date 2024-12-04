import React, { createContext, useContext, useState, useEffect } from 'react';
import { BOTANY_TRACK, GARDEN_TRACK, WILD_PLANTS_TRACK, TREES_TRACK } from '@/data/learningTracks';

const ProgressContext = createContext();

const findLessonById = (lessonId) => {
  const tracks = [BOTANY_TRACK, GARDEN_TRACK, WILD_PLANTS_TRACK, TREES_TRACK];
  for (const track of tracks) {
    for (const unit of track.units) {
      const lesson = unit.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return {
          ...lesson,
          unitNumber: unit.id,
          trackId: track.id
        };
      }
    }
  }
  return null;
};

const getNextLesson = (currentLessonId) => {
  const tracks = [BOTANY_TRACK, GARDEN_TRACK, WILD_PLANTS_TRACK, TREES_TRACK];
  let foundCurrent = false;

  for (const track of tracks) {
    for (const unit of track.units) {
      for (let i = 0; i < unit.lessons.length; i++) {
        if (foundCurrent && unit.lessons[i]) {
          return {
            unitNumber: unit.id,
            lessonNumber: i + 1,
            title: unit.lessons[i].title,
            lessonId: unit.lessons[i].id,
            unitId: unit.id,
            progress: 0
          };
        }
        if (unit.lessons[i].id === currentLessonId) {
          foundCurrent = true;
        }
      }
    }
  }
  return null;
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem('florawise-progress');
    return savedProgress ? JSON.parse(savedProgress) : {
      completedLessons: {},
      xp: 0,
      streak: 0,
      plantsIdentified: 0,
      currentLesson: {
        unitNumber: BOTANY_TRACK.units[0].id,
        lessonNumber: 1,
        title: BOTANY_TRACK.units[0].lessons[0].title,
        progress: 0,
        lessonId: BOTANY_TRACK.units[0].lessons[0].id,
        unitId: BOTANY_TRACK.units[0].id
      },
      dailyQuests: {
        lessonsCompleted: 0,
        identificationsCompleted: 0,
        journalEntriesAdded: 0
      },
      lastActive: new Date().toISOString()
    };
  });

  const [showXPGain, setShowXPGain] = useState(false);
  const [xpGainAmount, setXPGainAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem('florawise-progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const lastActive = new Date(progress.lastActive);
    const today = new Date();
    const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      setProgress(prev => ({ ...prev, streak: 0 }));
    } else if (diffDays === 1) {
      setProgress(prev => ({ 
        ...prev, 
        streak: prev.streak + 1,
        lastActive: today.toISOString(),
        dailyQuests: {
          lessonsCompleted: 0,
          identificationsCompleted: 0,
          journalEntriesAdded: 0
        }
      }));
    }
  }, []);

  const value = {
    progress,
    setProgress,
    showXPGain,
    xpGainAmount,
    actions: {
      hideXPGain: () => {
        setShowXPGain(false);
      },
      addXP: (amount) => {
        setXPGainAmount(amount);
        setShowXPGain(true);
        setProgress(prev => ({
          ...prev,
          xp: prev.xp + amount
        }));
      },
      completeLesson: (lessonId, unitId) => {
        setProgress(prev => {
          const nextLesson = getNextLesson(lessonId);
          return {
            ...prev,
            completedLessons: {
              ...prev.completedLessons,
              [lessonId]: {
                completed: true,
                unitId,
                completedAt: new Date().toISOString()
              }
            },
            xp: prev.xp + 20,
            currentLesson: nextLesson || prev.currentLesson,
            dailyQuests: {
              ...prev.dailyQuests,
              lessonsCompleted: prev.dailyQuests.lessonsCompleted + 1
            }
          };
        });
        
        // Trigger XP gain animation
        setXPGainAmount(20);
        setShowXPGain(true);
      },

      setCurrentLesson: (lesson) => {
        setProgress(prev => ({
          ...prev,
          currentLesson: {
            unitNumber: lesson.unitNumber,
            lessonNumber: lesson.lessonNumber,
            title: lesson.title,
            progress: prev.completedLessons[lesson.id]?.completed ? 100 : 0,
            lessonId: lesson.id,
            unitId: lesson.unitId
          }
        }));
      },

      identifyPlant: () => {
        setProgress(prev => ({
          ...prev,
          plantsIdentified: prev.plantsIdentified + 1,
          xp: prev.xp + 10,
          dailyQuests: {
            ...prev.dailyQuests,
            identificationsCompleted: prev.dailyQuests.identificationsCompleted + 1
          }
        }));
      },

      addJournalEntry: () => {
        setProgress(prev => ({
          ...prev,
          xp: prev.xp + 5,
          dailyQuests: {
            ...prev.dailyQuests,
            journalEntriesAdded: prev.dailyQuests.journalEntriesAdded + 1
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