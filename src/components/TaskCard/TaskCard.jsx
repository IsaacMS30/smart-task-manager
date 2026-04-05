/**
 * TaskCard Component
 * Displays a single task with actions and details
 */

import React from 'react';
import { formatDate, isTaskOverdue } from '../../utils/helpers';
import './TaskCard.css';

function TaskCard({ task, onEdit, onDelete, onStatusChange, onSelect, isSelected}) {
  const isOverdue = isTaskOverdue(task);

  return (
    <div className={`task-card ${isOverdue ? 'task-card--overdue' : ''}`}>
      <div className="task-card__checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(task.id)}
          aria-label={`Select task: ${task.title}`}
        />
      </div>

      <div className="task-card__content">
        <div className="task-card__header">
          <h4 className="task-card__title">{task.title}</h4>
          <span className={`task-card__priority task-card__priority--${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="task-card__description">{task.description}</p>
        )}

        <div className="task-card__meta">
          <span className={`task-card__status task-card__status--${task.status.toLowerCase().replace(' ', '-')}`}>
            {task.status}
          </span>

          {task.dueDate && (
            <span className="task-card__due-date">
              Due: {formatDate(task.dueDate)}
            </span>
          )}

          {isOverdue && (
            <span className="task-card__overdue-badge">Overdue</span>
          )}
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="task-card__tags">
            {task.tags.map((tag) => (
              <span key={tag} className="task-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="task-card__actions">
        <select
          className="task-card__status-select"
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <button
          className="btn btn--secondary btn--small"
          onClick={() => onEdit(task.id)}
        >
          Edit
        </button>

        <button
          className="btn btn--danger btn--small"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
