import { EXERCISE_TYPES } from "@/constants/exercise";

export const BOTANY_TRACK = {
  id: "botany",
  title: "Botany",
  description: "Learn about plants and their structures",
  units: [
    {
      id: "plant-basics",
      title: "Plant Basics",
      description: "Learn the fundamental parts of a plant",
      lessons: [
        {
          id: "plant-parts",
          title: "Basic Plant Parts",
          description: "Learn about the main parts of a plant",
          type: EXERCISE_TYPES.SINGLE_CHOICE,
          questions: [
            {
              question:
                "What part of the plant absorbs water and nutrients from the soil?",
              options: ["Roots", "Leaves", "Stem", "Flower"],
              correct: "Roots",
            },
            {
              question: "Which plant part is responsible for photosynthesis?",
              options: ["Leaves", "Roots", "Seeds", "Stem"],
              correct: "Leaves",
            },
            {
              question: "What is the main function of a plant's stem?",
              options: [
                "Support and transport nutrients",
                "Produce seeds",
                "Absorb water",
                "Create oxygen",
              ],
              correct: "Support and transport nutrients",
            },
          ],
        },
        {
          id: "photosynthesis",
          title: "Understanding Photosynthesis",
          description: "Learn how plants make their own food",
          type: EXERCISE_TYPES.MULTIPLE_CHOICE,
          questions: [
            {
              question: "What do plants need for photosynthesis?",
              options: ["Sunlight", "Water", "Carbon dioxide", "Soil"],
              correct: ["Sunlight", "Water", "Carbon dioxide"],
            },
            {
              question: "What does photosynthesis produce?",
              options: ["Oxygen", "Glucose", "Carbon dioxide", "Nitrogen"],
              correct: ["Oxygen", "Glucose"],
            },
          ],
        },
        {
          id: "plant-terms",
          title: "Plant Terminology",
          description: "Match basic plant terms with their definitions",
          type: EXERCISE_TYPES.MATCHING,
          pairs: [
            {
              left: "Photosynthesis",
              right: "Process of making food using sunlight",
            },
            {
              left: "Chlorophyll",
              right: "Green pigment that absorbs light",
            },
            {
              left: "Germination",
              right: "Process of a seed starting to grow",
            },
          ],
        },
      ],
    },
  ],
};
