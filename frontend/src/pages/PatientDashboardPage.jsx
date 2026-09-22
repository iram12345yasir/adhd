import { Link } from "react-router-dom";

const portalCards = [
  { title: "Patient Portal", text: "Track focus, routines, and progress with ADHD-friendly tools.", tone: "from-violet-500 to-fuchsia-500" },
  { title: "Clinician Portal", text: "Review patient progress, notes, and engagement metrics.", tone: "from-cyan-500 to-blue-500" },
  { title: "Admin Portal", text: "Manage access, supervise platform roles, and control system health.", tone: "from-emerald-500 to-cyan-500" }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 font-black text-white">A</div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">ADHD</p>
              <h1 className="text-2xl font-black text-white">FocusFlow</h1>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/login" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white">Login</Link>
            <Link to="/register" className="rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-2 font-semibold text-white">Register</Link>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
              secure wellness platform
            </div>

            <h2 className="max-w-xl text-5xl font-black leading-tight text-white md:text-6xl">
              A smarter ADHD system for patients, clinicians, and admins.
            </h2>

            <p className="max-w-xl text-lg text-slate-300">
              Personalized support, patient-first care, clinician visibility, and admin controls in one secure ecosystem.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 font-semibold text-white">Get started</Link>
              <Link to="/login" className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white">Sign in</Link>
            </div>
          </div>

          <div className="glass-panel rounded-[32px] p-6">
            <div className="rounded-[28px] border border-white/10 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-300">Daily momentum</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Focus score</p>
                  <h3 className="mt-2 text-4xl font-black text-white">86%</h3>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Therapy completion</p>
                  <h3 className="mt-2 text-4xl font-black text-white">72%</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {portalCards.map((card) => (
            <div key={card.title} className="glass-panel rounded-[28px] p-5">
              <div className={`mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br ${card.tone}`} />
              <h3 className="text-2xl font-bold text-white">{card.title}</h3>
              <p className="mt-3 text-slate-300">{card.text}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
