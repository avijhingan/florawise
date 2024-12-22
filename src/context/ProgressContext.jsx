import React, { createContext, useContext, useState, useEffect } from 'react';
import { BOTANY_TRACK, GARDEN_TRACK, WILD_PLANTS_TRACK, TREES_TRACK } from '@/data/learningTracks';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

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
  const [progress, setProgress] = useState(null);
  const { user } = useAuth();

  // Load user progress
  useEffect(() => {
    if (!user) return;

    const loadProgress = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProgress(docSnap.data());
      } else {
        // Set default progress for new users
        const defaultProgress = {
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
        await setDoc(docRef, defaultProgress);
        setProgress(defaultProgress);
      }
    };

    loadProgress();
  }, [user]);

  // Update progress
  const updateProgress = async (newProgress) => {
    if (!user) return;
    
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, newProgress, { merge: true });
    setProgress(newProgress);
  };

  const [showXPGain, setShowXPGain] = useState(false);
  const [xpGainAmount, setXPGainAmount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const lastActive = new Date(progress.lastActive);
    const today = new Date();
    const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      updateProgress({ ...progress, streak: 0 });
    } else if (diffDays === 1) {
      updateProgress({ 
        ...progress, 
        streak: progress.streak + 1,
        lastActive: today.toISOString(),
        dailyQuests: {
          lessonsCompleted: 0,
          identificationsCompleted: 0,
          journalEntriesAdded: 0
        }
      });
    }
  }, [user, progress]);

  const value = {
    progress,
    setProgress: updateProgress,
    showXPGain,
    xpGainAmount,
    actions: {
      hideXPGain: () => {
        setShowXPGain(false);
      },
      addXP: (amount) => {
        setXPGainAmount(amount);
        setShowXPGain(true);
        updateProgress({
          ...progress,
          xp: progress.xp + amount
        });
      },
      completeLesson: (lessonId, unitId) => {
        updateProgress({
          ...progress,
          completedLessons: {
            ...progress.completedLessons,
            [lessonId]: {
              completed: true,
              unitId,
              completedAt: new Date().toISOString()
            }
          },
          xp: progress.xp + 20,
          currentLesson: getNextLesson(lessonId) || progress.currentLesson,
          dailyQuests: {
            ...progress.dailyQuests,
            lessonsCompleted: progress.dailyQuests.lessonsCompleted + 1
          }
        });
        
        // Trigger XP gain animation
        setXPGainAmount(20);
        setShowXPGain(true);
      },

      setCurrentLesson: (lesson) => {
        updateProgress({
          ...progress,
          currentLesson: {
            unitNumber: lesson.unitNumber,
            lessonNumber: lesson.lessonNumber,
            title: lesson.title,
            progress: progress.completedLessons[lesson.id]?.completed ? 100 : 0,
            lessonId: lesson.id,
            unitId: lesson.unitId
          }
        });
      },

      identifyPlant: () => {
        updateProgress({
          ...progress,
          plantsIdentified: progress.plantsIdentified + 1,
          xp: progress.xp + 10,
          dailyQuests: {
            ...progress.dailyQuests,
            identificationsCompleted: progress.dailyQuests.identificationsCompleted + 1
          }
        });
      },

      addJournalEntry: () => {
        updateProgress({
          ...progress,
          xp: progress.xp + 5,
          dailyQuests: {
            ...progress.dailyQuests,
            journalEntriesAdded: progress.dailyQuests.journalEntriesAdded + 1
          }
        });
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