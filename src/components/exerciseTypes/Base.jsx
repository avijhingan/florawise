import { ArrowRight, Trophy } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { STYLE_GUIDE } from "@/styles";

class BaseExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
    };
  }

  // Mark exercise as complete and trigger completion callback
  handleComplete = () => {
    this.setState({ isComplete: true });
    const { onComplete } = this.props;
    if (onComplete) {
      onComplete();
    }
  };

  // Render completion screen with next steps
  // Shows different buttons based on available next content
  renderCompletionScreen() {
    const { nextLesson, nextUnit, onNextLesson, onNextUnit, onReturnToTrack } =
      this.props;

    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-emerald-50 rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
          <p className="text-gray-600">Great job completing this lesson!</p>
        </div>

        <div className="space-y-4">
          {nextLesson && (
            <Button
              onClick={() => onNextLesson(nextLesson.id)}
              className="w-full"
            >
              Next Lesson: {nextLesson.title}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {!nextLesson && nextUnit && (
            <Button onClick={() => onNextUnit(nextUnit.id)} className="w-full">
              Start Next Unit: {nextUnit.title}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {!nextLesson && !nextUnit && (
            <Button onClick={onReturnToTrack} className="w-full">
              Return to Unit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Abstract method that must be implemented by child classes
  // Renders the actual exercise content
  renderExercise() {
    throw new Error("renderExercise must be implemented");
  }

  // Main render method
  // Shows either completion screen or exercise content
  render() {
    const { isComplete } = this.state;

    if (isComplete) {
      return this.renderCompletionScreen();
    }

    return this.renderExercise();
  }

  getButtonStyles(state) {
    return cn(
      STYLE_GUIDE.buttons.base,
      state === "correct" && STYLE_GUIDE.buttons.variants.default,
      state === "incorrect" && STYLE_GUIDE.buttons.variants.destructive,
    );
  }
}

export default BaseExercise;
