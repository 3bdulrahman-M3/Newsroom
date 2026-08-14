import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, CreditCard, Lock, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, completeCheckout, language } = useUser();
  const isAr = language === 'ar';

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'

  const totalAmount = cart.reduce((sum, item) => sum + (item.price || 100), 0);

  const handlePay = (e) => {
    e.preventDefault();
    completeCheckout();
    setCheckoutStep('success');
  };

  if (checkoutStep === 'success') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-24 pb-16 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mb-4">
          <Check size={36} />
        </div>
        <h1 className="text-2xl font-black text-white mb-2">Purchase Completed Successfully!</h1>
        <p className="text-xs text-slate-400 max-w-md mb-6">
          Your licensed broadcast assets are now unlocked and ready for export and high-speed download.
        </p>
        <div className="flex gap-4">
          <Link to="/purchases" className="bg-red-600 text-white font-bold text-xs px-6 py-3 rounded-xl">
            View Purchase History & Downloads
          </Link>
          <Link to="/feed" className="bg-slate-800 text-slate-200 font-bold text-xs px-6 py-3 rounded-xl">
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-20 pb-16">
      <div className="w-full px-6 md:px-12 flex flex-col gap-6">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex items-center justify-between">
          <div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block mb-1">Ad-hoc Checkout</span>
            <h1 className="text-2xl font-extrabold text-white">Shopping Cart & Licensing</h1>
          </div>
          <span className="text-xs text-slate-400 font-mono">{cart.length} Assets selected</span>
        </div>

        {cart.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center flex flex-col items-center justify-center gap-4">
            <ShoppingBag size={40} className="text-slate-600" />
            <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
            <p className="text-xs text-slate-400">Browse the Media Library to add per-item licensed footage.</p>
            <Link to="/feed" className="bg-red-600 text-white text-xs font-bold px-6 py-3 rounded-xl">
              Browse Media Assets
            </Link>
          </div>
        ) : checkoutStep === 'cart' ? (
          /* CART ITEM LIST */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-12 bg-slate-950 rounded-lg flex items-center justify-center font-bold text-xs text-slate-400">
                      {item.category}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white line-clamp-1">{item.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">ID: #{item.contentId || item.id} • Standard Rights</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="font-mono font-bold text-amber-400 text-sm">${item.price || 100}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-red-400 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
                Order Summary
              </h3>

              <div className="flex justify-between text-xs text-slate-300">
                <span>Subtotal</span>
                <span className="font-mono">${totalAmount}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Broadcast Rights Fee</span>
                <span className="text-emerald-400 font-bold">Included</span>
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between text-sm font-bold text-white">
                <span>Total Amount</span>
                <span className="text-amber-400 font-mono text-base">${totalAmount}</span>
              </div>

              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                Proceed to User Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <div className="max-w-2xl mx-auto w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <CreditCard size={18} className="text-amber-400" /> Confirm Licensing & Payment
            </h2>

            <form onSubmit={handlePay} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Company / Licensee Name</label>
                <input
                  type="text"
                  required
                  defaultValue="Media Network Ltd."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Card Details (Mock Payment)</label>
                <input
                  type="text"
                  required
                  defaultValue="•••• •••• •••• 4242"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white outline-none"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 flex flex-col gap-1">
                <div className="flex justify-between font-bold text-white">
                  <span>Total Due:</span>
                  <span className="text-amber-400 font-mono">${totalAmount}</span>
                </div>
                <span>Includes broadcast syndication & digital rights.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg mt-2 cursor-pointer"
              >
                <Lock size={16} /> Confirm & Pay ${totalAmount}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
