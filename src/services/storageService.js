/**
 * Storage Service
 * Handles all localStorage operations with a centralized abstraction layer
 */

const STORAGE_KEY = 'smartTaskManager';

// Default initial state
const defaultState = {
  projects: [],
  tasks: [],
  theme: 'light',
  history: {
    past: [],
    present: null,
    future: [],
  },
};

/**
 * Retrieve the entire application state from localStorage
 * @returns {Object} The stored state or default state
 */
export function getState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultState;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultState;
  }
};

/**
 * Save the entire application state to localStorage
 * @param {Object} state - The state to persist
 */
export function setState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

/**
 * Clear all stored data
 */
export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Initialize storage with default values if empty
 */
export function initializeStorage() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    setState(defaultState);
  }
};
