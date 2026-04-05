import { useMemo } from 'react';
import { useTasks } from './useTasks';

/**
 * Hook for getting tasks by project
 */
export function useProjectTasks(projectId) {
  const { tasks } = useTasks();
  
  return useMemo(() => {
    return tasks.filter((task) => task.projectId === projectId);
  }, [tasks, projectId]);
};
