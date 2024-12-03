import React from 'react';
import { Home, Book, Camera, BookOpen, Settings } from 'lucide-react';

const Navigation = ({ activeView, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="max-w-xl mx-auto flex justify-between px-6 py-3">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 ${activeView === 'home' ? 'text-emerald-600' : 'text-gray-400'}`}
        >
          <Home size={20} />
          <span className="text-xs">Home</span>
        </button>
        <button 
          onClick={() => onNavigate('lessons')}
          className={`flex flex-col items-center gap-1 ${activeView === 'lessons' ? 'text-emerald-600' : 'text-gray-400'}`}
        >
          <Book size={20} />
          <span className="text-xs">Lessons</span>
        </button>
        <button 
          onClick={() => onNavigate('identify')}
          className={`flex flex-col items-center gap-1 ${activeView === 'identify' ? 'text-emerald-600' : 'text-gray-400'}`}
        >
          <Camera size={20} />
          <span className="text-xs">Identify</span>
        </button>
        <button 
          onClick={() => onNavigate('journal')}
          className={`flex flex-col items-center gap-1 ${activeView === 'journal' ? 'text-emerald-600' : 'text-gray-400'}`}
        >
          <BookOpen size={20} />
          <span className="text-xs">Journal</span>
        </button>
        <button 
          onClick={() => onNavigate('settings')}
          className={`flex flex-col items-center gap-1 ${activeView === 'settings' ? 'text-emerald-600' : 'text-gray-400'}`}
        >
          <Settings size={20} />
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;