import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// cva (Class Variance Authority) is a utility for creating maintainable className variants
// It allows us to define a base style and different variants that can be applied through props
const buttonVariants = cva(
  // Base classes that are always applied
  "inline-flex items-center justify-center rounded-lg transition-colors",
  {
    // Define different variant groups - each becomes a prop on the Button component
    variants: {
      // variant prop: different button styles
      variant: {
        default: "bg-emerald-500 text-white hover:bg-emerald-600",
        outline: "border-2 border-gray-200 hover:border-gray-300",
        answer: "w-full text-left transition-all",
      },
      // state prop: different button states (selected, correct, etc.)
      state: {
        default: "bg-white hover:bg-gray-50",
        hover: "bg-gray-100",
        selected: "bg-blue-50 hover:bg-blue-100",
        completed: "bg-emerald-50 hover:bg-emerald-100",
        correct: "bg-green-100",
        incorrect: "bg-red-100",
        disabled: "opacity-50 cursor-not-allowed",
      },
      // size prop: different button sizes
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        answer: "min-h-[60px] max-h-[100px] p-3",
      },
    },
    // Default values used when variants aren't specified
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  },
);

// Button component that uses the variants defined above
// cn() is a utility that merges class names and handles undefined/null values
// It combines Tailwind classes while avoiding conflicts and duplicates
const Button = ({
  className, // Additional classes passed to the button
  variant, // Style variant (default, outline, exercise)
  size, // Size variant (default, sm, lg, exercise)
  state, // State variant (default, selected, correct, incorrect, disabled)
  ...props // All other props passed to the button element
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, state, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
