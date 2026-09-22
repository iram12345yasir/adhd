import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import PatientDashboardPage from "./pages/PatientDashboardPage";
import ClinicianDashboardPage from "./pages/ClinicianDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProfilePage from "./pages/ProfilePage";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { user } = useAuth();

  const portalledRoutes = user ? (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-5 p-5 lg:flex-row">
      <Sidebar />
      <main className="flex-1">
        <Routes>
          <Route
            path="/patient/dashboard"
            element={<ProtectedRoute roles={["PATIENT"]}><PatientDashboardPage /></ProtectedRoute>}
          />
          <Route
            path="/clinician/dashboard"
            element={<ProtectedRoute roles={["CLINICIAN", "ADMIN"]}><ClinicianDashboardPage /></ProtectedRoute>}
          />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute roles={["ADMIN"]}><AdminDashboardPage /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute roles={["PATIENT", "CLINICIAN", "ADMIN"]}><ProfilePage /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to={user?.role === "ADMIN" ? "/admin/dashboard" : user?.role === "CLINICIAN" ? "/clinician/dashboard" : "/patient/dashboard"} replace />} />
        </Routes>
      </main>
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(94,234,212,0.18),transparent_28%),linear-gradient(135deg,#020817,#0f172a,#111827)] text-white">
      {portalledRoutes}
    </div>
  );
}
