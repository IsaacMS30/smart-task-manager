import React, { createContext, useReducer, useEffect } from 'react';
import { rootReducer } from './reducers';
import { getState, setState, initializeStorage } from '../services/storageService';
import { PROJECT_ACTIONS, TASK_ACTIONS, THEME_ACTIONS, HISTORY_ACTIONS} from './constants';

export const AppContext = createContext();

const initialState = {
  projects: [],
  tasks: [],
  theme: 'light',
  history: {
    past: [],
    present: null,
    future: [],
  },
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  // Initialize state from localStorage on mount
  useEffect(() => {
    initializeStorage();
    const savedState = getState();
    
    // Dispatch to set initial state from storage
    if (savedState.projects.length > 0) {
      dispatch({
        type: PROJECT_ACTIONS.SET_PROJECTS,
        payload: savedState.projects,
      });
    }
    if (savedState.tasks.length > 0) {
      dispatch({
        type: TASK_ACTIONS.SET_TASKS,
        payload: savedState.tasks,
      });
    }
    if (savedState.theme && savedState.theme !== 'light') {
      dispatch({
        type: THEME_ACTIONS.SET_THEME,
        payload: savedState.theme,
      });
    }
  }, []);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    setState(state);
  }, [state]);

  // API-like methods for components
  const value = {
    state,
    dispatch,

    // Project API
    addProject: (name, description = '') => {
      dispatch({
        type: PROJECT_ACTIONS.ADD_PROJECT,
        payload: { name, description },
      });
    },

    updateProject: (id, updates) => {
      dispatch({
        type: PROJECT_ACTIONS.UPDATE_PROJECT,
        payload: { id, updates },
      });
    },

    deleteProject: (id) => {
      // Also delete all tasks in this project
      const tasksToDelete = state.tasks
        .filter((task) => task.projectId === id)
        .map((task) => task.id);
      
      dispatch({
        type: PROJECT_ACTIONS.DELETE_PROJECT,
        payload: { id },
      });

      if (tasksToDelete.length > 0) {
        dispatch({
          type: TASK_ACTIONS.BULK_DELETE_TASKS,
          payload: { ids: tasksToDelete },
        });
      }
    },

    // Task API
    addTask: (projectId, title, description = '', status = 'To Do', priority = 'Medium', tags = [], dueDate = null) => {
      dispatch({
        type: TASK_ACTIONS.ADD_TASK,
        payload: { projectId, title, description, status, priority, tags, dueDate },
      });
    },

    updateTask: (id, updates) => {
      dispatch({
        type: TASK_ACTIONS.UPDATE_TASK,
        payload: { id, updates },
      });
    },

    deleteTask: (id) => {
      dispatch({
        type: TASK_ACTIONS.DELETE_TASK,
        payload: { id },
      });
    },

    bulkDeleteTasks: (ids) => {
      dispatch({
        type: TASK_ACTIONS.BULK_DELETE_TASKS,
        payload: { ids },
      });
    },

    bulkUpdateTasks: (ids, updates) => {
      dispatch({
        type: TASK_ACTIONS.BULK_UPDATE_TASKS,
        payload: { ids, updates },
      });
    },

    // Theme API
    setTheme: (theme) => {
      dispatch({
        type: THEME_ACTIONS.SET_THEME,
        payload: theme,
      });
    },

    // History API (Undo/Redo)
    pushHistory: (snapshot) => {
      dispatch({
        type: HISTORY_ACTIONS.PUSH_HISTORY,
        payload: snapshot,
      });
    },

    undo: () => {
      dispatch({
        type: HISTORY_ACTIONS.UNDO,
      });
    },

    redo: () => {
      dispatch({
        type: HISTORY_ACTIONS.REDO,
      });
    },

    canUndo: () => state.history.past.length > 0,
    canRedo: () => state.history.future.length > 0,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
