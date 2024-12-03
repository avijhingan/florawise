import React from 'react';
import { ArrowLeft } from 'lucide-react';
import MatchingExercise from './MatchingExercise';

const LessonView = ({ lesson, onBack }) => {
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
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p className="text-sm text-gray-500">{lesson.description}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <MatchingExercise 
          pairs={lesson.pairs}
          lessonId={lesson.id}
          unitId={lesson.unitId}
        />
      </div>
    </div>
  );
};

export default LessonView;