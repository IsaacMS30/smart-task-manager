/**
 * NotFound Page
 * 404 page when route doesn't exist
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Page not found</p>
        <p className="not-found__description">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn--primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
