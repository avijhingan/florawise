// SingleChoiceExercise: Exercise type where users select one correct answer from multiple options
import React from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EXERCISE_TIMING } from "@/constants/exercise";
import { showToast } from "@/helpers/toast";

import BaseExercise from "./Base";

class SingleChoiceExercise extends BaseExercise {
  constructor(props) {
    super(props);
    // Extend base state with single-choice specific properties
    this.state = {
      ...this.state,
      questionIndex: 0, // Current question being displayed
      selectedAnswer: null, // User's selected answer
      isAnswered: false, // Whether current question has been answered
    };
  }

  // Handle user selecting an answer
  // Checks correctness and shows feedback
  handleAnswerSelect = (answer) => {
    if (this.state.isAnswered) return;

    const isCorrect =
      answer === this.props.questions[this.state.questionIndex].correct;

    if (isCorrect) {
      showToast.correct();
      this.setState({ selectedAnswer: answer, isAnswered: true });

      setTimeout(() => {
        if (this.state.questionIndex < this.props.questions.length - 1) {
          this.setState((prev) => ({
            questionIndex: prev.questionIndex + 1,
            selectedAnswer: null,
            isAnswered: false,
          }));
        } else {
          setTimeout(() => {
            this.handleComplete();
          }, 300);
        }
      }, EXERCISE_TIMING.FEEDBACK_DELAY);
    } else {
      showToast.incorrect();
      setTimeout(() => {
        this.setState({ selectedAnswer: null });
      }, EXERCISE_TIMING.FEEDBACK_DELAY);
    }
  };

  // Render the current question and answer options
  renderExercise() {
    const { questions } = this.props;
    const { questionIndex, selectedAnswer, isAnswered } = this.state;
    const currentQuestion = questions[questionIndex];

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl mb-6">{currentQuestion.question}</h2>

        {currentQuestion.image && (
          <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100 mb-6">
            <img
              src={currentQuestion.image}
              alt="Plant"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => this.handleAnswerSelect(option)}
              disabled={isAnswered}
              variant="answer"
              size="answer"
              state={
                isAnswered && selectedAnswer === option
                  ? selectedAnswer === currentQuestion.correct
                    ? "correct"
                    : "incorrect"
                  : selectedAnswer === option
                    ? "selected"
                    : "default"
              }
            >
              <div className="line-clamp-3 text-sm sm:text-base">{option}</div>
            </Button>
          ))}
        </div>

        <Progress
          current={questionIndex + (isAnswered ? 1 : 0)}
          total={questions.length}
        />
      </div>
    );
  }
}

export default SingleChoiceExercise;
