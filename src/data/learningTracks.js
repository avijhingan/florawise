export const BOTANY_TRACK = {
  id: 'botany',
  title: 'Plant Basics',
  description: 'Learn the fundamental concepts of plant structure and function',
  units: [
    {
      id: 'plant-parts',
      title: 'Parts of a Plant',
      lessons: [
        {
          id: 'basic-parts',
          title: 'Basic Plant Structure',
          description: 'Learn the main parts of a plant',
          type: 'multiple-choice',
          questions: [
            {
              question: "Which part of the plant absorbs water and nutrients?",
              options: ["Roots", "Leaves", "Stem", "Flowers"],
              correct: "Roots"
            },
            {
              question: "What is the main function of leaves?",
              options: [
                "Photosynthesis",
                "Water absorption",
                "Reproduction",
                "Support"
              ],
              correct: "Photosynthesis"
            }
          ]
        }
      ]
    }
  ]
};

export const GARDEN_TRACK = {
  id: 'garden',
  title: 'Garden & Landscape',
  description: 'Practical knowledge for growing and maintaining a beautiful garden',
  units: [
    {
      id: 'garden-unit-1',
      title: 'Soil Basics',
      lessons: [
        {
          id: 'garden-1-1',
          unitId: 'garden-unit-1',
          title: 'Types of Soil',
          description: 'Explore different soil types and their characteristics',
          pairs: [
            { left: "Sandy Soil", right: "Well-draining, low nutrients" },
            { left: "Clay Soil", right: "Dense, retains water" },
            { left: "Loamy Soil", right: "Balanced, nutrient-rich" },
            { left: "Peat Soil", right: "Acidic, moisture-retentive" }
          ]
        }
      ]
    }
  ]
};

export const WILD_PLANTS_TRACK = {
  id: 'wild-plants',
  title: 'Wild Plants & Foraging',
  description: 'Learn to safely identify and utilize wild edible and medicinal plants',
  units: [
    {
      id: 'wild-plants-unit-1',
      title: 'Plant Identification',
      lessons: [
        {
          id: 'wild-plants-1-1',
          unitId: 'wild-plants-unit-1',
          title: 'Basic Identification',
          description: 'Learn fundamental plant identification techniques',
          pairs: [
            { left: "Leaf Shape", right: "Key identification feature" },
            { left: "Flower Color", right: "Visual identifier" },
            { left: "Stem Pattern", right: "Growth characteristic" },
            { left: "Root System", right: "Underground structure" }
          ]
        }
      ]
    }
  ]
};

export const TREES_TRACK = {
  id: 'trees',
  title: 'Trees & Forests',
  description: 'Explore the diverse world of trees and forest ecosystems',
  units: [
    {
      id: 'trees-unit-1',
      title: 'Tree Types',
      lessons: [
        {
          id: 'trees-1-1',
          unitId: 'trees-unit-1',
          title: 'Common Trees',
          description: 'Learn to identify common tree species',
          pairs: [
            { left: "Oak", right: "Acorns and lobed leaves" },
            { left: "Pine", right: "Needle-like leaves" },
            { left: "Maple", right: "Winged seeds" },
            { left: "Birch", right: "Peeling bark" }
          ]
        }
      ]
    }
  ]
};