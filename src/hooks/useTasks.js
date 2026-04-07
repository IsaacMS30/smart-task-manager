import useApp from './useApp';

/**
 * Hook for tasks operations
 */
function useTasks() {
  const { state, addTask, updateTask, deleteTask, bulkDeleteTasks, bulkUpdateTasks } = useApp();
  return {
    tasks: state.tasks,
    addTask,
    updateTask,
    deleteTask,
    bulkDeleteTasks,
    bulkUpdateTasks,
  };
};

export default useTasks;
