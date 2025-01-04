import React from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EXERCISE_TIMING } from "@/constants/exercise";
import { showToast } from "@/helpers/toast";

import BaseExercise from "./Base";

class MultipleChoiceExercise extends BaseExercise {
  constructor(props) {
    super(props);
    // Extend base state with multiple-choice specific properties
    this.state = {
      ...this.state,
      questionIndex: 0, // Current question being displayed
      selectedAnswers: [], // Array of user's selected answers
      isAnswered: false, // Whether current question has been answered
    };
  }

  // Toggle an answer selection
  // Adds or removes the answer from selectedAnswers array
  handleAnswerToggle = (answer) => {
    if (this.state.isAnswered) return;

    this.setState((prev) => ({
      selectedAnswers: prev.selectedAnswers.includes(answer)
        ? prev.selectedAnswers.filter((a) => a !== answer)
        : [...prev.selectedAnswers, answer],
    }));
  };

  // Check if selected answers match the correct answers
  // Returns true if arrays have same elements (order independent)
  checkAnswers = () => {
    const { questions } = this.props;
    const { questionIndex, selectedAnswers } = this.state;
    const currentQuestion = questions[questionIndex];

    // Sort both arrays to compare regardless of order
    const sortedSelected = [...selectedAnswers].sort();
    const sortedCorrect = [...currentQuestion.correct].sort();

    return JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);
  };

  // Handle user submitting their answer selections
  // Checks correctness and shows feedback
  handleSubmit = () => {
    if (this.state.isAnswered) return;

    const isCorrect = this.checkAnswers();

    if (isCorrect) {
      showToast.correct();
      this.setState({ isAnswered: true });

      setTimeout(() => {
        if (this.state.questionIndex < this.props.questions.length - 1) {
          this.setState((prev) => ({
            questionIndex: prev.questionIndex + 1,
            selectedAnswers: [],
            isAnswered: false,
          }));
        } else {
          this.handleComplete();
        }
      }, EXERCISE_TIMING.FEEDBACK_DELAY);
    } else {
      showToast.incorrect();
      setTimeout(() => {
        this.setState({ selectedAnswers: [] });
      }, EXERCISE_TIMING.FEEDBACK_DELAY);
    }
  };

  // Render the current question and answer options
  renderExercise() {
    const { questions } = this.props;
    const { questionIndex, selectedAnswers, isAnswered } = this.state;
    const currentQuestion = questions[questionIndex];

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl mb-6">{currentQuestion.question}</h2>

        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => this.handleAnswerToggle(option)}
              disabled={isAnswered && selectedAnswers.length > 0}
              variant="answer"
              size="answer"
              state={selectedAnswers.includes(option) ? "selected" : "default"}
            >
              {option}
            </Button>
          ))}
        </div>

        {selectedAnswers.length > 0 && !isAnswered && (
          <Button onClick={this.handleSubmit} className="w-full">
            Submit
          </Button>
        )}

        <Progress current={questionIndex} total={questions.length} />
      </div>
    );
  }
}

export default MultipleChoiceExercise;
