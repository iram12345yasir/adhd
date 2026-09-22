import { useEffect, useState } from "react";
import api from "../api";
import Topbar from "../components/Topbar";

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState({ userCount: 0, patientCount: 0, clinicianCount: 0, adminCount: 0, taskCount: 0, habitCount: 0, systemHealth: "loading" });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [overviewRes, usersRes] = await Promise.all([
        api.get("/admin/overview"),
        api.get("/users")
      ]);
      setOverview(overviewRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error("admin load failed", error);
    }
  };

  const updateRole = async (id, role) => {
    await api.patch(`/users/${id}/role`, { role });
    loadData();
  };

  const toggleStatus = async (id, isActive) => {
    await api.patch(`/users/${id}/status`, { isActive });
    loadData();
  };

  return (
    <div className="space-y-6">
      <Topbar title="Admin Control" actions={<button className="rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 px-5 py-3 font-semibold text-white">System health: {overview.systemHealth}</button>} />

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="glass-panel rounded-[28px] p-5"><p className="text-xs uppercase tracking-[0.2em] text-slate-300">Users</p><h3 className="mt-2 text-4xl font-black text-white">{overview.userCount}</h3></div>
        <div className="glass-panel rounded-[28px] p-5"><p className="text-xs uppercase tracking-[0.2em] text-slate-300">Patients</p><h3 className="mt-2 text-4xl font-black text-white">{overview.patientCount}</h3></div>
        <div className="glass-panel rounded-[28px] p-5"><p className="text-xs uppercase tracking-[0.2em] text-slate-300">Clinicians</p><h3 className="mt-2 text-4xl font-black text-white">{overview.clinicianCount}</h3></div>
        <div className="glass-panel rounded-[28px] p-5"><p className="text-xs uppercase tracking-[0.2em] text-slate-300">Admins</p><h3 className="mt-2 text-4xl font-black text-white">{overview.adminCount}</h3></div>
        <div className="glass-panel rounded-[28px] p-5"><p className="text-xs uppercase tracking-[0.2em] text-slate-300">Tasks</p><h3 className="mt-2 text-4xl font-black text-white">{overview.taskCount}</h3></div>
      </div>

      <section className="glass-panel rounded-[28px] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">User access control</h2>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase text-emerald-200">Security</span>
        </div>

        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-xs text-slate-300">{user.email}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select defaultValue={user.role} onChange={(e) => updateRole(user.id, e.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white">
                  <option value="PATIENT">PATIENT</option>
                  <option value="CLINICIAN">CLINICIAN</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <button onClick={() => toggleStatus(user.id, !user.isActive)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                  {user.isActive ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
