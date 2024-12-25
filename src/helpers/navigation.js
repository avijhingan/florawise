// Helper functions for generating consistent route paths
export const generatePath = {
  // Navigate to a specific track's units
  trackUnits: (trackId) => `/tracks/${trackId}`,

  // Navigate to a specific unit's lessons
  unitLessons: (trackId, unitId) => `/tracks/${trackId}/units/${unitId}`,

  // Navigate to a specific lesson
  lessonDetail: (trackId, unitId, lessonId) =>
    `/tracks/${trackId}/units/${unitId}/lessons/${lessonId}`,
};
