import React, { useState, useEffect, useMemo } from 'react';

interface Props {
  user: any;
  onNavigate: (page: any) => void;
}

export const UserDashboard: React.FC<Props> = ({ user, onNavigate }) => {
  const [quitDate, setQuitDate] = useState<string | null>(localStorage.getItem('quit-date'));
  const [cigsPerDay] = useState(Number(localStorage.getItem('tracker-cigs')) || 20);
  const [pricePerPack] = useState(Number(localStorage.getItem('tracker-price')) || 37);

  const stats = useMemo(() => {
    if (!quitDate) return null;
    const start = new Date(quitDate);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    if (diffMs < 0) return null;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const moneySaved = (days * cigsPerDay / 20) * pricePerPack;
    const cigsAvoided = days * cigsPerDay;

    return { days, moneySaved: Math.round(moneySaved), cigsAvoided };
  }, [quitDate, cigsPerDay, pricePerPack]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <div className="mb-12 bg-gradient-to-r from-sky-600 to-indigo-700 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden reveal">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-black mb-4">היי, {user.username}! 👋</h1>
            <p className="text-sky-100 text-xl font-medium opacity-90">כל יום הוא צעד קדימה אל החופש שלך.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-xl px-10 py-6 rounded-[2rem] border border-white/20 text-center shadow-inner">
              <div className="text-5xl font-black mb-1">{stats?.days || 0}</div>
              <div className="text-xs font-black uppercase tracking-[0.2em] opacity-60">ימים נקיים</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 reveal reveal-delay-100">
               <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div>
                 <div className="text-3xl font-black text-slate-800">₪{stats?.moneySaved || 0}</div>
                 <div className="text-xs font-bold text-slate-400 uppercase">כסף שנחסך</div>
               </div>
            </div>
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 reveal reveal-delay-200">
               <div className="bg-sky-100 p-4 rounded-2xl text-sky-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
               </div>
               <div>
                 <div className="text-3xl font-black text-slate-800">{stats?.cigsAvoided || 0}</div>
                 <div className="text-xs font-bold text-slate-400 uppercase">סיגריות שנמנעו</div>
               </div>
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl reveal">
            <h3 className="text-2xl font-black mb-10">הפעולות שלך להיום</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <button 
                onClick={() => onNavigate('tips')}
                className="bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 text-right flex flex-col transition-all"
              >
                <span className="text-emerald-400 font-black mb-2">קרא טיפ יומי</span>
                <span className="text-sm text-sky-100/70 font-medium">איך להתמודד עם הדחף של הבוקר</span>
              </button>
              <button 
                onClick={() => onNavigate('forum')}
                className="bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 text-right flex flex-col transition-all"
              >
                <span className="text-sky-400 font-black mb-2">כתוב בפורום</span>
                <span className="text-sm text-sky-100/70 font-medium">שתף את הקהילה בהתקדמות שלך</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-center reveal">
            <div className="w-24 h-24 bg-sky-100 text-sky-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-4xl font-black shadow-inner">
              {user.username[0]}
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">{user.username}</h3>
            <p className="text-slate-400 text-sm font-bold mb-8 italic">חבר בקהילה ללא עשן</p>
            <button 
              onClick={() => onNavigate('calculator')}
              className="w-full py-4 rounded-2xl bg-slate-50 text-slate-600 font-black text-sm hover:bg-sky-50 hover:text-sky-600 transition-all border border-slate-100"
            >
              עדכון הגדרות מעקב
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
