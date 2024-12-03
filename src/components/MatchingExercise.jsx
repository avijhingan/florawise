import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

const MatchingExercise = ({ pairs, lessonId, unitId }) => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const { actions } = useProgress();

  // Check if all pairs are matched
  useEffect(() => {
    if (matches.length === pairs.length) {
      // Add slight delay before completing lesson
      setTimeout(() => {
        actions.completeLesson(lessonId, unitId);
      }, 1000);
    }
  }, [matches, pairs.length, lessonId, unitId, actions]);

  const handleClick = (side, index) => {
    if (side === 'left') {
      setSelectedLeft(index);
      if (selectedRight !== null && index === selectedRight) {
        createMatch(index);
      }
    } else {
      setSelectedRight(index);
      if (selectedLeft !== null && index === selectedLeft) {
        createMatch(index);
      }
    }
  };

  const createMatch = (index) => {
    setShowFeedback(true);
    setTimeout(() => {
      setMatches([...matches, index]);
      setSelectedLeft(null);
      setSelectedRight(null);
      setShowFeedback(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {showFeedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-emerald-700">Great match!</p>
        </div>
      )}

      <div className="flex gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-2">
          {pairs.map((pair, index) => (
            <div
              key={`left-${index}`}
              onClick={() => !matches.includes(index) && handleClick('left', index)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                matches.includes(index)
                  ? 'bg-emerald-50 border-emerald-200'
                  : selectedLeft === index
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{pair.left}</span>
                {matches.includes(index) && (
                  <Check className="h-5 w-5 text-emerald-500" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-2">
          {pairs.map((pair, index) => (
            <div
              key={`right-${index}`}
              onClick={() => !matches.includes(index) && handleClick('right', index)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                matches.includes(index)
                  ? 'bg-emerald-50 border-emerald-200'
                  : selectedRight === index
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{pair.right}</span>
                {matches.includes(index) && (
                  <Check className="h-5 w-5 text-emerald-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {matches.length === pairs.length && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-emerald-700">🎉 Congratulations! You've completed this lesson!</p>
        </div>
      )}
    </div>
  );
};

export default MatchingExercise;