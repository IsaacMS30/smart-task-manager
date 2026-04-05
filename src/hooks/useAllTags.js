import { useMemo } from 'react';
import { useTasks } from './useTasks';

/**
 * Hook for getting all unique tags
 */
export function useAllTags() {
  const { tasks } = useTasks();

  return useMemo(() => {
    const tagSet = new Set();
    tasks.forEach((task) => {
      task.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [tasks]);
};
