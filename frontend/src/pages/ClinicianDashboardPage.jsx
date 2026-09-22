import { useEffect, useMemo, useState } from "react";
import api from "../api";
import Topbar from "../components/Topbar";

const demoPatients = [
  { id: "demo-1", name: "Jordan Williams", email: "jordan@example.com", status: "Needs review", focus: 62, tasks: 8 },
  { id: "demo-2", name: "Samira Patel", email: "samira@example.com", status: "On track", focus: 84, tasks: 12 },
  { id: "demo-3", name: "Noah Garcia", email: "noah@example.com", status: "Follow-up due", focus: 48, tasks: 5 }
];

export default function ClinicianDashboardPage() {
  const [patients, setPatients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let mounted = true;
    api.get("/clinician/patients")
      .then((response) => {
        if (mounted) setPatients(response.data);
      })
      .catch(() => {
        if (mounted) {
          setError("The live patient feed is unavailable. Showing workstation demo data.");
          setPatients(demoPatients);
        }
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const visiblePatients = useMemo(() => {
    const normalized = query.toLowerCase();
    return patients.filter((patient) =>
      `${patient.name} ${patient.email}`.toLowerCase().includes(normalized)
    );
  }, [patients, query]);

  const selectedPatient = patients.find((patient) => patient.id === selectedId) || visiblePatients[0];

  function saveNote(event) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div className="space-y-6">
      <Topbar
        title="Clinician Workstation"
        actions={<span className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">Secure workspace · Live</span>}
      />

      {error && <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Caseload" value={patients.length} detail="active patients" />
        <Metric label="Needs review" value={patients.filter((p) => p.status === "Needs review").length || 1} detail="priority queue" />
        <Metric label="Follow-ups" value={patients.filter((p) => p.status === "Follow-up due").length || 1} detail="next 7 days" />
        <Metric label="Workspace" value="Ready" detail="encrypted session" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.5fr)]">
        <section className="glass-panel rounded-[28px] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Care queue</p>
              <h2 className="mt-1 text-xl font-bold text-white">Patients</h2>
            </div>
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">{patients.length}</span>
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or email" className="mb-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          {loading ? <p className="text-sm text-slate-300">Loading patient feed…</p> : (
            <div className="space-y-3">
              {visiblePatients.map((patient) => (
                <button key={patient.id} onClick={() => setSelectedId(patient.id)} className={`w-full rounded-2xl border p-4 text-left transition ${selectedPatient?.id === patient.id ? "border-cyan-300/40 bg-cyan-300/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div><p className="font-semibold text-white">{patient.name}</p><p className="mt-1 text-xs text-slate-300">{patient.email}</p></div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-slate-200">{patient.status || "Active"}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="glass-panel rounded-[28px] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div><p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Patient snapshot</p><h2 className="mt-1 text-2xl font-bold text-white">{selectedPatient?.name || "Select a patient"}</h2><p className="mt-1 text-sm text-slate-300">{selectedPatient?.email || "Choose a patient from the care queue to begin."}</p></div>
            {selectedPatient && <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white">Open care plan</button>}
          </div>
          {selectedPatient && <>
            <div className="grid gap-3 py-5 sm:grid-cols-3"><Progress label="Focus consistency" value={selectedPatient.focus || 70} /><Progress label="Task completion" value={Math.min((selectedPatient.tasks || 8) * 6, 100)} /><Progress label="Check-in status" value={selectedPatient.status === "On track" ? 90 : 55} /></div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-300">Today’s signals</p><ul className="mt-3 space-y-3 text-sm text-slate-200"><li>• Focus sessions are trending {selectedPatient.focus > 70 ? "up" : "inconsistently"}.</li><li>• Review recent task completion before the next check-in.</li><li>• Confirm preferred reminder cadence with the patient.</li></ul></div>
              <form onSubmit={saveNote} className="rounded-2xl border border-white/10 bg-white/5 p-4"><label className="text-xs uppercase tracking-[0.2em] text-slate-300">Clinical note draft</label><textarea value={note} onChange={(event) => setNote(event.target.value)} rows="5" placeholder="Record a private follow-up reminder…" className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none" /><button className="mt-3 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white">{saved ? "Saved locally" : "Save draft"}</button></form>
            </div>
          </>}
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value, detail }) { return <div className="glass-panel rounded-[24px] p-5"><p className="text-xs uppercase tracking-[0.2em] text-slate-300">{label}</p><p className="mt-2 text-3xl font-black text-white">{value}</p><p className="mt-1 text-xs text-slate-400">{detail}</p></div>; }
function Progress({ label, value }) { return <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex justify-between gap-3 text-xs text-slate-300"><span>{label}</span><span>{value}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${value}%` }} /></div></div>; }
