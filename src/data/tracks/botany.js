import { EXERCISE_TYPES } from "@/constants/exercise";

export const BOTANY_TRACK = {
  id: "botany",
  title: "Botany",
  description: "Learn about plants and their structures",
  units: [
    {
      id: "basic-botany",
      title: "Basic Botany",
      description: "Learn fundamental botany concepts and terminology",
      image: "/images/mint_family.jpg",
      lessons: [
        {
          id: "intro-to-plant-types",
          title: "Introduction to Plant Types",
          description: "Learn about monocots and dicots",
          type: "LESSON",
          content: {
            sections: [
              {
                title: "Understanding Plant Classifications",
                text: "Plants are broadly classified into two major groups: monocots and dicots. These groups are distinguished by several key characteristics including seed structure, leaf veination, and flower parts.",
                image: "/images/monocot_dicot.jpg",
                keyPoints: [
                  "Monocots have one seed leaf (cotyledon)",
                  "Dicots have two seed leaves",
                  "Monocots typically have parallel leaf veins",
                  "Dicots typically have branching leaf veins",
                ],
              },
              {
                title: "Generic Flower Parts",
                text: "Flowers have four main parts that each serve specific functions in plant reproduction.",
                image: "/images/generic_flower_parts.jpg",
                keyPoints: [
                  "Sepals: Protect the flower bud",
                  "Petals: Attract pollinators",
                  "Stamens: Produce pollen",
                  "Pistils: Produce seeds",
                ],
              },
            ],
          },
        },
        {
          id: "basic-identification",
          title: "Basic Plant Identification",
          description: "Test your knowledge of monocots and dicots",
          type: "EXERCISE",
          exerciseType: EXERCISE_TYPES.SINGLE_CHOICE,
          questions: [
            {
              question:
                "This plant has parallel leaf veins. Is it a monocot or dicot?",
              image: "/images/grass_family.jpg",
              options: ["Monocot", "Dicot"],
              correct: "Monocot",
            },
            {
              question: "Which flower part protects the developing bud?",
              image: "/images/rose_family.jpg",
              options: ["Sepals", "Petals", "Stamens", "Pistils"],
              correct: "Sepals",
            },
          ],
        },
        {
          id: "characteristics-quiz",
          title: "Plant Characteristics",
          description: "Identify multiple features of monocots and dicots",
          type: "EXERCISE",
          exerciseType: EXERCISE_TYPES.MULTIPLE_CHOICE,
          questions: [
            {
              question:
                "Which characteristics are typical of monocots? (Select all that apply)",
              options: [
                "Parallel leaf veins",
                "One seed leaf",
                "Flower parts in threes",
                "Branching leaf veins",
              ],
              correct: [
                "Parallel leaf veins",
                "One seed leaf",
                "Flower parts in threes",
              ],
            },
            {
              question:
                "Which flower parts are involved in reproduction? (Select all that apply)",
              options: ["Sepals", "Petals", "Stamens", "Pistils"],
              correct: ["Stamens", "Pistils"],
            },
          ],
        },
        {
          id: "matching-features",
          title: "Match Plant Features",
          description: "Match characteristics to their plant type",
          type: "EXERCISE",
          exerciseType: EXERCISE_TYPES.MATCHING,
          pairs: [
            {
              left: "One seed leaf",
              right: "Monocot",
            },
            {
              left: "Two seed leaves",
              right: "Dicot",
            },
            {
              left: "Parallel leaf veins",
              right: "Monocot",
            },
            {
              left: "Branching leaf veins",
              right: "Dicot",
            },
          ],
        },
      ],
    },
    {
      id: "plant-families",
      title: "Plant Families",
      description: "Learn to identify common plant families",
      image: "/images/rose_family.jpg",
      lessons: [
        {
          id: "family-memory",
          title: "Family Memory Game",
          description: "Match flowers from the same family",
          image: "/images/mustard_family.jpg",
          type: "EXERCISE",
          exerciseType: EXERCISE_TYPES.MEMORY,
          pairs: [
            {
              id: "rose1",
              image: "/images/rose_family.jpg",
              family: "Rosaceae",
            },
            {
              id: "rose2",
              image: "/images/rose_family.jpg",
              family: "Rosaceae",
            },
            {
              id: "mustard1",
              image: "/images/mustard_family.jpg",
              family: "Brassicaceae",
            },
            {
              id: "mustard2",
              image: "/images/mustard_family.jpg",
              family: "Brassicaceae",
            },
            {
              id: "mint1",
              image: "/images/mint_family.jpg",
              family: "Lamiaceae",
            },
            {
              id: "mint2",
              image: "/images/mint_family.jpg",
              family: "Lamiaceae",
            },
            {
              id: "parsley1",
              image: "/images/parsley_family.jpg",
              family: "Parsley",
            },
            {
              id: "parsley2",
              image: "/images/parsley_family.jpg",
              family: "Parsley",
            },
          ],
        },
        {
          id: "family-flashcards",
          title: "Family Recognition",
          description: "Practice identifying plant families",
          image: "/images/parsley_family.jpg",
          type: "EXERCISE",
          exerciseType: EXERCISE_TYPES.FLASHCARD,
          cards: [
            {
              image: "/images/rose_family.jpg",
              question: "Which plant family is this?",
              options: ["Rosaceae", "Lamiaceae", "Brassicaceae", "Apiaceae"],
              correct: "Rosaceae",
            },
            {
              image: "/images/mint_family.jpg",
              question: "Which plant family is this?",
              options: ["Lamiaceae", "Rosaceae", "Brassicaceae", "Apiaceae"],
              correct: "Lamiaceae",
            },
            {
              image: "/images/mustard_family.jpg",
              question: "Which plant family is this?",
              options: ["Brassicaceae", "Rosaceae", "Lamiaceae", "Apiaceae"],
              correct: "Brassicaceae",
            },
            {
              image: "/images/parsley_family.jpg",
              question: "Which plant family is this?",
              options: ["Apiaceae", "Rosaceae", "Lamiaceae", "Brassicaceae"],
              correct: "Apiaceae",
            },
          ],
        },
      ],
    },
  ],
};
