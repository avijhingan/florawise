import React from 'react';

const Stats = () => (
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-amber-50 rounded-xl p-6">
      <div className="flex items-center gap-3">
        <div className="bg-amber-100 p-2 rounded-full">
          <div className="w-5 h-5 text-amber-600">🏆</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">7 Day Streak!</h3>
          <p className="text-sm text-amber-700">Keep it growing! 🌱</p>
        </div>
      </div>
    </div>
    <div className="bg-emerald-50 rounded-xl p-6">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-full">
          <div className="w-5 h-5 text-emerald-600">🌿</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">15 Plants</h3>
          <p className="text-sm text-emerald-700">Identified! 🔍</p>
        </div>
      </div>
    </div>
  </div>
);

export default Stats;