/**
 * Utility Functions
 * Helper functions used across the application
 */

import { TASK_STATUS, TASK_PRIORITY } from '../context/constants';

/**
 * Format date to readable format
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Check if task is overdue
 */
export const isTaskOverdue = (task) => {
  if (task.status === TASK_STATUS.DONE || !task.dueDate) {
    return false;
  }
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < today;
};

/**
 * Check if task is due today
 */
export const isTaskDueToday = (task) => {
  if (!task.dueDate) return false;
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  return (
    dueDate.getFullYear() === today.getFullYear() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getDate() === today.getDate()
  );
};

/**
 * Get priority color for styling
 */
export const getPriorityColor = (priority) => {
  switch (priority) {
    case TASK_PRIORITY.HIGH:
      return '#e74c3c';
    case TASK_PRIORITY.MEDIUM:
      return '#f39c12';
    case TASK_PRIORITY.LOW:
      return '#27ae60';
    default:
      return '#95a5a6';
  }
};

/**
 * Get status color for styling
 */
export const getStatusColor = (status) => {
  switch (status) {
    case TASK_STATUS.TODO:
      return '#3498db';
    case TASK_STATUS.IN_PROGRESS:
      return '#f39c12';
    case TASK_STATUS.DONE:
      return '#27ae60';
    default:
      return '#95a5a6';
  }
};

/**
 * Generate unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Validate project data
 */
export const validateProject = (name) => {
  if (!name || typeof name !== 'string') return false;
  return name.trim().length > 0;
};

/**
 * Validate task data
 */
export const validateTask = (title, projectId) => {
  if (!title || typeof title !== 'string') return false;
  if (!projectId || typeof projectId !== 'string') return false;
  return title.trim().length > 0;
};

/**
 * Sort tasks by a property
 */
export const sortTasks = (tasks, sortBy = 'createdAt', order = 'desc') => {
  const sorted = [...tasks].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'dueDate') {
      aValue = aValue ? new Date(aValue).getTime() : Infinity;
      bValue = bValue ? new Date(bValue).getTime() : Infinity;
    } else if (sortBy === 'createdAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return sorted;
};

/**
 * Convert priority to numeric value for sorting
 */
export const priorityToNumber = (priority) => {
  switch (priority) {
    case TASK_PRIORITY.HIGH:
      return 3;
    case TASK_PRIORITY.MEDIUM:
      return 2;
    case TASK_PRIORITY.LOW:
      return 1;
    default:
      return 0;
  }
};

/**
 * Group tasks by status
 */
export const groupTasksByStatus = (tasks) => {
  return {
    [TASK_STATUS.TODO]: tasks.filter((t) => t.status === TASK_STATUS.TODO),
    [TASK_STATUS.IN_PROGRESS]: tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS),
    [TASK_STATUS.DONE]: tasks.filter((t) => t.status === TASK_STATUS.DONE),
  };
};
