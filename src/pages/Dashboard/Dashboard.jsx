/**
 * Dashboard Page
 * Overview page with statistics and summary
 */

import React from 'react';
import { Link } from 'react-router-dom';
import useDashboardStats from '../../hooks/useDashboardStats';
import useProjects from '../../hooks/useProjects';
import './Dashboard.css';

function Dashboard() {
  const stats = useDashboardStats();
  const { projects } = useProjects();

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
        <p className="dashboard__subtitle">Welcome to Smart Task Manager</p>
      </div>

      <div className="dashboard__stats">
        <div className="stat-card">
          <div className="stat-card__number">{stats.totalProjects}</div>
          <div className="stat-card__label">Projects</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__number">{stats.totalTasks}</div>
          <div className="stat-card__label">Total Tasks</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__number">{stats.completedTasks}</div>
          <div className="stat-card__label">Completed</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__number">{stats.pendingTasks}</div>
          <div className="stat-card__label">Pending</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__number">{stats.highPriorityTasks}</div>
          <div className="stat-card__label">High Priority</div>
        </div>

        <div className="stat-card">
          <div className="stat-card__number">{stats.overdueTasks}</div>
          <div className="stat-card__label">Overdue</div>
        </div>
      </div>

      <div className="dashboard__progress">
        <h2>Completion Progress</h2>
        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${stats.completionPercentage}%` }}
          ></div>
        </div>
        <p className="progress-bar__text">{stats.completionPercentage}% Complete</p>
      </div>

      <div className="dashboard__projects">
        <h2>Recent Projects</h2>
        {projects.length === 0 ? (
          <p className="dashboard__empty">
            No projects yet.{' '}
            <Link to="/projects">Create your first project</Link>
          </p>
        ) : (
          <ul className="dashboard__project-list">
            {projects.slice(0, 5).map((project) => (
              <li key={project.id} className="dashboard__project-item">
                <Link to={`/projects/${project.id}/tasks`} className="dashboard__project-link">
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="dashboard__actions">
        <Link to="/projects" className="btn btn--primary">
          Manage Projects
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
