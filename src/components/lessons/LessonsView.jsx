import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES, generatePath } from '@/routes';
import { BOTANY_TRACK } from '@/data/learningTracks';
import { useProgress } from '@/context/ProgressContext';

const LessonsView = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const handleLessonClick = (unitId, lessonId) => {
    navigate(generatePath.lessonDetail(unitId, lessonId));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Available Lessons</h1>

      {BOTANY_TRACK.units.map(unit => (
        <div key={unit.id} className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">{unit.title}</h2>
          
          <div className="space-y-3">
            {unit.lessons.map(lesson => {
              const isCompleted = progress.completedLessons[lesson.id]?.completed;
              
              return (
                <div
                  key={lesson.id}
                  onClick={() => handleLessonClick(unit.id, lesson.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    isCompleted 
                      ? 'bg-emerald-50 hover:bg-emerald-100' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-gray-500">{lesson.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonsView;