import React from 'react';
import "./DashboardCard.css";

function DashboardCard({ value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-card__number">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}

export default DashboardCard;