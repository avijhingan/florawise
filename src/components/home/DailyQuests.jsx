import React from 'react';

const DailyQuests = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <div className="bg-emerald-50 p-2 rounded-full">
          <div className="w-4 h-4 border-2 border-emerald-500 rounded-full" />
        </div>
        <h2 className="font-semibold">Daily Quests</h2>
      </div>
      <button className="text-emerald-600 text-sm">View All</button>
    </div>
    {[
      { title: 'Complete 2 Lessons', xp: 20, progress: 75 },
      { title: 'Practice Identification', xp: 15, progress: 50 },
      { title: 'Add Journal Entry', xp: 10, progress: 0 }
    ].map((quest, index) => (
      <div key={index} className="flex items-center gap-4 py-3">
        <div className="bg-emerald-50 p-2 rounded-lg">
          <div className="w-4 h-4 bg-emerald-500 rounded-sm" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">{quest.title}</span>
            <span className="text-xs text-emerald-600">{quest.xp} XP</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${quest.progress}%` }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default DailyQuests;