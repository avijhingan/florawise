// MatchingExercise: Exercise type where users match pairs of related items
import React from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EXERCISE_TIMING } from "@/constants/exercise";
import { showToast } from "@/helpers/toast";

import BaseExercise from "./Base";

class MatchingExercise extends BaseExercise {
  constructor(props) {
    super(props);
    // Extend base state with matching-specific properties
    this.state = {
      selectedLeft: null, // Currently selected item from left column
      selectedRight: null, // Currently selected item from right column
      matches: [], // Array of matched pair indices
      isAnswered: false, // Whether current pair has been answered
      isResetting: false, // Add this flag to track reset state
    };
  }

  // Handle click on an item in either column
  // If matching pair is selected, create a match
  handleClick = (side, index) => {
    // Ignore clicks if already matched or if we're in the feedback delay period
    if (this.state.matches.includes(index) || this.state.isResetting) return;

    if (side === "left") {
      this.setState({ selectedLeft: index });
      if (this.state.selectedRight !== null) {
        // Check if it's a match
        if (this.state.selectedRight === index) {
          this.createMatch(index);
        } else {
          this.handleIncorrectMatch();
        }
      }
    } else {
      this.setState({ selectedRight: index });
      if (this.state.selectedLeft !== null) {
        // Check if it's a match
        if (this.state.selectedLeft === index) {
          this.createMatch(index);
        } else {
          this.handleIncorrectMatch();
        }
      }
    }
  };

  handleIncorrectMatch = () => {
    showToast.incorrect();
    // Set flag to prevent new selections during reset
    this.setState({ isResetting: true });

    setTimeout(() => {
      this.setState({
        selectedLeft: null,
        selectedRight: null,
        isResetting: false,
      });
    }, EXERCISE_TIMING.FEEDBACK_DELAY);
  };

  // Create a match when correct pair is selected
  // Update state and check for exercise completion
  createMatch = (index) => {
    showToast.correct();

    this.setState((prev) => ({
      matches: [...prev.matches, index],
      selectedLeft: null,
      selectedRight: null,
    }));

    // Only complete when all pairs are matched
    if (this.state.matches.length + 1 === this.props.pairs.length) {
      // Wait for progress bar animation
      setTimeout(() => {
        this.handleComplete();
      }, 300); // Additional delay for progress bar animation
    }
  };

  // Render the matching exercise interface
  renderExercise() {
    const { pairs = [] } = this.props;
    const { matches, selectedLeft, selectedRight } = this.state;

    if (!pairs || pairs.length === 0) {
      return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-red-500">
            No matching pairs available for this exercise.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col space-y-2">
            {pairs.map((pair, index) => (
              <Button
                key={index}
                onClick={() => this.handleClick("left", index)}
                disabled={matches.includes(index)}
                variant="answer"
                size="answer"
                state={
                  matches.includes(index)
                    ? "correct"
                    : selectedLeft === index
                      ? "selected"
                      : "default"
                }
                className="flex-1"
              >
                <div className="line-clamp-3 text-sm sm:text-base">
                  {pair.left}
                </div>
              </Button>
            ))}
          </div>

          <div className="flex flex-col space-y-2">
            {pairs.map((pair, index) => (
              <Button
                key={index}
                onClick={() => this.handleClick("right", index)}
                disabled={matches.includes(index)}
                variant="exercise"
                size="exercise"
                state={
                  matches.includes(index)
                    ? "correct"
                    : selectedRight === index
                      ? "selected"
                      : "default"
                }
                className="flex-1" // Makes button fill available space
              >
                <div className="line-clamp-3 text-sm sm:text-base">
                  {pair.right}
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Progress
          current={
            matches.length +
            (selectedLeft === selectedRight && selectedLeft !== null ? 1 : 0)
          }
          total={pairs.length}
        />
      </div>
    );
  }
}

export default MatchingExercise;
