import React, { useState, useEffect } from 'react';
import '../styles/global.css';

export default function ClinicianDashboardPage() {
  const [metrics, setMetrics] = useState({
    activePatients: 0,
    tasksCompleted: 0,
    habitsTracked: 0,
  });

  useEffect(() => {
    // Fetch metrics from backend
    fetch('http://localhost:5001/api/health')
      .then(res => res.json())
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="app-shell">
      <div className="workspace-shell">
        <div className="workspace-main">
          <div className="page-card">
            <h1>Clinician Dashboard</h1>
            <div className="metric-grid">
              <div className="metric-card">
                <div className="metric-label">Active Patients</div>
                <h3>{metrics.activePatients}</h3>
              </div>
              <div className="metric-card">
                <div className="metric-label">Tasks Completed</div>
                <h3>{metrics.tasksCompleted}</h3>
              </div>
              <div className="metric-card">
                <div className="metric-label">Habits Tracked</div>
                <h3>{metrics.habitsTracked}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
