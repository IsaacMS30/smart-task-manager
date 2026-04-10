# 🧠 Smart Task Manager

A modern, offline-first task management application built with React and Vite, designed to simulate real-world frontend architecture without relying on a backend.

---

## Overview

Smart Task Manager is a productivity-focused web application that allows users to organize their work into projects and tasks, track progress, and manage priorities — all within a fully client-side environment.

The application emphasizes **scalable frontend architecture**, **clean state management**, and **best practices**, making it both a functional tool and a learning project.

---

## Features

- 📁 Create and manage multiple projects
- ✅ Create, edit, and delete tasks
- 🔄 Update task status (To Do, In Progress, Done)
- 🔍 Search and filter tasks dynamically
- 🏷️ Tag and prioritize tasks
- 📊 Dashboard with task insights
- 🌙 Light/Dark mode support
- 💾 Persistent storage using localStorage

---

## Tech Stack

- **React** (Functional Components + Hooks)
- **Vite** (Fast build tool)
- **React Router** (Routing)
- **Context API + useReducer** (Global state management)
- **localStorage** (Persistence layer)

---

## Architecture Highlights

This project follows a **production-inspired frontend architecture**:

- Centralized state management using `useReducer` and `useContext`
- Custom hooks to encapsulate business logic
- Service layer abstraction for data persistence
- Separation of concerns between UI and logic
- Scalable folder structure

---

## AI-Assisted Development

This project was developed with the assistance of AI agents to enhance productivity, enforce best practices, and explore modern development workflows.

In particular, it leverages:
- **Claude Haiku** for guidance, structure, and architectural decisions
- AI-assisted iteration for refining code quality and design patterns

The goal was not just to build an app, but to explore how AI can be integrated into the **software development lifecycle** effectively.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/IsaacMS30/smart-task-manager.git
cd smart-task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## Deployment

This project is deployed using GitHub Actions and hosted on GitHub Pages.

Every push to the main branch triggers an automatic deployment.

## Project Structure

```bash
src/
 ├── components/     # Reusable UI components
 ├── pages/          # Route-level components
 ├── context/        # Global state (Context + Reducer)
 ├── hooks/          # Custom hooks
 ├── services/       # localStorage abstraction
 ├── utils/          # Helper functions
 └── routes/         # Routing configuration
 ```

## Notes
- This is a frontend-only application (no backend)
- Data is stored locally in the browser
- Designed for learning and experimentation