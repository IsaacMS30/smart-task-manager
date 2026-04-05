import { useMemo } from 'react';
import { useTasks } from './useTasks';

/**
 * Hook for filtering and searching tasks
 */
export function useFilteredTasks(projectId, filters = {}) {
  const { tasks } = useTasks();
  
  return useMemo(() => {
    let filtered = projectId
      ? tasks.filter((task) => task.projectId === projectId)
      : tasks;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((task) => filters.status.includes(task.status));
    }

    // Apply priority filter
    if (filters.priority && filters.priority.length > 0) {
      filtered = filtered.filter((task) => filters.priority.includes(task.priority));
    }

    // Apply tag filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((task) =>
        filters.tags.some((tag) => task.tags.includes(tag))
      );
    }

    return filtered;
  }, [tasks, projectId, filters]);
};
