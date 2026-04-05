/**
 * TaskForm Component
 * Form for creating and editing tasks
 */

import React, { useState, useEffect } from 'react';
import { TASK_STATUS, TASK_PRIORITY } from '../../context/constants';
import './TaskForm.css';

function TaskForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: '',
    tags: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        priority: initialData.priority,
        dueDate: initialData.dueDate || '',
        tags: initialData.tags ? initialData.tags.join(', ') : '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      onSubmit({
        ...formData,
        tags,
      });

      setFormData({
        title: '',
        description: '',
        status: TASK_STATUS.TODO,
        priority: TASK_PRIORITY.MEDIUM,
        dueDate: '',
        tags: '',
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="task-title" className="form__label">
          Task Title
        </label>
        <input
          type="text"
          id="task-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form__input"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form__group">
        <label htmlFor="task-description" className="form__label">
          Description
        </label>
        <textarea
          id="task-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form__textarea"
          placeholder="Enter task description (optional)"
          rows="3"
        />
      </div>

      <div className="form__row">
        <div className="form__group">
          <label htmlFor="task-status" className="form__label">
            Status
          </label>
          <select
            id="task-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form__select"
          >
            <option value={TASK_STATUS.TODO}>{TASK_STATUS.TODO}</option>
            <option value={TASK_STATUS.IN_PROGRESS}>{TASK_STATUS.IN_PROGRESS}</option>
            <option value={TASK_STATUS.DONE}>{TASK_STATUS.DONE}</option>
          </select>
        </div>

        <div className="form__group">
          <label htmlFor="task-priority" className="form__label">
            Priority
          </label>
          <select
            id="task-priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form__select"
          >
            <option value={TASK_PRIORITY.LOW}>{TASK_PRIORITY.LOW}</option>
            <option value={TASK_PRIORITY.MEDIUM}>{TASK_PRIORITY.MEDIUM}</option>
            <option value={TASK_PRIORITY.HIGH}>{TASK_PRIORITY.HIGH}</option>
          </select>
        </div>
      </div>

      <div className="form__group">
        <label htmlFor="task-due-date" className="form__label">
          Due Date
        </label>
        <input
          type="date"
          id="task-due-date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="form__input"
        />
      </div>

      <div className="form__group">
        <label htmlFor="task-tags" className="form__label">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="task-tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="form__input"
          placeholder="e.g., urgent, bug, feature"
        />
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--primary">
          {initialData ? 'Update Task' : 'Create Task'}
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
