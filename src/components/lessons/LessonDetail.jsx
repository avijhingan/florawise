// Individual lesson content and interaction
// Handles lesson progress, completion, and navigation
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import {
  SingleChoiceExercise,
  MultipleChoiceExercise,
  MatchingExercise,
} from "@/components/exerciseTypes";
import { EXERCISE_TYPES } from "@/constants/exercise";
import { useProgress } from "@/context/ProgressContext";
import { BOTANY_TRACK } from "@/data/tracks/botany";
import { generatePath } from "@/helpers/navigation";
import { STYLE_GUIDE } from "@/styles";

// Map exercise types to their expected data structure and component
const EXERCISE_COMPONENTS = {
  [EXERCISE_TYPES.SINGLE_CHOICE]: {
    component: SingleChoiceExercise,
    propMap: (lesson) => ({ questions: lesson.questions }),
  },
  [EXERCISE_TYPES.MULTIPLE_CHOICE]: {
    component: MultipleChoiceExercise,
    propMap: (lesson) => ({ questions: lesson.questions }),
  },
  [EXERCISE_TYPES.MATCHING]: {
    component: MatchingExercise,
    propMap: (lesson) => ({ pairs: lesson.pairs }),
  },
};

const LessonDetail = () => {
  const { trackId, unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const { addXP, completeLesson } = useProgress();

  const unit = BOTANY_TRACK.units.find((u) => u.id === unitId);
  const currentLessonIndex = unit?.lessons.findIndex((l) => l.id === lessonId);
  const lesson = unit?.lessons[currentLessonIndex];

  // Get next lesson and unit info
  const nextLesson = unit?.lessons[currentLessonIndex + 1];
  const currentUnitIndex = BOTANY_TRACK.units.findIndex((u) => u.id === unitId);
  const nextUnit = BOTANY_TRACK.units[currentUnitIndex + 1];

  if (!unit || !lesson) {
    return <Navigate to={generatePath.trackUnits(trackId)} replace />;
  }

  const exerciseConfig = EXERCISE_COMPONENTS[lesson.type];

  if (!exerciseConfig) {
    console.error(`No component found for exercise type: ${lesson.type}`);
    return <Navigate to={generatePath.trackUnits(trackId)} replace />;
  }

  const ExerciseComponent = exerciseConfig.component;
  const exerciseProps = exerciseConfig.propMap(lesson);

  const handleBack = () => {
    navigate(`/tracks/${trackId}/units/${unitId}`);
  };

  const handleLessonComplete = () => {
    addXP(lesson.xpReward || 50);
    completeLesson(lessonId, unitId);
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate(generatePath.lessonDetail(trackId, unitId, nextLesson.id));
    }
  };

  return (
    <div className={STYLE_GUIDE.layout.container}>
      {/* Back button */}
      <button
        onClick={handleBack}
        className="mb-6 p-2 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      {/* Exercise content */}
      <ExerciseComponent
        {...exerciseProps}
        onComplete={handleLessonComplete}
        nextLesson={nextLesson}
        nextUnit={nextUnit}
        onNextLesson={handleNextLesson}
        onNextUnit={(unitId) =>
          navigate(generatePath.unitLessons(trackId, unitId))
        }
        onReturnToTrack={() =>
          navigate(generatePath.unitLessons(trackId, unitId))
        }
      />
    </div>
  );
};

export default LessonDetail;
