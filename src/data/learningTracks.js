export const BOTANY_TRACK = {
  id: 'botany',
  title: 'General Botany',
  description: 'Foundation of plant science and biology',
  units: [
    {
      id: 'botany-unit-1',
      title: 'Plant Basics',
      lessons: [
        {
          id: 'botany-1-1',
          unitId: 'botany-unit-1',
          title: 'Parts of a Plant',
          description: 'Learn the basic parts of a plant and their functions',
          pairs: [
            { left: "Roots", right: "Absorb water and nutrients" },
            { left: "Stem", right: "Provides support and transport" },
            { left: "Leaves", right: "Make food through photosynthesis" },
            { left: "Flowers", right: "Reproductive structures" }
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