import React from "react";
import { useNavigate } from "react-router-dom";

import { useProgress } from "@/context/ProgressContext";
import { generatePath } from "@/helpers/navigation";

import CurrentLesson from "./CurrentLesson";
import DailyQuests from "./DailyQuests";
import Stats from "./Stats";

const Home = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  // Handler for continuing the current lesson
  // Navigates to the lesson detail page using the current lesson's ID
  const handleContinueLearning = () => {
    if (progress.currentLesson) {
      navigate(
        generatePath.lessonDetail(
          progress.currentLesson.trackId,
          progress.currentLesson.unitId,
          progress.currentLesson.lessonId,
        ),
      );
    }
  };

  return (
    // the pb-24 accounts for the fixed bottom navigation
    <div className="p-6 space-y-6 pb-24">
      <CurrentLesson onContinue={handleContinueLearning} />
      <Stats />
      <DailyQuests />
    </div>
  );
};

export default Home;
