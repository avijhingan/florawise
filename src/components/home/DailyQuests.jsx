import React from 'react';
import { Target } from 'lucide-react';
import { showToast } from '@/utils/toast';

const DailyQuests = () => {
  const handleQuestClick = () => {
    showToast.unimplemented();
  };

  return (
    <div 
      onClick={handleQuestClick}
      className="bg-white rounded-xl p-6 shadow-sm cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-50 p-2 rounded-full">
          <Target className="w-4 h-4 text-blue-500" />
        </div>
        <h2 className="font-semibold">Daily Quests</h2>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Complete 2 lessons</span>
            <span className="font-medium">0/2</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all" style={{ width: '0%' }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Earn 100 XP</span>
            <span className="font-medium">0/100</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all" style={{ width: '0%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuests;