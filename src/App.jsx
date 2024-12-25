import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Settings from "./components/Settings";
import Home from "./components/home/Home";
import LessonDetail from "./components/lessons/LessonDetail";
import TrackUnits from "./components/tracks/TrackUnits";
import Tracks from "./components/tracks/Tracks";
import UnitLessons from "./components/tracks/UnitLessons";
import { ProgressProvider } from "./context/ProgressContext";

// Main layout component that wraps all routes
const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <main className="pt-16">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.TRACKS} element={<Tracks />} />
          <Route path={ROUTES.TRACK_UNITS} element={<TrackUnits />} />
          <Route path={ROUTES.UNIT_LESSONS} element={<UnitLessons />} />
          <Route path={ROUTES.LESSON_DETAIL} element={<LessonDetail />} />
          <Route path="/settings" element={<Settings />} />
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
