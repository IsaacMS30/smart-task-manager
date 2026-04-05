import { useApp } from '../context/AppContext';

/**
 * Hook for undo/redo operations
 */
export function useHistory() {
  const { undo, redo, canUndo, canRedo } = useApp();
  
  return {
    undo,
    redo,
    canUndo: canUndo(),
    canRedo: canRedo(),
  };
};
