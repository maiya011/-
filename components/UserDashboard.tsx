
import React, { useState, useEffect } from 'react';

interface Props {
  user: any;
  onNavigate: (page: any) => void;
}

export const UserDashboard: React.FC<Props> = ({ user, onNavigate }) => {
  const [quitDate, setQuitDate] = useState<string | null>(localStorage.getItem('quit-date'));
  const [daysClean, setDaysClean] = useState(0);

  useEffect(() => {
    if (quitDate) {
      const start = new Date(quitDate);
      const now = new Date();
      const diff = now.getTime() - start.getTime();
      setDaysClean(Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))));
    }
  }, [quitDate]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      {/* Welcome Header */}
      <div className="mb-12 bg-gradient-to-r from-sky-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden reveal">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-right">
          <div>
            <h1 className="text-4xl font-black mb-3">שלום, {user.username}!</h1>
            <p className="text-sky-100 text-xl font-medium">ברוכים הבאים למסע שלכם לחיים בריאים יותר.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/30 text-center reveal reveal-delay-300">
            <div className="text-4xl font-black">{daysClean}</div>
            <div className="text-xs font-bold uppercase tracking-widest opacity-80">ימים ללא עישון</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Action Cards for New Users */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 reveal">
            <h2 className="text-2xl font-black text-slate-800 mb-6">צעדים ראשונים להצלחה</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center text-center group cursor-pointer hover:bg-white hover:shadow-lg transition-all reveal reveal-delay-100" onClick={() => onNavigate('calculator')}>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="font-bold text-emerald-900 mb-1">החשבון האישי שלך</h3>
                <p className="text-xs text-emerald-700 font-medium">גלה כמה כסף תחסוך כבר מהחודש הראשון.</p>
              </div>
              
              <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100 flex flex-col items-center text-center group cursor-pointer hover:bg-white hover:shadow-lg transition-all reveal reveal-delay-200" onClick={() => onNavigate('tips')}>
                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-bold text-sky-900 mb-1">מדריך גמילה מקוצר</h3>
                <p className="text-xs text-sky-700 font-medium">קבל את הטיפים הקריטיים לשבוע הראשון.</p>
              </div>
            </div>
          </div>

          {/* Quick Health Status */}
          <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl reveal">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <span className="text-emerald-400">✓</span>
              מצב בריאותי משוער
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">לחץ דם ודופק</span>
                  <span className="text-emerald-400">תקין</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">רמת חמצן בדם</span>
                  <span className="text-sky-400">בשיפור</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 w-[65%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center reveal reveal-delay-100">
            <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black">
              {user.username[0]}
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">{user.username}</h3>
            <p className="text-slate-400 text-sm font-medium mb-6">חבר בקהילה מאז פברואר 2024</p>
            <button className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-black text-sm hover:bg-slate-50 transition-colors">עריכת פרופיל</button>
          </div>

          <div className="bg-yellow-50 p-8 rounded-[2rem] border border-yellow-100 shadow-sm reveal reveal-delay-200">
            <h3 className="font-black text-sky-900 mb-4 flex items-center gap-2">
              <span className="text-xl">🏆</span>
              הישגים קרובים
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm opacity-50">🌱</div>
                <div className="text-sm font-bold text-slate-600">שבוע שלם נקי (0/7)</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm opacity-50">💰</div>
                <div className="text-sm font-bold text-slate-600">חסכון ראשון של 100 ₪</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
