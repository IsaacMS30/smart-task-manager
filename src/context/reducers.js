import {
  PROJECT_ACTIONS,
  TASK_ACTIONS,
  THEME_ACTIONS,
  HISTORY_ACTIONS,
} from "./constants";

// Project Reducer
export function projectReducer(state = [], action) {
  switch (action.type) {
    case PROJECT_ACTIONS.ADD_PROJECT: {
      const newProject = {
        id: Date.now().toString(),
        name: action.payload.name,
        createdAt: new Date().toISOString(),
        description: action.payload.description || "",
      };
      return [...state, newProject];
    }

    case PROJECT_ACTIONS.UPDATE_PROJECT: {
      return state.map((project) =>
        project.id === action.payload.id
          ? { ...project, ...action.payload.updates }
          : project,
      );
    }

    case PROJECT_ACTIONS.DELETE_PROJECT: {
      return state.filter((project) => project.id !== action.payload.id);
    }

    case PROJECT_ACTIONS.SET_PROJECTS: {
      return action.payload;
    }

    case PROJECT_ACTIONS.CLEAR_PROJECTS: {
      return [];
    }

    default:
      return state;
  }
}

// Task Reducer
export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case TASK_ACTIONS.ADD_TASK: {
      const newTask = {
        id: Date.now().toString(),
        projectId: action.payload.projectId,
        title: action.payload.title,
        description: action.payload.description || "",
        status: action.payload.status || "To Do",
        priority: action.payload.priority || "Medium",
        tags: action.payload.tags || [],
        createdAt: new Date().toISOString(),
        dueDate: action.payload.dueDate || null,
      };
      return [...state, newTask];
    }

    case TASK_ACTIONS.UPDATE_TASK: {
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates }
          : task,
      );
    }

    case TASK_ACTIONS.DELETE_TASK: {
      return state.filter((task) => task.id !== action.payload.id);
    }

    case TASK_ACTIONS.BULK_DELETE_TASKS: {
      const idsToDelete = new Set(action.payload.ids);
      return state.filter((task) => !idsToDelete.has(task.id));
    }

    case TASK_ACTIONS.BULK_UPDATE_TASKS: {
      const idsToUpdate = new Set(action.payload.ids);
      return state.map((task) =>
        idsToUpdate.has(task.id)
          ? { ...task, ...action.payload.updates }
          : task,
      );
    }

    case TASK_ACTIONS.CLEAR_TASKS: {
      return [];
    }

    case TASK_ACTIONS.SET_TASKS: {
      return action.payload;
    }

    default:
      return state;
  }
};

// Theme Reducer
export const themeReducer = (state = "light", action) => {
  if (action.type === THEME_ACTIONS.SET_THEME) {
    return action.payload;
  } else {
    return state;
  }
};

// History Reducer (for undo/redo)
export const historyReducer = (
  state = { past: [], present: null, future: [] },
  action,
) => {
  switch (action.type) {
    case HISTORY_ACTIONS.PUSH_HISTORY: {
      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };
    }

    case HISTORY_ACTIONS.UNDO: {
      if (state.past.length === 0) return state;
      const newPast = [...state.past];
      const newPresent = newPast.pop();
      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future],
      };
    }

    case HISTORY_ACTIONS.REDO: {
      if (state.future.length === 0) return state;
      const newFuture = [...state.future];
      const newPresent = newFuture.shift();
      return {
        past: [...state.past, state.present],
        present: newPresent,
        future: newFuture,
      };
    }

    case HISTORY_ACTIONS.CLEAR_HISTORY: {
      return {
        past: [],
        present: action.payload || null,
        future: [],
      };
    }

    default:
      return state;
  }
};

// Root Reducer. Combines all reducers into a single state shape
export const rootReducer = (state, action) => {
  return {
    projects: projectReducer(state.projects, action),
    tasks: taskReducer(state.tasks, action),
    theme: themeReducer(state.theme, action),
    history: historyReducer(state.history, action),
  };
};
