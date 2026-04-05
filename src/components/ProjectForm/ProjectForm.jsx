/**
 * ProjectForm Component
 * Form for creating and editing projects
 */

import React, { useState, useEffect } from 'react';
import './ProjectForm.css';

function ProjectForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
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
    if (formData.name.trim()) {
      onSubmit(formData);
      setFormData({ name: '', description: '' });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="project-name" className="form__label">
          Project Name
        </label>
        <input
          type="text"
          id="project-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form__input"
          placeholder="Enter project name"
          required
        />
      </div>

      <div className="form__group">
        <label htmlFor="project-description" className="form__label">
          Description
        </label>
        <textarea
          id="project-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form__textarea"
          placeholder="Enter project description (optional)"
          rows="3"
        />
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--primary">
          {initialData ? 'Update Project' : 'Create Project'}
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

export default ProjectForm;
