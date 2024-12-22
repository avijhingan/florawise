import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/context/ProgressContext';
import { showToast } from '@/utils/toast';
import { generatePath } from '@/routes';
import CurrentLessonCard from './CurrentLessonCard';
import Stats from './Stats';
import DailyQuests from './DailyQuests';

const HomeView = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const handleContinueLearning = () => {
    if (progress.currentLesson) {
      navigate(generatePath.lessonDetail(
        progress.currentLesson.unitId,
        progress.currentLesson.lessonId
      ));
    }
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