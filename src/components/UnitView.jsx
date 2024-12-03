import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

const UnitView = ({ track, onSelectLesson, onBack }) => {
  const { progress } = useProgress();

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack} 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{track.title}</h1>
          <p className="text-sm text-gray-500">{track.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {track.units.map(unit => (
          <div key={unit.id} className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-2">{unit.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{unit.description}</p>

            <div className="space-y-2">
              {unit.lessons.map(lesson => {
                const isCompleted = progress.completedLessons[lesson.id]?.completed;
                
                return (
                  <div
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      isCompleted 
                        ? 'bg-emerald-50 hover:bg-emerald-100' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-500">{lesson.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className={`h-4 w-4 ${isCompleted ? 'text-yellow-500' : 'text-gray-300'}`} />
                        <span className="text-sm text-gray-500">
                          {isCompleted ? '3/3' : '0/3'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitView;