import React from "react";

import { Button } from "@/components/ui/button";
import { showToast } from "@/helpers/toast";
import { cn } from "@/lib/utils";

import BaseExercise from "./Base";

class FlashcardExercise extends BaseExercise {
  constructor(props) {
    super(props);
    this.state = {
      cardIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      correctAnswers: 0,
    };
  }

  moveToNextCard = () => {
    const { cards } = this.props;
    if (this.state.cardIndex < cards.length - 1) {
      this.setState({
        cardIndex: this.state.cardIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
      });
    } else {
      this.props.onComplete();
    }
  };

  handleAnswerSelect = (option) => {
    if (this.state.isAnswered) return;

    const { cards } = this.props;
    const currentCard = cards[this.state.cardIndex];
    const isCorrect = option === currentCard.correct;

    this.setState({
      selectedAnswer: option,
      isAnswered: true,
      correctAnswers: isCorrect
        ? this.state.correctAnswers + 1
        : this.state.correctAnswers,
    });

    if (isCorrect) {
      showToast.correct();
      setTimeout(this.moveToNextCard, 1000);
    } else {
      showToast.incorrect();
      setTimeout(() => {
        this.setState({
          selectedAnswer: null,
          isAnswered: false,
        });
      }, 1000);
    }
  };

  renderExercise() {
    const { cards } = this.props;
    const { cardIndex, selectedAnswer, isAnswered, correctAnswers } =
      this.state;
    const currentCard = cards[cardIndex];

    return (
      <div className="space-y-6">
        {/* Card Image */}
        <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={currentCard.image}
            alt="Plant"
            className="object-cover w-full h-full"
          />
        </div>

        <h2 className="text-lg font-medium text-center">
          {currentCard.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentCard.options.map((option) => (
            <Button
              key={option}
              onClick={() => this.handleAnswerSelect(option)}
              disabled={isAnswered}
              variant="outline"
              className={cn(
                "h-auto py-4 px-6",
                isAnswered &&
                  selectedAnswer === option &&
                  (option === currentCard.correct
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"),
              )}
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(correctAnswers / cards.length) * 100}%`,
            }}
          />
        </div>
      </div>
    );
  }
}

export default FlashcardExercise;
