export default function Topbar({ title, actions }) {
  return (
    <header className="glass-panel mb-6 flex items-center justify-between rounded-3xl p-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">FocusFlow</p>
        <h1 className="mt-2 text-3xl font-bold text-white">{title}</h1>
      </div>
      {actions}
    </header>
  );
}
