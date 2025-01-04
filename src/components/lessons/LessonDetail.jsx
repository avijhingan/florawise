// Individual lesson content and interaction
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import {
  SingleChoiceExercise,
  MultipleChoiceExercise,
  MatchingExercise,
  FlashcardExercise,
  MemoryExercise,
} from "@/components/exerciseTypes";
import LessonContent from "@/components/lessons/LessonContent";
import { EXERCISE_TYPES } from "@/constants/exercise";
import { useProgress } from "@/context/ProgressContext";
import { BOTANY_TRACK } from "@/data/tracks/botany";
import { generatePath } from "@/helpers/navigation";
import { showToast } from "@/helpers/toast";

// Map exercise types to their components
const EXERCISE_COMPONENTS = {
  [EXERCISE_TYPES.SINGLE_CHOICE]: SingleChoiceExercise,
  [EXERCISE_TYPES.MULTIPLE_CHOICE]: MultipleChoiceExercise,
  [EXERCISE_TYPES.MATCHING]: MatchingExercise,
  [EXERCISE_TYPES.FLASHCARD]: FlashcardExercise,
  [EXERCISE_TYPES.MEMORY]: MemoryExercise,
};

const LessonDetail = () => {
  const { trackId, unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const { completeLesson } = useProgress();

  // Find current lesson data
  const unit = BOTANY_TRACK.units.find((u) => u.id === unitId);
  const lesson = unit?.lessons.find((l) => l.id === lessonId);

  // Find next lesson or unit
  const currentLessonIndex = unit?.lessons.findIndex((l) => l.id === lessonId);
  const nextLesson = unit?.lessons[currentLessonIndex + 1];
  const nextUnit =
    BOTANY_TRACK.units[
      BOTANY_TRACK.units.findIndex((u) => u.id === unitId) + 1
    ];

  const handleBack = () => {
    navigate(generatePath.unitLessons(trackId, unitId));
  };

  const handleComplete = () => {
    // Mark lesson as complete
    completeLesson(lessonId);

    // Show completion toast
    showToast.lessonComplete();

    // Award XP
    showToast.xpGain(50);

    // Navigate to next lesson if available
    if (nextLesson) {
      navigate(generatePath.lessonDetail(trackId, unitId, nextLesson.id));
    }
    // Or next unit if available
    else if (nextUnit) {
      navigate(generatePath.unitLessons(trackId, nextUnit.id));
    }
    // Or back to unit overview
    else {
      navigate(generatePath.unitLessons(trackId, unitId));
    }
  };

  if (!lesson) {
    return <Navigate to={generatePath.unitLessons(trackId, unitId)} replace />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <button
        onClick={handleBack}
        className="mb-4 p-2 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <h1 className="text-2xl font-bold mb-6">{lesson.title}</h1>

      {lesson.type === "LESSON" ? (
        <LessonContent content={lesson.content} onComplete={handleComplete} />
      ) : (
        // Exercise rendering (existing code)
        React.createElement(EXERCISE_COMPONENTS[lesson.exerciseType], {
          ...lesson,
          onComplete: handleComplete,
        })
      )}
    </div>
  );
};

export default LessonDetail;
