import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import ClinicianDashboardPage from './pages/ClinicianDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

function getPortalHome(role) {
  if (role === 'ADMIN') return '/admin/dashboard';
  if (role === 'CLINICIAN') return '/clinician/dashboard';
  return '/patient/dashboard';
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loader">
        <div className="loader-ring" />
        <p>Loading ADHD workstation…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <div className="workspace-shell">
        <Sidebar />
        <main className="workspace-main">
          <Routes>
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute roles={['PATIENT']}>
                  <PatientDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clinician/dashboard"
              element={
                <ProtectedRoute roles={['CLINICIAN', 'ADMIN']}>
                  <ClinicianDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute roles={['ADMIN']}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={['PATIENT', 'CLINICIAN', 'ADMIN']}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={getPortalHome(user.role)} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
