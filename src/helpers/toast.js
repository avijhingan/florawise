import toast from "react-hot-toast";

// Toast style configuration
const TOAST_STYLES = {
  SUCCESS: {
    duration: 2000,
    icon: "✅",
  },
  ERROR: {
    duration: 3000,
    icon: "❌",
  },
  INFO: {
    duration: 2000,
    icon: "ℹ️",
  },
};

// Toast message helper with predefined messages and consistent styling
export const showToast = {
  // Generic toast types
  success: (message) => toast.success(message, TOAST_STYLES.SUCCESS),
  error: (message) => toast.error(message, TOAST_STYLES.ERROR),
  info: (message) => toast(message, TOAST_STYLES.INFO),

  // Application-specific toast messages
  unimplemented: () =>
    toast("Coming soon! This feature is under development", {
      ...TOAST_STYLES.INFO,
      icon: "🚧",
    }),

  lessonComplete: () =>
    toast.success("Lesson completed! Keep up the great work!", {
      ...TOAST_STYLES.SUCCESS,
      duration: 3000,
    }),

  xpGain: (amount) =>
    toast.success(`+${amount} XP`, {
      ...TOAST_STYLES.SUCCESS,
      icon: "✨",
    }),

  resetProgress: () =>
    toast.success("Progress reset successfully", TOAST_STYLES.SUCCESS),

  correct: () => toast.success("Correct!", TOAST_STYLES.SUCCESS),

  incorrect: () =>
    toast.error("Not quite right. Try again!", {
      ...TOAST_STYLES.ERROR,
      duration: 2000,
    }),
};
