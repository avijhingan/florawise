import React from 'react';
import { Flame } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { showToast } from '@/utils/toast';

const Stats = () => {
  const { progress } = useProgress();

  const handleStreakClick = () => {
    showToast.unimplemented();
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div 
        onClick={handleStreakClick}
        className="bg-white rounded-xl p-6 shadow-sm cursor-pointer"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-orange-50 p-2 rounded-full">
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <h2 className="font-semibold">7 Day Streak</h2>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500 transition-all"
            style={{ width: '70%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;