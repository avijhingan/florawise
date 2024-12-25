export const STYLE_GUIDE = {
  // Colors
  colors: {
    primary: {
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e",
      600: "#16a34a",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      500: "#6b7280",
      600: "#4b5563",
    },
  },

  // Card Styles
  cards: {
    unit: {
      base: "bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer",
      image: "w-full h-32 rounded-lg mb-4 object-cover",
      title: "text-xl font-bold mb-2",
      description: "text-sm text-gray-500",
    },
    lesson: {
      base: "p-4 rounded-lg cursor-pointer transition-colors",
      completed: "bg-emerald-50 hover:bg-emerald-100",
      incomplete: "bg-gray-50 hover:bg-gray-100",
    },
  },

  // Layout
  layout: {
    container: "p-6 max-w-2xl mx-auto",
    grid: "grid gap-6 md:grid-cols-2",
  },
};
