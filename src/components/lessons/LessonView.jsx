import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/routes';
import { showToast } from '@/utils/toast';
import { BOTANY_TRACK } from '@/data/learningTracks';
import { useProgress } from '@/context/ProgressContext';

const LessonView = () => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const { actions } = useProgress();
  
  const unit = BOTANY_TRACK.units.find(u => u.id === unitId);
  const lesson = unit?.lessons.find(l => l.id === lessonId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  if (!lesson) {
    return <Navigate to={ROUTES.LESSONS} replace />;
  }

  if (shouldRedirect) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-emerald-600">Lesson Complete!</h1>
          <p className="text-gray-600">Great job! Returning to lessons...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = lesson.questions[currentQuestionIndex];

  const handleBack = () => {
    navigate(ROUTES.LESSONS);
  };

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === currentQuestion.correct;
    if (isCorrect) {
      showToast.correct();
    } else {
      showToast.incorrect();
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (isCorrect) {
        if (currentQuestionIndex < lesson.questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          // First update the progress
          actions.completeLesson(lessonId, unitId);
          // Show the completion screen
          setShouldRedirect(true);
          // Navigate after showing the completion screen
          setTimeout(() => {
            navigate(ROUTES.LESSONS, { 
              replace: true,
              state: { completedLessonId: lessonId } 
            });
          }, 1000);
        }
      }
    }, 500);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p className="text-sm text-gray-500">{lesson.description}</p>
        </div>
      </div>

      {currentQuestion && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl mb-6">{currentQuestion.question}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  showFeedback
                    ? option === currentQuestion.correct
                      ? 'bg-green-100'
                      : option === selectedAnswer
                      ? 'bg-red-100'
                      : 'bg-gray-50'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-4 h-1 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(currentQuestionIndex / lesson.questions.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonView;