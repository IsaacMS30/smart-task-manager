/**
 * App Component
 * Root component that provides the application structure
 */

import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Routes from './routes';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize theme from localStorage
    const savedState = localStorage.getItem('smartTaskManager');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        if (state.theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      } catch (error) {
        console.error('Error parsing saved state:', error);
      }
    }
  }, []);

  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
