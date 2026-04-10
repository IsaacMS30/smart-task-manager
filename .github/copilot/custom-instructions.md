# Purpose

This document defines the **technical standards, architectural decisions, and best practices** for the Smart Task Manager application.

All code must follow these guidelines to ensure:
- High code quality
- Maintainability
- Scalability
- Consistency across the entire application

---

## Architecture Overview

- The application is built using **React with functional components only**
- State management is handled using:
  - `useReducer` → for complex state logic
  - `useContext` → for global state access
- The app follows a **centralized state management approach**
- Data persistence is handled via **localStorage**, abstracted through a dedicated layer
- The architecture must remain **modular, scalable, and easy to refactor**

---

## Project Structure

src/
├── components/ # Reusable UI components (presentational)
├── pages/ # Route-level components
├── context/ # Global state (Context + Reducer)
├── hooks/ # Custom reusable hooks
├── services/ # Data handling (localStorage abstraction)
├── utils/ # Helper functions
└── routes/ # Routing configuration


---

## Core Principle: Best Practices First

All development must follow **React and frontend best practices** at all times.

This includes:
- Writing clean, readable, and maintainable code
- Avoiding shortcuts that compromise structure
- Prioritizing scalability over quick fixes
- Keeping logic predictable and centralized

If there is a trade-off, always choose the solution that:
👉 Improves long-term maintainability and code quality

---

## State Management Rules

### 1. Global State
- Must be handled exclusively via **Context + useReducer**
- No prop drilling for shared or global data

---

### 2. Reducer Guidelines
- Reducers must be **pure functions**
- State must be **immutable**
- No side effects inside reducers

#### Action format:
```js
{
  type: 'ACTION_TYPE',
  payload: {}
}
```

- Action types must be defined as constants
- Logic must remain simple and predictable

### 3. APIContext Pattern (Mandatory)

Even without a backend, the app must simulate a proper data layer.

- All data operations must go through a centralized context API
- Components must NOT directly access or modify data sources

### Correct
```js
const { addTask } = useTasks();
addTask(task);
```

### Incorrect
```js
localStorage.setItem('tasks', ...)
```

## Persistence Rules

- localStorage must be fully abstracted
- Use:
    - services/storageService.js
    - or a custom hook like usePersistedReducer
- The entire application state should be stored under a single key
- Persistence must be:
    - automatic
    - consistent
    - transparent to components

## Custom Hooks Guidelines
- Business logic must be extracted into custom hooks
- Hooks are the primary way to reuse logic
- Rules:
    - Must start with use
    - Must be reusable and isolated
    - Must NOT contain UI logic

## Component Design Rules

Components must follow separation of concerns:

### 1. UI Components (Presentational)
- Focus only on rendering
- Receive data via props
- No business logic
### 2. Container Components (Logic)
- Handle state and behavior
- Connect to hooks/context
### General Rules:
- Keep components small and focused
- Avoid deeply nested components
- Prefer composition over complexity

## Routing Guidelines
- Use React Router with:
    - nested routes
    - dynamic routes (e.g., /projects/:projectId)
- Define routes centrally in /routes
- Include:
    - default routes
    - fallback (404) route

## Styling Guidelines
Keep a minimalist style for the application.
- Use a consistent styling approach (choose one):
    - CSS Modules
    - Tailwind
    - Styled Components

Avoid:
- mixing multiple styling strategies
- excessive inline styles

## Code Quality Standards
All code must:

- Be readable and self-explanatory
- Use descriptive naming
- Follow consistent formatting
- Avoid duplication (DRY principle)
- Prefer simple and clear logic over clever solutions

## Anti-Patterns (Strictly Forbidden)
- Direct use of localStorage inside components
- Mutating state directly
- Large, monolithic components
- Prop drilling for global state
- Mixing business logic with UI rendering
- Uncontrolled side effects