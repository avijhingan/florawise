import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ROUTES } from './routes';
import { ProgressProvider } from './context/ProgressContext';
import Navigation from './components/Navigation';
import Header from './components/Header';
import HomeView from './components/home/HomeView';
import LessonsView from './components/lessons/LessonsView';
import LessonView from './components/lessons/LessonView';
import SettingsView from './components/SettingsView';

const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <main className="pt-16">
        <Routes>
          <Route path={ROUTES.HOME} element={<HomeView />} />
          <Route path={ROUTES.LESSONS} element={<LessonsView />} />
          <Route path={ROUTES.LESSON_DETAIL} element={<LessonView />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsView />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </main>
      <Navigation />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  </BrowserRouter>
);

export default App;