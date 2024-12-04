import React from 'react';
import CurrentLessonCard from './CurrentLessonCard';
import Stats from './Stats';
import DailyQuests from './DailyQuests';

const HomeView = ({ onContinueLearning }) => {
  const handleContinue = (lesson) => {
    onContinueLearning(lesson);
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <CurrentLessonCard onContinue={handleContinue} />
      <Stats />
      <DailyQuests />
    </div>
  );
};

export default HomeView;