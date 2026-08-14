import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and navigate to feed
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-16 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign In to RED<span className="text-red-600">WIRE</span>
          </h2>
          <p className="text-xs text-slate-500">
            Access enterprise video feeds, 4K master downloads & broadcast rights.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Work Email Address
            </label>
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:bg-white transition-all">
              <Mail size={16} className="text-slate-400 mr-2.5 shrink-0" />
              <input
                type="email"
                required
                placeholder="newsroom@agency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-medium text-slate-900 w-full placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <a href="#forgot" className="text-[11px] font-bold text-red-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:bg-white transition-all">
              <Lock size={16} className="text-slate-400 mr-2.5 shrink-0" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-medium text-slate-900 w-full placeholder-slate-400"
              />
            </div>
          </div>

          {/* Remember me & submit */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-red-600 cursor-pointer rounded"
              />
              Remember this device
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            Sign In to Studio Console <ArrowRight size={16} />
          </button>
        </form>

        {/* Security Footer Notice */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
          <ShieldCheck size={14} className="text-emerald-600" />
          Encrypted Broadcast Licensing Portal
        </div>
      </div>
    </div>
  );
}
