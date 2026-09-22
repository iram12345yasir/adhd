import { useEffect, useState } from "react";
import api from "../api";
import Topbar from "../components/Topbar";

export default function ClinicianDashboardPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("/clinician/patients").then((res) => setPatients(res.data)).catch(() => setPatients([]));
  }, []);

  return (
    <div className="space-y-6">
      <Topbar title="Clinician Portal" actions={<button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-semibold text-white">Review queue</button>} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="glass-panel rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Active patients</p>
          <h3 className="mt-2 text-4xl font-black text-white">{patients.length}</h3>
        </div>
        <div className="glass-panel rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Progress updates</p>
          <h3 className="mt-2 text-4xl font-black text-white">18</h3>
        </div>
        <div className="glass-panel rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Follow-up due</p>
          <h3 className="mt-2 text-4xl font-black text-white">5</h3>
        </div>
      </div>

      <section className="glass-panel rounded-[28px] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Patient list</h2>
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs uppercase text-cyan-300">Clinical</span>
        </div>

        <div className="space-y-3">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="font-semibold text-white">{patient.name}</p>
                <p className="text-xs text-slate-300">{patient.email}</p>
              </div>
              <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">View</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
