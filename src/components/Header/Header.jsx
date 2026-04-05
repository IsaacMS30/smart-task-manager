/**
 * Header Component
 * Main application header with navigation and theme toggle
 */

import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <svg className="header__logo-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 2h6v2H9V2zm0 18h6v2H9v-2z"></path>
            <path d="M4.22 4.22l4.24 4.24-1.41 1.41L2.81 5.63 4.22 4.22zm11.32 11.32l4.24 4.24-1.41 1.41-4.24-4.24 1.41-1.41z"></path>
            <path d="M2 9h2v6H2V9zm18 0h2v6h-2V9z"></path>
            <path d="M5.63 2.81l1.41 1.41-4.24 4.24-1.41-1.41 4.24-4.24zm11.32 11.32l1.41 1.41-4.24 4.24-1.41-1.41 4.24-4.24z"></path>
          </svg>
          Smart Task Manager
        </Link>

        <nav className="header__nav">
          <Link to="/" className="header__nav-link">
            Dashboard
          </Link>
          <Link to="/projects" className="header__nav-link">
            Projects
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
