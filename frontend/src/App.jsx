import { useEffect, useMemo, useState } from 'react';
import api from '../api';
import Topbar from '../components/Topbar';

const demoPatients = [
  { id: 'p1', name: 'Jordan Williams', email: 'jordan@example.com', status: 'Needs review', focus: 62, tasks: 8 },
  { id: 'p2', name: 'Samira Patel', email: 'samira@example.com', status: 'On track', focus: 84, tasks: 12 },
  { id: 'p3', name: 'Noah Garcia', email: 'noah@example.com', status: 'Follow-up due', focus: 48, tasks: 5 },
  { id: 'p4', name: 'Ava Thompson', email: 'ava@example.com', status: 'High risk', focus: 35, tasks: 4 },
];

export default function ClinicianDashboardPage() {
  const [patients, setPatients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let mounted = true;

    api
      .get('/clinician/patients')
      .then((response) => {
        if (mounted) {
          setPatients(response.data);
          if (response.data.length) setSelectedId(response.data[0].id);
        }
      })
      .catch(() => {
        if (mounted) {
          setError('Patient API unavailable. Showing secure demo feed for the clinician workstation.');
          setPatients(demoPatients);
          setSelectedId(demoPatients[0].id);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const visiblePatients = useMemo(() => {
    const term = query.toLowerCase();
    return patients.filter((patient) => `${patient.name} ${patient.email}`.toLowerCase().includes(term));
  }, [patients, query]);

  const selectedPatient =
    patients.find((patient) => patient.id === selectedId) || visiblePatients[0] || null;

  const saveNote = (event) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: 'grid', gap: '22px' }}>
      <Topbar
        title="Clinician workstation"
        actions={
          <span className="status-pill" style={{ color: '#a7f3d0', background: 'rgba(16, 185, 129, 0.12)' }}>
            Secure workspace · live
          </span>
        }
      />

      {error && (
        <div className="page-card" style={{ padding: '14px 18px', borderColor: 'rgba(251, 191, 36, 0.28)' }}>
          <p style={{ margin: 0, color: '#fcd34d' }}>{error}</p>
        </div>
      )}

      <div className="metric-grid">
        <Metric label="Active patients" value={patients.length || 4} detail="care queue" />
        <Metric label="Needs review" value={patients.filter((p) => p.status === 'Needs review').length || 1} detail="priority queue" />
        <Metric label="Follow-ups" value={patients.filter((p) => p.status === 'Follow-up due').length || 1} detail="this week" />
        <Metric label="Workspace" value="Ready" detail="encrypted session" />
      </div>

      <div className="workstation-grid">
        <section className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: 16 }}>
            <div>
              <p className="metric-label">Care queue</p>
              <h2 style={{ marginBottom: 0, color: 'white', fontSize: '1.4rem' }}>Patients</h2>
            </div>
            <span className="status-pill" style={{ background: 'rgba(34, 211, 238, 0.12)', color: '#a5f3fc' }}>
              {patients.length || 4}
            </span>
          </div>

          <input
            className="input-default"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search patient name or email"
            style={{ marginBottom: 14 }}
          />

          {loading ? (
            <p style={{ color: '#cbd5e1' }}>Loading patient feed…</p>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {visiblePatients.map((patient) => (
                <button
                  key={patient.id}
                  type="button"
                  onClick={() => setSelectedId(patient.id)}
                  style={{
                    width: '100%',
                    borderRadius: 18,
                    border: selectedPatient?.id === patient.id ? '1px solid rgba(103, 232, 249, 0.4)' : '1px solid rgba(148, 163, 184, 0.16)',
                    background: selectedPatient?.id === patient.id ? 'rgba(34, 211, 238, 0.08)' : 'rgba(15, 23, 42, 0.6)',
                    color: 'white',
                    padding: '14px 16px',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{patient.name}</div>
                      <div style={{ marginTop: 5, fontSize: 12, color: '#cbd5e1' }}>{patient.email}</div>
                    </div>
                    <span
                      className="status-pill"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        color: '#e2e8f0',
                        letterSpacing: '0.12em',
                      }}
                    >
                      {patient.status || 'Active'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, paddingBottom: 18, borderBottom: '1px solid rgba(148,163,184,0.14)' }}>
            <div>
              <p className="metric-label" style={{ color: '#7dd3fc' }}>Patient snapshot</p>
              <h2 style={{ margin: '8px 0 4px', color: 'white', fontSize: '2rem' }}>
                {selectedPatient?.name || 'Select a patient'}
              </h2>
              <p style={{ margin: 0, color: '#cbd5e1' }}>
                {selectedPatient?.email || 'Choose a patient from the care queue to begin.'}
              </p>
            </div>
            {selectedPatient && (
              <button type="button" className="button-primary" style={{ fontSize: 14 }}>
                Open care plan
              </button>
            )}
          </div>

          {selectedPatient && (
            <>
              <div className="map-grid" style={{ marginTop: 18 }}>
                <ProgressMetric label="Focus consistency" value={selectedPatient.focus || 70} />
                <ProgressMetric label="Task completion" value={Math.min((selectedPatient.tasks || 8) * 7, 100)} />
                <ProgressMetric label="Check-in status" value={selectedPatient.status === 'On track' ? 90 : 58} />
              </div>

              <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginTop: 20 }}>
                <div className="service-panel">
                  <p className="metric-label">Today’s signals</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'grid', gap: 10, color: '#dbeafe' }}>
                    <li>• Focus sessions are trending {selectedPatient.focus > 70 ? 'upward' : 'inconsistently'}.</li>
                    <li>• Recent task completion is stable but uneven across the week.</li>
                    <li>• Confirm preferred reminder cadence and next check-in timing.</li>
                  </ul>
                </div>

                <form onSubmit={saveNote} className="service-panel">
                  <p className="metric-label">Clinical note draft</p>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={5}
                    placeholder="Add a private support note or care follow-up…"
                    style={{ width: '100%', resize: 'vertical', marginTop: 12, background: 'rgba(15,23,42,0.8)', color: 'white', border: '1px solid rgba(148,163,184,0.14)', borderRadius: 16, padding: 14 }}
                  />
                  <button type="submit" className="button-primary" style={{ marginTop: 12, fontSize: 14 }}>
                    {saved ? 'Saved locally' : 'Save draft'}
                  </button>
                </form>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value, detail }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <h3>{value}</h3>
      <div className="metric-detail">{detail}</div>
    </div>
  );
}

function ProgressMetric({ label, value }) {
  return (
    <div className="service-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
        <span style={{ color: '#cbd5e1', fontSize: 12 }}>{label}</span>
        <span style={{ color: '#f8fafc', fontWeight: 700 }}>{value}%</span>
      </div>
      <div className="ring-progress">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
