import useApp from './useApp';

/**
 * Hook for project operations
 */
function useProjects() {
  const { state, addProject, updateProject, deleteProject } = useApp();
  return {
    projects: state.projects,
    addProject,
    updateProject,
    deleteProject,
  };
};

export default useProjects;
