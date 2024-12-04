import React from 'react';
import { BookOpen } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { BOTANY_TRACK, GARDEN_TRACK, WILD_PLANTS_TRACK, TREES_TRACK } from '@/data/learningTracks';

const CurrentLessonCard = ({ onContinue }) => {
  const { progress } = useProgress();
  const { currentLesson } = progress;

  const findFullLesson = (lessonId) => {
    const tracks = [BOTANY_TRACK, GARDEN_TRACK, WILD_PLANTS_TRACK, TREES_TRACK];
    for (const track of tracks) {
      for (const unit of track.units) {
        const lesson = unit.lessons.find(l => l.id === lessonId);
        if (lesson) {
          return {
            ...lesson,
            unitId: unit.id,
            unitNumber: unit.id,
            lessonNumber: currentLesson.lessonNumber
          };
        }
      }
    }
    return null;
  };

  const handleContinue = () => {
    const fullLesson = findFullLesson(currentLesson.lessonId);
    if (fullLesson) {
      onContinue(fullLesson);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-emerald-100 mb-1.5">
          <BookOpen size={16} />
          <span className="text-sm font-medium tracking-wide">
            UNIT {currentLesson.unitNumber}, LESSON {currentLesson.lessonNumber}
          </span>
        </div>
        <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
      </div>

      <div className="space-y-4">
        <div className="h-2 bg-emerald-400/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${currentLesson.progress}%` }}
          />
        </div>

        <button 
          onClick={handleContinue}
          className="w-full bg-white text-emerald-600 rounded-lg py-3 font-medium hover:bg-emerald-50 transition-colors"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
};

export default CurrentLessonCard;