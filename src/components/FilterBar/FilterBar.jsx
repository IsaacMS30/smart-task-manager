/**
 * FilterBar Component
 * Component for filtering tasks by status, priority, and tags
 */

import React from 'react';
import { TASK_STATUS, TASK_PRIORITY } from '../../context/constants';
import './FilterBar.css';

function FilterBar ({
  filters,
  onFilterChange,
  onReset,
  allTags,
}) {
  const handleStatusChange = (status) => {
    const newStatuses = filters.status?.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...(filters.status || []), status];

    onFilterChange({ ...filters, status: newStatuses });
  };

  const handlePriorityChange = (priority) => {
    const newPriorities = filters.priority?.includes(priority)
      ? filters.priority.filter((p) => p !== priority)
      : [...(filters.priority || []), priority];

    onFilterChange({ ...filters, priority: newPriorities });
  };

  const handleTagChange = (tag) => {
    const newTags = filters.tags?.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...(filters.tags || []), tag];

    onFilterChange({ ...filters, tags: newTags });
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__section">
        <h3 className="filter-bar__title">Status</h3>
        <div className="filter-bar__options">
          {[TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE].map((status) => (
            <label key={status} className="filter-bar__checkbox">
              <input
                type="checkbox"
                checked={filters.status?.includes(status) || false}
                onChange={() => handleStatusChange(status)}
              />
              <span>{status}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-bar__section">
        <h3 className="filter-bar__title">Priority</h3>
        <div className="filter-bar__options">
          {[TASK_PRIORITY.LOW, TASK_PRIORITY.MEDIUM, TASK_PRIORITY.HIGH].map((priority) => (
            <label key={priority} className="filter-bar__checkbox">
              <input
                type="checkbox"
                checked={filters.priority?.includes(priority) || false}
                onChange={() => handlePriorityChange(priority)}
              />
              <span>{priority}</span>
            </label>
          ))}
        </div>
      </div>

      {allTags && allTags.length > 0 && (
        <div className="filter-bar__section">
          <h3 className="filter-bar__title">Tags</h3>
          <div className="filter-bar__options">
            {allTags.map((tag) => (
              <label key={tag} className="filter-bar__checkbox">
                <input
                  type="checkbox"
                  checked={filters.tags?.includes(tag) || false}
                  onChange={() => handleTagChange(tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button className="btn btn--secondary" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
