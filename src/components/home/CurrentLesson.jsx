// Displays the user's current lesson and progress
// Provides quick access to continue learning from where they left off
import { BookOpen } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useProgress } from "@/context/ProgressContext";
import { BOTANY_TRACK } from "@/data/tracks/botany";
import { generatePath } from "@/helpers/navigation";

const CurrentLesson = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const handleContinue = () => {
    if (progress.currentLesson) {
      navigate(
        generatePath.lessonDetail(
          progress.currentLesson.trackId,
          progress.currentLesson.unitId,
          progress.currentLesson.lessonId,
        ),
      );
    } else {
      // New user - start with first lesson of first unit
      const firstUnit = BOTANY_TRACK.units[0];
      const firstLesson = firstUnit.lessons[0];

      navigate(
        generatePath.lessonDetail(
          BOTANY_TRACK.id,
          firstUnit.id,
          firstLesson.id,
        ),
      );
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-emerald-100 p-2 rounded-lg">
          <BookOpen className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold">Continue Learning</h2>
          <p className="text-sm text-gray-500">
            {progress.currentLesson
              ? `Continue with ${progress.currentLesson.title}`
              : "Start your plant journey"}
          </p>
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
      >
        {progress.currentLesson ? "Continue" : "Start Learning"}
      </button>
    </div>
  );
};

export default CurrentLesson;
