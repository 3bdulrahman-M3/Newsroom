import React from 'react';
import { useUser } from '../context/UserContext';
import { Receipt, Download, ShieldCheck, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Purchases() {
  const { purchaseHistory } = useUser();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex items-center justify-between">
          <div>
            <span className="text-red-400 font-bold text-xs uppercase tracking-wider block mb-1">User Account</span>
            <h1 className="text-2xl font-extrabold text-white">Purchase History & Licensing Invoices</h1>
          </div>
          <Link to="/feed" className="bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold">
            Back to Library
          </Link>
        </div>

        {/* History Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Media Asset</th>
                <th className="p-4">Date</th>
                <th className="p-4">License Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {purchaseHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-850 transition-colors">
                  <td className="p-4 font-mono font-bold text-white">{item.id}</td>
                  <td className="p-4 font-bold text-slate-200">{item.mediaTitle}</td>
                  <td className="p-4 font-mono text-slate-400">{item.date}</td>
                  <td className="p-4 text-slate-400 font-semibold">{item.licenseType}</td>
                  <td className="p-4 font-mono font-bold text-emerald-400">${item.amount}</td>
                  <td className="p-4 text-right">
                    <button className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 ml-auto text-xs">
                      <Download size={13} /> Export Master
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
