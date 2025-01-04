import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const LessonContent = ({ content, onComplete }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const currentSection = content.sections[currentSectionIndex];

  const handleNext = () => {
    if (currentSectionIndex < content.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Section content */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{currentSection.title}</h2>

        {currentSection.image && (
          <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100 mb-4">
            <img
              src={currentSection.image}
              alt={currentSection.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <p className="text-gray-600 mb-6">{currentSection.text}</p>

        {currentSection.keyPoints && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Key Points</h3>
            <ul className="list-disc list-inside space-y-1">
              {currentSection.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-600">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Progress
          value={((currentSectionIndex + 1) / content.sections.length) * 100}
          className="flex-1 mr-4"
        />
        <Button onClick={handleNext}>
          {currentSectionIndex < content.sections.length - 1 ? (
            <>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Complete Lesson"
          )}
        </Button>
      </div>
    </div>
  );
};

export default LessonContent;
