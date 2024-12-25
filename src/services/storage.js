/**
 * Service for handling local storage operations
 * A centralized way to manage user progress persistence
 */
export class StorageService {
  // Storage key for progress data
  static STORAGE_KEY = "florawise-progress";

  /**
   * Retrieves progress data from local storage
   * Handles JSON parsing and error cases
   * @returns {Object|null} The stored progress data or null if not found/invalid
   */
  static getProgress() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading progress from storage:", error);
      return null;
    }
  }

  /**
   * Saves progress data to local storage
   * Handles JSON stringification and error cases
   * @param {Object} progress - The progress data to store
   */
  static setProgress(progress) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Error saving progress to storage:", error);
    }
  }
}
