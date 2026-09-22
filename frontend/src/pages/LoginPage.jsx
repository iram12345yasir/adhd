import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const demos = [
  ['patient@adhd.app', 'Patient portal'], ['clinician@adhd.app', 'Clinician workstation'], ['admin@adhd.app', 'Admin control']
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('patient@adhd.app');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const submit = async (event) => { event.preventDefault(); setError(''); try { const result = await login(email, password); const role = result.user.role; navigate(role === 'ADMIN' ? '/admin/dashboard' : role === 'CLINICIAN' ? '/clinician/dashboard' : '/patient/dashboard'); } catch (err) { setError(err.response?.data?.message || 'Unable to sign in'); } };
  return <div className="auth-shell"><div className="auth-art"><div className="orb orb-one" /><div className="orb orb-two" /><span className="eyebrow">private ADHD care system</span><h1>Make space for<br /><em>one next thing.</em></h1><p>FocusFlow brings patient support, clinician care, and operational clarity into one calm workspace.</p><div className="auth-proof"><span>✦</span><div><strong>Designed for attention differences</strong><small>Short steps · visible progress · no overwhelm</small></div></div></div><div className="auth-card glass-panel"><div className="brand auth-brand"><div className="brand-mark">A</div><div><span className="eyebrow">welcome back</span><h2>Sign in</h2></div></div><form onSubmit={submit} className="form-stack"><label>Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" required /></label><label>Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" required /></label>{error && <div className="form-error">{error}</div>}<button className="button-primary">Open workspace <span>→</span></button></form><div className="demo-logins"><span>Quick demo access</span>{demos.map(([address, label]) => <button key={address} onClick={() => { setEmail(address); setPassword('password123'); }}>{label}</button>)}</div><p className="auth-footer">New here? <Link to="/register">Create an account</Link></p></div></div>;
}
