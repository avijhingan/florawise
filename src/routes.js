export const ROUTES = {
    HOME: '/',
    TRACKS: '/tracks',
    TRACK_DETAIL: '/tracks/:trackId',
    LESSONS: '/lessons',
    LESSON_DETAIL: '/lessons/:unitId/:lessonId',
    SETTINGS: '/settings'
  };
  
  // Helper function to generate dynamic routes
  export const generatePath = {
    trackDetail: (trackId) => `/tracks/${trackId}`,
    lessonDetail: (unitId, lessonId) => `/lessons/${unitId}/${lessonId}`
  };