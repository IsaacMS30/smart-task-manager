import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

/**
 * Main hook to access the entire app context
 */
function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default useApp;
