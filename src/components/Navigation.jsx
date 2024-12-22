import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Settings } from 'lucide-react';
import { ROUTES } from '@/routes';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === ROUTES.HOME) {
      return location.pathname === ROUTES.HOME;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="max-w-lg mx-auto px-4 py-2 flex justify-around">
        <Link
          to={ROUTES.HOME}
          className={`flex flex-col items-center gap-1 ${
            isActive(ROUTES.HOME) ? 'text-emerald-500' : 'text-gray-500'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to={ROUTES.LESSONS}
          className={`flex flex-col items-center gap-1 ${
            isActive(ROUTES.LESSONS) ? 'text-emerald-500' : 'text-gray-500'
          }`}
        >
          <Book className="w-6 h-6" />
          <span className="text-xs">Lessons</span>
        </Link>

        <Link
          to={ROUTES.SETTINGS}
          className={`flex flex-col items-center gap-1 ${
            isActive(ROUTES.SETTINGS) ? 'text-emerald-500' : 'text-gray-500'
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs">Settings</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;