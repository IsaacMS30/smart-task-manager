import { useApp } from '../context/AppContext';

/**
 * Hook for theme operations
 */
export function useTheme() {
  const { state, setTheme } = useApp();
  
  return {
    theme: state.theme,
    setTheme,
    isDark: state.theme === 'dark',
  };
};
