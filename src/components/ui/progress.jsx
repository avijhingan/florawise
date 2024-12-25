import React from "react";

import { cn } from "@/lib/utils";

// Progress bar component for tracking completion
// current: current value (e.g., questionIndex)
// total: total value (e.g., questions.length)
const Progress = ({ current, total, className }) => {
  return (
    <div className={cn("mt-4 h-1 bg-gray-100 rounded-full", className)}>
      <div
        className="h-full bg-emerald-500 transition-all duration-300"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
};

export { Progress };
