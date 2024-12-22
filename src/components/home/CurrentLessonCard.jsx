import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { BOTANY_TRACK } from '@/data/learningTracks';
import { generatePath } from '@/routes';

const CurrentLessonCard = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const handleContinue = () => {
    if (progress.currentLesson) {
      navigate(generatePath.lessonDetail(
        progress.currentLesson.unitId,
        progress.currentLesson.lessonId
      ), {
        state: { from: 'current-lesson' }
      });
    } else {
      const firstUnit = BOTANY_TRACK.units[0];
      const firstLesson = firstUnit.lessons[0];
      navigate(generatePath.lessonDetail(firstUnit.id, firstLesson.id), {
        state: { from: 'current-lesson' }
      });
    }
  };

  const currentLesson = progress.currentLesson || {
    title: "Basic Plant Structure",
    progress: 0
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 p-2 rounded-full">
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <h2 className="font-semibold">Continue Learning</h2>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-3">{currentLesson.title}</h3>

      <div className="space-y-2">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${currentLesson.progress}%` }}
          />
        </div>
        
        <button
          onClick={handleContinue}
          className="w-full py-2 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CurrentLessonCard;