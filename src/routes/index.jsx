/**
 * Routes Configuration
 * Defines all application routes
 */

import React from 'react';
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Dashboard from '../pages/Dashboard/Dashboard';
import Projects from '../pages/Projects/Projects';
import Tasks from '../pages/Tasks/Tasks';
import NotFound from '../pages/NotFound/NotFound';
import '../styles/Layout.css';

/**
 * Root layout component
 */
function RootLayout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        <p>&copy; 2026 Smart Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

/**
 * Create the router configuration
 */
const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/projects/:projectId/tasks',
        element: <Tasks />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

/**
 * Routes component that provides routing to the app
 */
export function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
