import React from 'react';
import { useParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES, generatePath } from '@/routes';
import { BOTANY_TRACK } from '@/data/learningTracks';
import { useProgress } from '@/context/ProgressContext';

const TrackView = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { progress } = useProgress();

  const handleLessonClick = (unitId, lessonId) => {
    navigate(generatePath.lessonDetail(unitId, lessonId), {
      state: { from: 'track-view' }
    });
  };

  const handleBack = () => {
    navigate(ROUTES.TRACKS, { replace: true });
  };

  // For MVP we only have BOTANY_TRACK
  const track = BOTANY_TRACK;

  if (!track) {
    return <Navigate to={ROUTES.TRACKS} replace />;
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={handleBack} 
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
            
            <div className="space-y-2">
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
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-500">{lesson.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-500">
                          {isCompleted ? '✓' : ''}
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

export default TrackView;