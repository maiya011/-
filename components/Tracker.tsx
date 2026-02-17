
import React, { useState, useEffect, useMemo } from 'react';

interface Props {
  onNavigate: (page: any) => void;
}

interface HealthIndicator {
  label: string;
  durationSeconds: number;
  description: string;
}

export const Tracker: React.FC<Props> = ({ onNavigate }) => {
  // Persistence using localStorage
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

  // Real-time ticking
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(() => {
    const start = new Date(quitDate);
    const diffMs = now.getTime() - start.getTime();
    
    if (diffMs < 0) return null;

    const diffSeconds = diffMs / 1000;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const packsNotSmoked = (diffDays * cigsPerDay) / 20;
    const moneySaved = packsNotSmoked * pricePerPack;
    const cigsNotSmoked = diffDays * cigsPerDay;
    const lifeMinutesRegained = cigsNotSmoked * 11;

    // Time calculation
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return {
      days, hours, minutes, seconds,
      totalSeconds: diffSeconds,
      moneySaved: Math.round(moneySaved),
      cigsNotSmoked: Math.floor(cigsNotSmoked),
      lifeHoursRegained: Math.round(lifeMinutesRegained / 60),
      goalProgress: Math.min(100, (moneySaved / goalAmount) * 100)
    };
  }, [quitDate, cigsPerDay, pricePerPack, goalAmount, now]);

  const healthMilestones: HealthIndicator[] = [
    { label: 'לחץ דם ודופק', durationSeconds: 20 * 60, description: 'חזרה לרמה תקינה' },
    { label: 'רמת חמצן בדם', durationSeconds: 8 * 60 * 60, description: 'עלייה לרמה נורמלית' },
    { label: 'ניקוטין בגוף', durationSeconds: 48 * 60 * 60, description: 'התנקה לחלוטין' },
    { label: 'חוש טעם וריח', durationSeconds: 72 * 60 * 60, description: 'שיפור משמעותי' },
    { label: 'תפקוד ריאות', durationSeconds: 14 * 24 * 60 * 60, description: 'שיפור בזרימת האוויר' },
    { label: 'סיכון להתקף לב', durationSeconds: 365 * 24 * 60 * 60, description: 'ירידה של 50%' },
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
    const text = `אני כבר ${stats?.days} ימים נקי מעישון, חסכתי ₪${stats?.moneySaved} והרווחתי את החיים שלי בחזרה! 💪`;
    if (navigator.share) {
      navigator.share({ title: 'התקדמות הגמילה שלי', text }).catch(() => {});
    } else {
      alert(text);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-block bg-sky-100 text-sky-700 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          מעקב אישי פעיל
        </div>
        <h1 className="text-3xl md:text-6xl font-black text-sky-950 mb-4 leading-tight">המסע שלך לחיים נקיים</h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          כל שנייה ללא עישון היא ניצחון. המונה כאן מזכיר לך כמה רחוק כבר הגעת.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Statistics and Timer Panel */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-white rounded-[3rem] shadow-2xl border border-sky-50 overflow-hidden">
            <div className="bg-gradient-to-br from-sky-600 to-sky-800 p-8 md:p-14 text-center text-white relative">
              <div className="absolute top-6 right-6">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all"
                  title="ערוך הגדרות"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
              </div>

              <h2 className="text-xs md:text-sm font-black mb-10 opacity-70 tracking-[0.3em] uppercase">זמן חי ללא עישון</h2>
              
              {stats ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
                  <div className="bg-white/10 rounded-3xl p-5 backdrop-blur-md border border-white/5">
                    <div className="text-4xl md:text-7xl font-black mb-1">{stats.days}</div>
                    <div className="text-xs font-bold opacity-60">ימים</div>
                  </div>
                  <div className="bg-white/10 rounded-3xl p-5 backdrop-blur-md border border-white/5">
                    <div className="text-4xl md:text-7xl font-black mb-1">{stats.hours}</div>
                    <div className="text-xs font-bold opacity-60">שעות</div>
                  </div>
                  <div className="bg-white/10 rounded-3xl p-5 backdrop-blur-md border border-white/5">
                    <div className="text-4xl md:text-7xl font-black mb-1">{stats.minutes}</div>
                    <div className="text-xs font-bold opacity-60">דקות</div>
                  </div>
                  <div className="bg-white/10 rounded-3xl p-5 backdrop-blur-md border border-yellow-400/30">
                    <div className="text-4xl md:text-7xl font-black mb-1 text-yellow-300 drop-shadow-lg">{stats.seconds}</div>
                    <div className="text-xs font-bold opacity-60">שניות</div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-2xl font-black">הגדירו תאריך גמילה מעודכן...</div>
              )}
            </div>

            <div className="p-10 md:p-14">
              {isEditing ? (
                <div className="space-y-8 animate-scale-in">
                  <h3 className="font-black text-sky-900 text-2xl mb-2">עדכון נתונים</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">תאריך ושעת גמילה</label>
                      <input 
                        type="datetime-local" 
                        value={quitDate} 
                        onChange={(e) => setQuitDate(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">כמות סיגריות ביום</label>
                      <input 
                        type="number" 
                        value={cigsPerDay} 
                        onChange={(e) => setCigsPerDay(Number(e.target.value))}
                        className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">היעד לחיסכון</label>
                      <input 
                        type="text" 
                        value={savingsGoal} 
                        onChange={(e) => setSavingsGoal(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none font-bold"
                        placeholder="חופשה, מתנה..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">סכום היעד (₪)</label>
                      <input 
                        type="number" 
                        value={goalAmount} 
                        onChange={(e) => setGoalAmount(Number(e.target.value))}
                        className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none font-bold"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={handleSaveSettings}
                      className="flex-grow bg-sky-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-sky-700 transition-all shadow-xl shadow-sky-100 active:scale-95"
                    >
                      שמירת שינויים
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-8 py-5 rounded-2xl border-2 border-slate-100 font-bold text-slate-400 hover:bg-slate-50 transition-all"
                    >
                      ביטול
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className="bg-sky-50/50 p-8 rounded-[2.5rem] border border-sky-100 text-center hover:bg-white hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-sky-900 mb-1">₪{stats?.moneySaved}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">חיסכון מצטבר</div>
                  </div>

                  <div className="bg-sky-50/50 p-8 rounded-[2.5rem] border border-sky-100 text-center hover:bg-white hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-sky-900 mb-1">{stats?.cigsNotSmoked}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">סיגריות שנמנעו</div>
                  </div>

                  <div className="bg-sky-50/50 p-8 rounded-[2.5rem] border border-sky-100 text-center hover:bg-white hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-sky-900 mb-1">{stats?.lifeHoursRegained} ש'</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">זמן חיים שהרווחתם</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Health Recovery */}
          <div className="bg-slate-900 rounded-[3.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-black mb-12 flex items-center gap-4 relative z-10">
               <span className="bg-emerald-500/20 p-2 rounded-xl text-emerald-400">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
               </span>
               שיקום הגוף והבריאות
            </h3>
            
            <div className="grid gap-10 relative z-10">
              {healthMilestones.map((milestone, i) => {
                const totalSec = stats?.totalSeconds || 0;
                const progress = Math.min(100, (totalSec / milestone.durationSeconds) * 100);
                const isComplete = progress >= 100;

                return (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className={`text-sm font-black uppercase tracking-widest ${isComplete ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {milestone.label}
                        </span>
                        <p className="text-xs text-slate-500 font-bold mt-1 leading-relaxed">{milestone.description}</p>
                      </div>
                      <span className={`text-xs font-black ${isComplete ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {isComplete ? 'הושלם ✓' : `${Math.round(progress)}%`}
                      </span>
                    </div>
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      <div 
                        className={`h-full transition-all duration-1000 ${isComplete ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-sky-500'}`} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-yellow-400 rounded-[3rem] p-10 shadow-xl shadow-yellow-100/50 text-sky-950 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform"></div>
            <h3 className="text-xl font-black mb-6">היעד שלך: {savingsGoal}</h3>
            <div className="relative h-44 w-44 mx-auto mb-8">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="88" cy="88" r="80" stroke="rgba(0,0,0,0.05)" strokeWidth="14" fill="transparent" />
                 <circle 
                   cx="88" cy="88" r="80" 
                   stroke="currentColor" 
                   strokeWidth="14" 
                   fill="transparent" 
                   strokeDasharray={502.65}
                   strokeDashoffset={502.65 - (502.65 * (stats?.goalProgress || 0)) / 100}
                   strokeLinecap="round"
                   className="transition-all duration-1000"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-4xl font-black">{Math.round(stats?.goalProgress || 0)}%</span>
               </div>
            </div>
            <p className="text-center font-bold text-sky-900/80 mb-8">
              ₪{Math.max(0, goalAmount - (stats?.moneySaved || 0))} נותרו ליעד!
            </p>
            <button 
              onClick={shareProgress}
              className="w-full bg-sky-950 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95"
            >
              שתף התקדמות
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </button>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-sky-50 text-center">
            <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-black text-sky-950 mb-3">צריכים עזרה עכשיו?</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
              הדחף לעשן נמשך בדרך כלל 3-5 דקות. היכנסו לפורום לקבלת תמיכה מיידית.
            </p>
            <button 
              onClick={() => onNavigate('forum')}
              className="w-full py-4 rounded-2xl border-2 border-sky-100 text-sky-600 font-black hover:bg-sky-50 transition-all flex items-center justify-center gap-3"
            >
              חיזוק מיידי
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
