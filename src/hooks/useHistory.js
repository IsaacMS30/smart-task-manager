import useApp from './useApp';

/**
 * Hook for undo/redo operations
 */
function useHistory() {
  const { undo, redo, canUndo, canRedo } = useApp();
  
  return {
    undo,
    redo,
    canUndo: canUndo(),
    canRedo: canRedo(),
  };
};

export default useHistory;
