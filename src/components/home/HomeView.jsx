import React from 'react';
import CurrentLessonCard from './CurrentLessonCard';
import Stats from './Stats';
import DailyQuests from './DailyQuests';

const HomeView = () => {
  const handleContinueLearning = () => {
    // We'll implement this navigation later
    console.log('Continue learning clicked');
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <CurrentLessonCard onContinue={handleContinueLearning} />
      <Stats />
      <DailyQuests />
    </div>
  );
};

export default HomeView;