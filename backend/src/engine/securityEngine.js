import { useAuth } from "../context/AuthContext";
import Topbar from "../components/Topbar";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <Topbar title="Profile & Security" actions={<button className="rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-3 font-semibold text-white">Save changes</button>} />

      <section className="glass-panel rounded-[28px] p-5">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Account</p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Full name</label>
                <input defaultValue={user?.name || "User"} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Email</label>
                <input defaultValue={user?.email || ""} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Security</p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Role</label>
                <input value={user?.role || "PATIENT"} readOnly className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Two-factor authentication</label>
                <select defaultValue="Recommended" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
                  <option>Recommended</option>
                  <option>Enabled</option>
                  <option>Not enabled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
