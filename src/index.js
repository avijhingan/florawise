/**
 * @typedef {Object} Question
 * @property {string} question
 * @property {Array<string>} options
 * @property {string} correct
 */

/**
 * @typedef {Object} Pair
 * @property {string} left
 * @property {string} right
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} type
 * @property {Array<Question>|Array<Pair>} content
 */

/**
 * @typedef {Object} Unit
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {Array<Lesson>} lessons
 */

/**
 * @typedef {Object} Track
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {Array<Unit>} units
 */

/**
 * @typedef {Object} Progress
 * @property {Object.<string, {completed: boolean, completedAt: string}>} completedLessons
 * @property {number} xp
 * @property {number} streak
 * @property {Object|null} currentLesson
 * @property {string} lastActive
 */
