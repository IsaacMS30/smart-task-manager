/**
 * Projects Page
 * Page for managing all projects
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects, useTasks } from '../../hooks/useApp';
import ProjectCard from '../../components/ProjectCard';
import ProjectForm from '../../components/ProjectForm';
import Modal from '../../components/Modal';
import './Projects.css';

function Projects() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { tasks } = useTasks();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const handleAddProject = (formData) => {
    addProject(formData.name, formData.description);
    setIsModalOpen(false);
  };

  const handleEditProject = (id) => {
    setEditingProjectId(id);
    setIsModalOpen(true);
  };

  const handleUpdateProject = (formData) => {
    updateProject(editingProjectId, {
      name: formData.name,
      description: formData.description,
    });
    setIsModalOpen(false);
    setEditingProjectId(null);
  };

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project and all its tasks?')) {
      deleteProject(id);
    }
  };

  const handleViewTasks = (projectId) => {
    navigate(`/projects/${projectId}/tasks`);
  };

  const editingProject = editingProjectId
    ? projects.find((p) => p.id === editingProjectId)
    : null;

  const getTaskCount = (projectId) => {
    return tasks.filter((task) => task.projectId === projectId).length;
  };

  return (
    <div className="projects-page">
      <div className="projects-page__header">
        <h1>Projects</h1>
        <button
          className="btn btn--primary"
          onClick={() => {
            setEditingProjectId(null);
            setIsModalOpen(true);
          }}
        >
          + New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="projects-page__empty">
          <p>No projects yet. Create one to get started!</p>
          <button
            className="btn btn--primary"
            onClick={() => setIsModalOpen(true)}
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className="projects-page__grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              taskCount={getTaskCount(project.id)}
              onViewTasks={handleViewTasks}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProjectId(null);
        }}
      >
        <ProjectForm
          initialData={editingProject}
          onSubmit={editingProject ? handleUpdateProject : handleAddProject}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingProjectId(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Projects;
