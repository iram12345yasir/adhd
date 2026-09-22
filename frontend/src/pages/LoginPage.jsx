import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navMap = {
  PATIENT: [
    { to: "/patient/dashboard", label: "Dashboard" },
    { to: "/profile", label: "Profile" }
  ],
  CLINICIAN: [
    { to: "/clinician/dashboard", label: "Clinical Dashboard" },
    { to: "/profile", label: "Profile" }
  ],
  ADMIN: [
    { to: "/admin/dashboard", label: "Admin Control" },
    { to: "/profile", label: "Profile" }
  ]
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const items = navMap[user?.role] || navMap.PATIENT;

  return (
    <aside className="glass-panel w-full max-w-[280px] p-5">
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 font-black text-white">
          A
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">ADHD</p>
          <h2 className="text-xl font-bold text-white">FocusFlow</h2>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-white/10 text-white shadow-glow"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Portal</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">{user?.name || "User"}</p>
            <p className="text-xs text-slate-300">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200"
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
