import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import ClinicianDashboardPage from './pages/ClinicianDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';
import WorkspacePage from './pages/WorkspacePage';

const homeFor = (role) => role === 'ADMIN' ? '/admin/dashboard' : role === 'CLINICIAN' ? '/clinician/dashboard' : '/patient/dashboard';

function Protected({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="app-loader"><div className="loader-ring" /><p>Preparing your ADHD workspace…</p></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to={homeFor(user.role)} replace />;
  return children;
}

function ToastHost() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const listener = (event) => { setMessage(event.detail); window.setTimeout(() => setMessage(''), 2800); };
    window.addEventListener('adhd:toast', listener);
    return () => window.removeEventListener('adhd:toast', listener);
  }, []);
  return message ? <div className="toast">{message}</div> : null;
}

function PortalLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { if (location.pathname === '/') navigate(homeFor(user.role), { replace: true }); }, [location.pathname, navigate, user.role]);
  return <div className="app-shell"><div className="workspace-shell"><Sidebar /><main className="workspace-main"><Routes>
    <Route path="/patient/dashboard" element={<Protected roles={['PATIENT']}><PatientDashboardPage /></Protected>} />
    <Route path="/patient/progress" element={<Protected roles={['PATIENT']}><PatientDashboardPage mode="progress" /></Protected>} />
    <Route path="/patient/billing" element={<Protected roles={['PATIENT']}><WorkspacePage kind="patient-billing" /></Protected>} />
    <Route path="/patient/feedback" element={<Protected roles={['PATIENT']}><WorkspacePage kind="feedback" /></Protected>} />
    <Route path="/clinician/dashboard" element={<Protected roles={['CLINICIAN', 'ADMIN']}><ClinicianDashboardPage /></Protected>} />
    <Route path="/clinician/schedule" element={<Protected roles={['CLINICIAN', 'ADMIN']}><WorkspacePage kind="schedule" /></Protected>} />
    <Route path="/clinician/earnings" element={<Protected roles={['CLINICIAN', 'ADMIN']}><WorkspacePage kind="earnings" /></Protected>} />
    <Route path="/clinician/feedback" element={<Protected roles={['CLINICIAN', 'ADMIN']}><WorkspacePage kind="feedback" /></Protected>} />
    <Route path="/admin/dashboard" element={<Protected roles={['ADMIN']}><AdminDashboardPage /></Protected>} />
    <Route path="/admin/monitoring" element={<Protected roles={['ADMIN']}><WorkspacePage kind="monitoring" /></Protected>} />
    <Route path="/admin/billing" element={<Protected roles={['ADMIN']}><WorkspacePage kind="admin-billing" /></Protected>} />
    <Route path="/profile" element={<Protected roles={['PATIENT', 'CLINICIAN', 'ADMIN']}><ProfilePage /></Protected>} />
    <Route path="*" element={<Navigate to={homeFor(user.role)} replace />} />
  </Routes></main></div><ToastHost /></div>;
}

export default function App() {
  const { user, loading } = useAuth();
  if (loading) return <div className="app-loader"><div className="loader-ring" /><p>Loading ADHD…</p></div>;
  if (!user) return <><Routes><Route path="/" element={<LandingPage />} /><Route path="/login" element={<LoginPage />} /><Route path="/register" element={<RegisterPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes><ToastHost /></>;
  return <PortalLayout />;
}
