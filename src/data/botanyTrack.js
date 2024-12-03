const BOTANY_TRACK = {
  id: 'botany',
  title: 'General Botany',
  description: 'Foundation of plant science and biology',
  units: [
    {
      id: 1,
      title: 'Plant Basics',
      description: 'Foundation concepts of plant life',
      lessons: [
        {
          id: '1-1',
          title: 'Parts of a Plant',
          description: 'Learn the basic parts of a plant and their functions',
          crowns: 0,
          maxCrowns: 3,
          pairs: [
            { left: "Roots", right: "Absorb water and nutrients" },
            { left: "Stem", right: "Provides support and transport" },
            { left: "Leaves", right: "Make food through photosynthesis" },
            { left: "Flowers", right: "Reproductive structures" }
          ]
        },
        {
          id: '1-2',
          title: 'Plant Cell Structure',
          description: 'Explore the building blocks of plants',
          crowns: 0,
          maxCrowns: 3,
          pairs: [
            { left: "Cell Wall", right: "Provides structural support" },
            { left: "Chloroplast", right: "Site of photosynthesis" },
            { left: "Vacuole", right: "Stores water and nutrients" },
            { left: "Nucleus", right: "Contains genetic material" }
          ]
        }
      ]
    }
    // For brevity, I've included just the first unit. We can add the rest later.
  ]
};

export default BOTANY_TRACK;
