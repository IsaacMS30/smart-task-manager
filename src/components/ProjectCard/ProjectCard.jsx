/**
 * ProjectCard Component
 * Displays a single project with actions
 */

import React from 'react';
import './ProjectCard.css';

function ProjectCard({ project, onEdit, onDelete, onViewTasks, taskCount }) {
  return (
    <div className="project-card">
      <div className="project-card__header">
        <h3 className="project-card__title">{project.name}</h3>
        <span className="project-card__task-count">{taskCount} tasks</span>
      </div>

      {project.description && (
        <p className="project-card__description">{project.description}</p>
      )}

      <div className="project-card__footer">
        <button
          className="btn btn--primary"
          onClick={() => onViewTasks(project.id)}
        >
          View Tasks
        </button>
        <button
          className="btn btn--secondary"
          onClick={() => onEdit(project.id)}
        >
          Edit
        </button>
        <button
          className="btn btn--danger"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
