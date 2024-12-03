import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from '@/context/ProgressContext';
import { 
  BOTANY_TRACK, 
  GARDEN_TRACK, 
  WILD_PLANTS_TRACK, 
  TREES_TRACK 
} from '@/data/learningTracks';

const tracks = [
  BOTANY_TRACK,
  GARDEN_TRACK,
  WILD_PLANTS_TRACK,
  TREES_TRACK
];

const TrackView = ({ onSelectTrack }) => {
  const { progress } = useProgress();

  const getTrackProgress = (track) => {
    const totalLessons = track.units.reduce((acc, unit) => acc + unit.lessons.length, 0);
    if (totalLessons === 0) return 0;
    
    const completedLessons = track.units.reduce((acc, unit) => {
      return acc + unit.lessons.filter(lesson => 
        progress.completedLessons[lesson.id]?.completed
      ).length;
    }, 0);
    return Math.round((completedLessons / totalLessons) * 100);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Choose Your Learning Track</h1>
      
      <div className="space-y-4">
        {tracks.map((track) => {
          const progressPercent = getTrackProgress(track);
          
          return (
            <Card 
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="hover:border-emerald-100 transition-all duration-200 cursor-pointer shadow-sm"
            >
              <CardContent className="p-8">
                <div className="flex gap-5">
                  <div className="bg-emerald-50/80 p-3.5 rounded-2xl shrink-0 h-fit">
                    <BookOpen className="h-5 w-5 text-emerald-600/90" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-[17px] font-semibold tracking-tight">{track.title}</h2>
                        <p className="text-gray-500/90 text-[14px] mt-1 leading-relaxed">{track.description}</p>
                      </div>
                      <span className="text-xs bg-gray-50 px-2.5 py-1 rounded-full text-gray-500/90 font-medium ml-4">
                        {track.units.length} units
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500/90">
                          {progressPercent}% complete
                        </span>
                      </div>
                      <Progress 
                        value={progressPercent} 
                        className="h-1.5 bg-gray-100/80"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TrackView;