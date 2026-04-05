/**
 * BulkActions Component
 * Component for bulk operations on multiple tasks
 */

import React from 'react';
import { TASK_STATUS, TASK_PRIORITY } from '../../context/constants';
import './BulkActions.css';

function BulkActions({ selectedCount, onBulkDelete, onBulkStatusChange, onBulkPriorityChange, onClearSelection}) {
  if (selectedCount === 0) return null;

  return (
    <div className="bulk-actions">
      <div className="bulk-actions__info">
        {selectedCount} task{selectedCount > 1 ? 's' : ''} selected
      </div>

      <div className="bulk-actions__controls">
        <select
          className="bulk-actions__select"
          onChange={(e) => {
            if (e.target.value) {
              onBulkStatusChange(e.target.value);
              e.target.value = '';
            }
          }}
        >
          <option value="">Change Status...</option>
          <option value={TASK_STATUS.TODO}>{TASK_STATUS.TODO}</option>
          <option value={TASK_STATUS.IN_PROGRESS}>{TASK_STATUS.IN_PROGRESS}</option>
          <option value={TASK_STATUS.DONE}>{TASK_STATUS.DONE}</option>
        </select>

        <select
          className="bulk-actions__select"
          onChange={(e) => {
            if (e.target.value) {
              onBulkPriorityChange(e.target.value);
              e.target.value = '';
            }
          }}
        >
          <option value="">Change Priority...</option>
          <option value={TASK_PRIORITY.LOW}>{TASK_PRIORITY.LOW}</option>
          <option value={TASK_PRIORITY.MEDIUM}>{TASK_PRIORITY.MEDIUM}</option>
          <option value={TASK_PRIORITY.HIGH}>{TASK_PRIORITY.HIGH}</option>
        </select>

        <button
          className="btn btn--danger"
          onClick={() => {
            if (confirm(`Delete ${selectedCount} task${selectedCount > 1 ? 's' : ''}?`)) {
              onBulkDelete();
            }
          }}
        >
          Delete Selected
        </button>

        <button
          className="btn btn--secondary"
          onClick={onClearSelection}
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
};

export default BulkActions;
