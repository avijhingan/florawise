import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './context/ProgressContext';
import Navigation from './components/Navigation.jsx';
import Header from './components/Header.jsx';
import HomeView from './components/home/HomeView.jsx';
import TrackView from './components/TrackView.jsx';
import UnitView from './components/UnitView.jsx';
import LessonView from './components/LessonView.jsx';
import SettingsView from './components/SettingsView.jsx';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100
    },
    in: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: -100
    }
  };

  const pageTransition = {
    duration: 0.5
  };

  const handleSelectTrack = (track) => {
    setCurrentTrack(track);
    setCurrentView('units');
  };

  const handleSelectLesson = (lesson) => {
    setCurrentLesson(lesson);
    setCurrentView('lesson');
  };

  const handleBack = () => {
    if (currentView === 'lesson') {
      setCurrentView('units');
      setCurrentLesson(null);
    } else if (currentView === 'units') {
      setCurrentView('lessons');
      setCurrentTrack(null);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleContinueLearning = () => {
    if (currentLesson) {
      setCurrentView('lesson');
    }
  };

  return (
    <ProgressProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden pt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial="initial"
              animate="in"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full"
            >
              {currentView === 'home' && (
                <HomeView onContinueLearning={handleContinueLearning} />
              )}
              {currentView === 'lessons' && (
                <TrackView onSelectTrack={handleSelectTrack} />
              )}
              {currentView === 'units' && currentTrack && (
                <UnitView 
                  track={currentTrack}
                  onSelectLesson={handleSelectLesson}
                  onBack={handleBack}
                />
              )}
              {currentView === 'lesson' && currentLesson && (
                <LessonView 
                  lesson={currentLesson}
                  onBack={handleBack}
                />
              )}
              {currentView === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </div>
        <Navigation 
          activeView={currentView} 
          onNavigate={handleViewChange} 
        />
      </div>
    </ProgressProvider>
  );
};

export default App;