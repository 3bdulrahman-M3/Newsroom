import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, KeyRound } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email || 'abdelrhman.adel@newsroom.com');
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pt-16 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 flex flex-col gap-7">
        
        {/* Brand Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-1">
            <KeyRound size={24} />
          </div>

          <div>
            <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-slate-900 leading-none">
              RED<span className="text-red-600">WIRE</span> PORTAL
            </h2>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mt-0.5">
              Client & Newsroom Sign In
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            Access broadcast-ready 4K video feeds, instant downloads, and media distribution.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1.5">
              Work Email Address
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 focus-within:bg-white transition-all shadow-xs">
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
            <div className="mb-1.5">
              <label className="text-xs font-bold text-slate-800">Password</label>
            </div>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 focus-within:bg-white transition-all shadow-xs">
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

          {/* Remember me */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer hover:scale-[1.01]"
          >
            Sign In to Client Portal <ArrowRight size={16} />
          </button>
        </form>



        {/* Security Footer Notice */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
          <ShieldCheck size={15} className="text-emerald-600" />
          Encrypted Enterprise Client Portal
        </div>
      </div>
    </div>
  );
}
