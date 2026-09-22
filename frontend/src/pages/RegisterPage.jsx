import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth(); const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'PATIENT' }); const [error, setError] = useState('');
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  const submit = async (event) => { event.preventDefault(); try { const result = await register(form.name, form.email, form.password, form.role); navigate(result.user.role === 'CLINICIAN' ? '/clinician/dashboard' : result.user.role === 'ADMIN' ? '/admin/dashboard' : '/patient/dashboard'); } catch (err) { setError(err.response?.data?.message || 'Could not create account'); } };
  return <div className="auth-shell"><div className="auth-art register-art"><span className="eyebrow">start gently</span><h1>Your care,<br /><em>your rhythm.</em></h1><p>Build a supportive routine with small, visible wins and a care team that can see what matters.</p><div className="quote-card">“Progress is allowed to be tiny. Tiny still counts.”</div></div><div className="auth-card glass-panel"><div className="brand auth-brand"><div className="brand-mark">A</div><div><span className="eyebrow">new workspace</span><h2>Create account</h2></div></div><form onSubmit={submit} className="form-stack"><label>Your name<input value={form.name} onChange={update('name')} required /></label><label>Email<input value={form.email} onChange={update('email')} type="email" required /></label><label>Password<input value={form.password} onChange={update('password')} type="password" minLength="8" required /></label><label>Workspace type<select value={form.role} onChange={update('role')}><option value="PATIENT">Patient</option><option value="CLINICIAN">Clinician</option><option value="ADMIN">Administrator</option></select></label>{error && <div className="form-error">{error}</div>}<button className="button-primary">Create workspace <span>→</span></button></form><p className="auth-footer">Already a member? <Link to="/login">Sign in</Link></p></div></div>;
}
