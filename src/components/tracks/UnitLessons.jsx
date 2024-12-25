import { ArrowLeft, Check } from "lucide-react";
import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import { useProgress } from "@/context/ProgressContext";
import { BOTANY_TRACK } from "@/data/tracks/botany";
import { generatePath } from "@/helpers/navigation";
import { cn } from "@/lib/utils";

// Displays individual unit content and its lessons
// Handles navigation between track -> unit -> lesson flow
const UnitLessons = () => {
  const { trackId, unitId } = useParams();
  const navigate = useNavigate();
  const { progress } = useProgress();

  // Find current unit data - needed for title and lesson list
  const unit = BOTANY_TRACK.units.find((u) => u.id === unitId);

  // Return to track overview
  const handleBack = () => {
    navigate(`/tracks/${trackId}`);
  };

  // Navigate to specific lesson within this unit
  const handleLessonClick = (lessonId) => {
    navigate(generatePath.lessonDetail(trackId, unitId, lessonId));
  };

  // Protect against invalid unit IDs
  if (!unit) {
    return <Navigate to={`/tracks/${trackId}`} replace />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header with back navigation and unit info */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="mb-4 p-2 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold mb-2">{unit.title}</h1>
        <p className="text-gray-600">{unit.description}</p>
      </div>

      {/* Lesson list */}
      <div className="space-y-4">
        {unit.lessons.map((lesson) => {
          const isCompleted = progress.completedLessons[lesson.id]?.completed;

          return (
            <div
              key={lesson.id}
              onClick={() => handleLessonClick(lesson.id)}
              className={cn(
                "p-4 rounded-lg cursor-pointer transition-colors",
                "border border-gray-200",
                isCompleted
                  ? "bg-emerald-50 hover:bg-emerald-100"
                  : "bg-white hover:bg-gray-100",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <h3 className="font-medium mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {lesson.description}
                  </p>
                </div>
                {isCompleted && (
                  <Check className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UnitLessons;
