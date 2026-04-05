import { useApp } from './useApp';

/**
 * Hook for project operations
 */
export function useProjects() {
  const { state, addProject, updateProject, deleteProject } = useApp();
  return {
    projects: state.projects,
    addProject,
    updateProject,
    deleteProject,
  };
};
