import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = {
  PATIENT: [
    ['/patient/dashboard', 'Today'], ['/patient/progress', 'My progress'], ['/patient/billing', 'Billing'], ['/patient/feedback', 'Feedback'], ['/profile', 'Profile']
  ],
  CLINICIAN: [
    ['/clinician/dashboard', 'Workstation'], ['/clinician/schedule', 'My schedule'], ['/clinician/earnings', 'Earnings'], ['/clinician/feedback', 'Feedback'], ['/profile', 'Profile']
  ],
  ADMIN: [
    ['/admin/dashboard', 'Control centre'], ['/admin/monitoring', 'Monitoring'], ['/admin/billing', 'Billing'], ['/clinician/dashboard', 'Clinician view'], ['/profile', 'Profile']
  ]
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const items = links[user?.role] || links.PATIENT;
  return <aside className="sidebar glass-panel">
    <div className="brand"><div className="brand-mark">A</div><div><span className="eyebrow">private ADHD care</span><h2>adhd<span className="brand-dot">.</span></h2></div></div>
    <div className="portal-badge"><span className="online-dot" /> {user?.role || 'PATIENT'} portal</div>
    <nav className="sidebar-nav">{items.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><span className="nav-icon">{label.slice(0, 1)}</span>{label}</NavLink>)}</nav>
    <div className="sidebar-bottom"><div className="profile-mini"><div className="avatar">{(user?.name || 'U').slice(0, 1).toUpperCase()}</div><div className="profile-copy"><strong>{user?.name || 'Member'}</strong><span>{user?.email || 'private account'}</span></div></div><button className="logout-button" onClick={logout}>Sign out</button></div>
  </aside>;
}
