
import React, { useState, useEffect, useMemo } from 'react';

interface Props {
  onNavigate: (page: any) => void;
}

interface HealthIndicator {
  label: string;
  durationSeconds: number;
  description: string;
}

interface Achievement {
  id: string;
  label: string;
  days: number;
  icon: string;
}

export const Tracker: React.FC<Props> = ({ onNavigate }) => {
  const [quitDate, setQuitDate] = useState<string>(() => {
    return localStorage.getItem('quit-date') || new Date().toISOString().slice(0, 16);
  });
  const [cigsPerDay, setCigsPerDay] = useState<number>(() => {
    return Number(localStorage.getItem('tracker-cigs')) || 20;
  });
  const [pricePerPack, setPricePerPack] = useState<number>(() => {
    return Number(localStorage.getItem('tracker-price')) || 37;
  });
  const [savingsGoal, setSavingsGoal] = useState<string>(() => {
    return localStorage.getItem('tracker-goal-name') || 'חופשה משפחתית';
  });
  const [goalAmount, setGoalAmount] = useState<number>(() => {
    return Number(localStorage.getItem('tracker-goal-amount')) || 5000;
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(() => {
    const start = new Date(quitDate);
    const nowLocal = new Date();
    const diffMs = nowLocal.getTime() - start.getTime();
    
    if (diffMs < 0) return null;

    const diffSeconds = diffMs / 1000;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const packsNotSmoked = (diffDays * cigsPerDay) / 20;
    const moneySaved = packsNotSmoked * pricePerPack;
    const cigsNotSmoked = diffDays * cigsPerDay;
    const lifeMinutesRegained = cigsNotSmoked * 11;

    return {
      days: Math.floor(diffDays),
      hours: Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diffMs % (1000 * 60)) / 1000),
      totalSeconds: diffSeconds,
      moneySaved: Math.round(moneySaved),
      cigsNotSmoked: Math.floor(cigsNotSmoked),
      lifeHoursRegained: Math.round(lifeMinutesRegained / 60),
      goalProgress: Math.min(100, (moneySaved / goalAmount) * 100)
    };
  }, [quitDate, cigsPerDay, pricePerPack, goalAmount, now]);

  const healthMilestones: HealthIndicator[] = [
    { label: 'לחץ דם ודופק', durationSeconds: 20 * 60, description: 'חזרה לרמה תקינה (20 דקות)' },
    { label: 'רמת חמצן בדם', durationSeconds: 8 * 60 * 60, description: 'עלייה לרמה נורמלית (8 שעות)' },
    { label: 'ניקוטין בגוף', durationSeconds: 48 * 60 * 60, description: 'התנקה לחלוטין (יומיים)' },
    { label: 'חוש טעם וריח', durationSeconds: 72 * 60 * 60, description: 'שיפור משמעותי (3 ימים)' },
    { label: 'תפקוד ריאות', durationSeconds: 14 * 24 * 60 * 60, description: 'שיפור בזרימת האוויר (שבועיים)' },
    { label: 'סיכון להתקף לב', durationSeconds: 365 * 24 * 60 * 60, description: 'ירידה של 50% (שנה)' },
  ];

  const achievements: Achievement[] = [
    { id: '1day', label: 'יום ראשון!', days: 1, icon: '🌱' },
    { id: '3days', label: '3 ימים של כוח', days: 3, icon: '🔥' },
    { id: '1week', label: 'שבוע של חופש', days: 7, icon: '🛡️' },
    { id: '1month', label: 'חודש של ניצחון', days: 30, icon: '🏆' },
    { id: '100days', label: '100 ימים נקיים', days: 100, icon: '💎' },
  ];

  const handleSaveSettings = () => {
    localStorage.setItem('quit-date', quitDate);
    localStorage.setItem('tracker-cigs', cigsPerDay.toString());
    localStorage.setItem('tracker-price', pricePerPack.toString());
    localStorage.setItem('tracker-goal-name', savingsGoal);
    localStorage.setItem('tracker-goal-amount', goalAmount.toString());
    setIsEditing(false);
  };

  const shareProgress = () => {
    const text = `אני כבר ${stats?.days} ימים נקי מעישון! 💪 חסכתי ₪${stats?.moneySaved?.toLocaleString()} ונמנעתי מ-${stats?.cigsNotSmoked?.toLocaleString()} סיגריות. הצטרפו אליי ב-'נקי מעישון'!`;
    if (navigator.share) {
      navigator.share({ title: 'ההתקדמות שלי בנקי מעישון', text, url: window.location.origin }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('ההתקדמות הועתקה ללוח! עכשיו אפשר להדביק ולשתף.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 reveal">
        <div className="text-center md:text-right">
          <h1 className="text-4xl md:text-6xl font-black text-sky-950 mb-4">המעקב האישי שלי</h1>
          <p className="text-slate-500 text-lg font-medium">החופש שלך מתחיל כאן. כל רגע קובע.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white border-2 border-sky-100 text-sky-600 px-6 py-3 rounded-2xl font-black hover:bg-sky-50 transition-all shadow-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            הגדרות
          </button>
          <button 
            onClick={shareProgress}
            className="bg-sky-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-sky-700 transition-all flex items-center gap-2"
          >
            שיתוף הצלחה
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mb-12 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-sky-100 animate-scale-in">
          <h2 className="text-2xl font-black text-sky-900 mb-6">עדכון נתוני מעקב</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block pr-2">תאריך ושעה</label>
              <input type="datetime-local" value={quitDate} onChange={e => setQuitDate(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block pr-2">סיגריות ביום</label>
              <input type="number" value={cigsPerDay} onChange={e => setCigsPerDay(Number(e.target.value))} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block pr-2">מחיר חפיסה (₪)</label>
              <input type="number" value={pricePerPack} onChange={e => setPricePerPack(Number(e.target.value))} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block pr-2">סכום יעד (₪)</label>
              <input type="number" value={goalAmount} onChange={e => setGoalAmount(Number(e.target.value))} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none font-bold" />
            </div>
          </div>
          <button onClick={handleSaveSettings} className="bg-sky-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-sky-700 transition-all">שמירה ועדכון</button>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Main Stats Column */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Big Timer */}
          <div className="bg-gradient-to-br from-sky-900 to-indigo-950 rounded-[3rem] p-10 md:p-16 text-white text-center shadow-2xl relative overflow-hidden reveal">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <h2 className="text-xs md:text-sm font-black mb-10 opacity-50 tracking-[0.3em] uppercase">זמן חי ללא עישון</h2>
            {stats ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <div className="bg-white/10 rounded-[2rem] p-6 backdrop-blur-md border border-white/5">
                  <div className="text-4xl md:text-7xl font-black mb-2">{stats.days}</div>
                  <div className="text-xs font-bold opacity-60">ימים</div>
                </div>
                <div className="bg-white/10 rounded-[2rem] p-6 backdrop-blur-md border border-white/5">
                  <div className="text-4xl md:text-7xl font-black mb-2">{stats.hours}</div>
                  <div className="text-xs font-bold opacity-60">שעות</div>
                </div>
                <div className="bg-white/10 rounded-[2rem] p-6 backdrop-blur-md border border-white/5">
                  <div className="text-4xl md:text-7xl font-black mb-2">{stats.minutes}</div>
                  <div className="text-xs font-bold opacity-60">דקות</div>
                </div>
                <div className="bg-white/10 rounded-[2rem] p-6 backdrop-blur-md border border-yellow-400/20">
                  <div className="text-4xl md:text-7xl font-black mb-2 text-yellow-300">{stats.seconds}</div>
                  <div className="text-xs font-bold opacity-60">שניות</div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-2xl font-black italic">ממתין להגדרות תאריך...</div>
            )}
          </div>

          {/* Motivational Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-center reveal reveal-delay-100">
               <div className="text-3xl mb-4">💰</div>
               <div className="text-3xl font-black text-sky-900 mb-1">₪{stats?.moneySaved?.toLocaleString() || 0}</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">חיסכון כספי</div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-center reveal reveal-delay-200">
               <div className="text-3xl mb-4">🚫</div>
               <div className="text-3xl font-black text-sky-900 mb-1">{stats?.cigsNotSmoked?.toLocaleString() || 0}</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">סיגריות שנמנעו</div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-center reveal reveal-delay-300">
               <div className="text-3xl mb-4">❤️</div>
               <div className="text-3xl font-black text-sky-900 mb-1">{stats?.lifeHoursRegained || 0} ש'</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">זמן חיים שהרווחת</div>
            </div>
          </div>

          {/* Achievements / Badges */}
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 reveal">
            <h3 className="text-2xl font-black text-sky-950 mb-10 text-center">היכל ההישגים שלך</h3>
            <div className="flex flex-wrap justify-center gap-10">
              {achievements.map((ach) => {
                const isEarned = (stats?.days || 0) >= ach.days;
                return (
                  <div key={ach.id} className={`flex flex-col items-center gap-4 transition-all ${isEarned ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-20'}`}>
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 ${isEarned ? 'bg-yellow-50 border-yellow-400' : 'bg-slate-50 border-slate-200'}`}>
                      {ach.icon}
                    </div>
                    <span className="text-sm font-black text-slate-700 whitespace-nowrap">{ach.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Health Progress */}
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl reveal">
            <h3 className="text-2xl font-black mb-12 flex items-center gap-4">
              <span className="bg-sky-500/20 p-2 rounded-xl text-sky-400">📊</span>
              סטטוס שיקום הגוף
            </h3>
            <div className="space-y-10">
              {healthMilestones.map((m, i) => {
                const totalSec = stats?.totalSeconds || 0;
                const progress = Math.min(100, (totalSec / m.durationSeconds) * 100);
                const isDone = progress >= 100;
                return (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="text-right">
                        <span className={`text-sm font-black uppercase tracking-widest ${isDone ? 'text-emerald-400' : 'text-slate-400'}`}>{m.label}</span>
                        <p className="text-xs text-slate-500 font-bold mt-1">{m.description}</p>
                      </div>
                      <span className={`text-xs font-black ${isDone ? 'text-emerald-400' : 'text-slate-600'}`}>{isDone ? 'הושלם ✓' : `${Math.round(progress)}%`}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ${isDone ? 'bg-emerald-500' : 'bg-sky-500'}`} style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Savings Goal Ring */}
          <div className="bg-emerald-600 rounded-[3rem] p-10 text-white shadow-xl text-center relative overflow-hidden reveal">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h3 className="text-xl font-black mb-8 relative z-10">היעד: {savingsGoal}</h3>
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="transparent" />
                <circle 
                  cx="96" cy="96" r="88" 
                  stroke="white" strokeWidth="12" fill="transparent" 
                  strokeDasharray={552.92} 
                  strokeDashoffset={552.92 - (552.92 * (stats?.goalProgress || 0)) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black">{Math.round(stats?.goalProgress || 0)}%</span>
              </div>
            </div>
            <p className="text-emerald-100 font-bold mb-2">₪{stats?.moneySaved?.toLocaleString()} נחסכו</p>
            <p className="text-xs font-black opacity-50 uppercase tracking-widest">מתוך ₪{goalAmount.toLocaleString()}</p>
          </div>

          {/* Quick Support */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-center reveal">
             <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">🆘</div>
             <h4 className="text-xl font-black text-sky-950 mb-3">רגע של משבר?</h4>
             <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">הדחף לסיגריה עובר בדרך כלל תוך 5 דקות. היכנס לפורום ושתף אותנו עכשיו.</p>
             <button 
               onClick={() => onNavigate('forum')}
               className="w-full py-4 rounded-2xl border-2 border-sky-100 text-sky-600 font-black hover:bg-sky-50 transition-all flex items-center justify-center gap-2"
             >
               חיזוק מהקהילה
               <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </button>
          </div>

          {/* Founder Quote */}
          <div className="bg-yellow-400 rounded-[3rem] p-10 text-sky-950 shadow-lg reveal">
            <p className="font-black text-lg leading-relaxed italic mb-4">"החיים שלך שווים הרבה יותר מכל חפיסה. אל תוותר על המחר בשביל הרגע של היום."</p>
            <div className="text-xs font-black uppercase tracking-widest opacity-60">מנחם ג. - מייסד המרכז</div>
          </div>

        </div>
      </div>
    </div>
  );
};
