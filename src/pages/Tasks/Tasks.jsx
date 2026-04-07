/**
 * Tasks Page
 * Page for managing tasks within a project
 */

import React, { useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useProjects from '../../hooks/useProjects';
import useTasks from '../../hooks/useTasks';
import useFilteredTasks from '../../hooks/useFilteredTasks';
import useAllTags from '../../hooks/useAllTags';
import TaskCard from '../../components/TaskCard/TaskCard';
import TaskForm from '../../components/TaskForm/TaskForm';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBar from '../../components/FilterBar/FilterBar';
import BulkActions from '../../components/BulkActions/BulkActions';
import Modal from '../../components/Modal/Modal';
import './Tasks.css';

function Tasks() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { tasks, addTask, updateTask, deleteTask, bulkDeleteTasks, bulkUpdateTasks } = useTasks();
  const allTags = useAllTags();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
    tags: [],
  });

  const project = projects.find((p) => p.id === projectId);
  const filteredTasks = useFilteredTasks(projectId, {
    search: searchQuery,
    ...filters,
  });

  const editingTask = editingTaskId
    ? tasks.find((t) => t.id === editingTaskId)
    : null;

  const handleAddTask = (formData) => {
    addTask(
      projectId,
      formData.title,
      formData.description,
      formData.status,
      formData.priority,
      formData.tags,
      formData.dueDate
    );
    setIsModalOpen(false);
  };

  const handleEditTask = (id) => {
    setEditingTaskId(id);
    setIsModalOpen(true);
  };

  const handleUpdateTask = (formData) => {
    updateTask(editingTaskId, {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      tags: formData.tags,
      dueDate: formData.dueDate,
    });
    setIsModalOpen(false);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const handleTaskSelect = useCallback((taskId) => {
    setSelectedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  }, []);

  const handleBulkDelete = () => {
    bulkDeleteTasks(Array.from(selectedTasks));
    setSelectedTasks(new Set());
  };

  const handleBulkStatusChange = (status) => {
    bulkUpdateTasks(Array.from(selectedTasks), { status });
    setSelectedTasks(new Set());
  };

  const handleBulkPriorityChange = (priority) => {
    bulkUpdateTasks(Array.from(selectedTasks), { priority });
    setSelectedTasks(new Set());
  };

  if (!project) {
    return (
      <div className="tasks-page">
        <div className="tasks-page__not-found">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="btn btn--primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <div className="tasks-page__header">
        <div className="tasks-page__breadcrumb">
          <Link to="/projects" className="tasks-page__back-link">
            ← Back to Projects
          </Link>
        </div>
        <h1>{project.name}</h1>
        {project.description && (
          <p className="tasks-page__description">{project.description}</p>
        )}
      </div>

      <div className="tasks-page__toolbar">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search tasks..."
        />
        <button
          className="btn btn--primary"
          onClick={() => {
            setEditingTaskId(null);
            setIsModalOpen(true);
          }}
        >
          + New Task
        </button>
      </div>

      <BulkActions
        selectedCount={selectedTasks.size}
        onBulkDelete={handleBulkDelete}
        onBulkStatusChange={handleBulkStatusChange}
        onBulkPriorityChange={handleBulkPriorityChange}
        onClearSelection={() => setSelectedTasks(new Set())}
      />

      <div className="tasks-page__content">
        <aside className="tasks-page__sidebar">
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            onReset={() => setFilters({ status: [], priority: [], tags: [] })}
            allTags={allTags}
          />
        </aside>

        <main className="tasks-page__main">
          {filteredTasks.length === 0 ? (
            <div className="tasks-page__empty">
              <p>
                {searchQuery || Object.values(filters).some((f) => f && f.length > 0)
                  ? 'No tasks match your filters.'
                  : 'No tasks yet. Create one to get started!'}
              </p>
              <button
                className="btn btn--primary"
                onClick={() => setIsModalOpen(true)}
              >
                Create Task
              </button>
            </div>
          ) : (
            <div className="tasks-page__list">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isSelected={selectedTasks.has(task.id)}
                  onSelect={handleTaskSelect}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTaskId(null);
        }}
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTaskId(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Tasks;
