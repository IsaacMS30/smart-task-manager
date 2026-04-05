import { useMemo } from 'react';
import { useTasks } from './useTasks';
import { useProjects } from './useProjects';

/**
 * Hook for dashboard statistics
 */
export function useDashboardStats() {
  const { tasks } = useTasks();
  const { projects } = useProjects();

  return useMemo(() => {
    const completedTasks = tasks.filter((task) => task.status === 'Done').length;
    const pendingTasks = tasks.filter((task) => task.status !== 'Done').length;
    const overdueTasks = tasks.filter((task) => {
      if (task.status === 'Done' || !task.dueDate) return false;
      return new Date(task.dueDate) < new Date();
    }).length;

    const highPriorityTasks = tasks.filter((task) => task.priority === 'High').length;

    return {
      totalProjects: projects.length,
      totalTasks: tasks.length,
      completedTasks,
      pendingTasks,
      overdueTasks,
      highPriorityTasks,
      completionPercentage:
        tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0,
    };
  }, [tasks, projects]);
};
