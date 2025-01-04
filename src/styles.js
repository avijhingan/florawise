export const STYLE_GUIDE = {
  // Colors (matching CSS variables from app_globals.css)
  colors: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    card: {
      DEFAULT: "hsl(var(--card))",
      foreground: "hsl(var(--card-foreground))",
    },
    popover: {
      DEFAULT: "hsl(var(--popover))",
      foreground: "hsl(var(--popover-foreground))",
    },
    primary: {
      DEFAULT: "hsl(var(--primary))",
      foreground: "hsl(var(--primary-foreground))",
    },
    secondary: {
      DEFAULT: "hsl(var(--secondary))",
      foreground: "hsl(var(--secondary-foreground))",
    },
    muted: {
      DEFAULT: "hsl(var(--muted))",
      foreground: "hsl(var(--muted-foreground))",
    },
    accent: {
      DEFAULT: "hsl(var(--accent))",
      foreground: "hsl(var(--accent-foreground))",
    },
    destructive: {
      DEFAULT: "hsl(var(--destructive))",
      foreground: "hsl(var(--destructive-foreground))",
    },
  },

  // Card Styles (using Tailwind config color tokens)
  cards: {
    base: "bg-card text-card-foreground rounded-lg border shadow-sm",
    interactive: "hover:shadow-md transition-shadow cursor-pointer",
    unit: {
      base: "bg-card text-card-foreground rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow cursor-pointer",
      image: "w-full h-32 rounded-lg mb-4 object-cover",
      title: "text-xl font-bold mb-2",
      description: "text-sm text-muted-foreground",
    },
    lesson: {
      base: "p-4 rounded-lg cursor-pointer transition-colors",
      completed: "bg-primary/10 hover:bg-primary/20",
      incomplete: "bg-muted hover:bg-muted/80",
    },
  },

  // Layout (using container config from tailwind.config.cjs)
  layout: {
    container: "container mx-auto px-4 sm:px-6 lg:px-8",
    grid: "grid gap-6 md:grid-cols-2",
    section: "space-y-6",
  },

  // Chart Colors (from app_globals.css)
  charts: {
    colors: [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ],
  },

  // Shadows (using Tailwind defaults)
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  },

  // Border Radius (using radius from app_globals.css)
  radius: {
    sm: "rounded-sm", // calc(var(--radius) - 4px)
    md: "rounded-md", // calc(var(--radius) - 2px)
    lg: "rounded-lg", // var(--radius)
    full: "rounded-full",
  },

  // Button Variants (matching button.jsx cva)
  buttons: {
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
  },
};
