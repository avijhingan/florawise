import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BOTANY_TRACK } from '@/data/learningTracks';
import { useProgress } from '@/context/ProgressContext';

const TracksView = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const calculateTrackProgress = (track) => {
    const totalLessons = track.units.reduce((acc, unit) => acc + unit.lessons.length, 0);
    const completedLessons = track.units.reduce((acc, unit) => {
      return acc + unit.lessons.filter(lesson => progress.completedLessons[lesson.id]?.completed).length;
    }, 0);
    return (completedLessons / totalLessons) * 100;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Learning Tracks</h1>
      
      <div className="space-y-4">
        <div 
          onClick={() => navigate(`/tracks/${BOTANY_TRACK.id}`)}
          className="bg-white rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-bold mb-2">{BOTANY_TRACK.title}</h2>
          <p className="text-gray-600 mb-4">{BOTANY_TRACK.description}</p>
          
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${calculateTrackProgress(BOTANY_TRACK)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracksView;