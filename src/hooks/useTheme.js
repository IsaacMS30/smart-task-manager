import useApp from './useApp';

/**
 * Hook for theme operations
 */
function useTheme() {
  const { state, setTheme } = useApp();
  
  return {
    theme: state.theme,
    setTheme,
    isDark: state.theme === 'dark',
  };
};

export default useTheme;
