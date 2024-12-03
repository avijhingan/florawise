import React from 'react';
import { Trash2 } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

const SettingsView = () => {
  const { setProgress } = useProgress();

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('florawise-progress');
      setProgress({
        completedLessons: {},
        xp: 0,
        streak: 0,
        plantsIdentified: 0,
        currentLesson: {
          unitNumber: 'botany-unit-1',
          lessonNumber: 1,
          title: "Parts of a Plant",
          progress: 0,
          lessonId: 'botany-1-1',
          unitId: 'botany-unit-1'
        },
        dailyQuests: {
          lessonsCompleted: 0,
          identificationsCompleted: 0,
          journalEntriesAdded: 0
        },
        lastActive: new Date().toISOString()
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Development Tools</h2>
        </div>
        
        <div className="p-4">
          <button
            onClick={handleResetProgress}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Reset All Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;