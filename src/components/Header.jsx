import React from 'react';
import { Leaf, Trophy } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const Header = () => {
  const { progress } = useProgress();

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white z-50">
      <div 
        className="max-w-xl mx-auto px-6 py-3 flex justify-between items-center"
        style={{
          background: 'linear-gradient(100deg, rgb(34 197 94) 0%, rgb(16 185 129) 100%)'
        }}
      >
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          <span className="font-semibold">Florawise</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-yellow-300 text-sm">✨</span>
            <span className="font-medium">{progress.xp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-300" />
            <span className="font-medium">{progress.streak}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;