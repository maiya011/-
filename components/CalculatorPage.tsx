
import React, { useState, useMemo } from 'react';

interface Props {
  onNavigate: (page: any) => void;
}

export const CalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  const [cigsPerDay, setCigsPerDay] = useState<number>(20);
  const [pricePerPack, setPricePerPack] = useState<number>(37);
  const [yearsSmoked, setYearsSmoked] = useState<number>(10);

  const stats = useMemo(() => {
    const packsPerDay = cigsPerDay / 20;
    const dailyCost = packsPerDay * pricePerPack;
    const monthlyCost = dailyCost * 30.44;
    const yearlyCost = monthlyCost * 12;
    
    // Past costs
    const totalSpentSoFar = yearlyCost * yearsSmoked;
    
    // Future growth (if invested at 7% average return)
    const futureValue10Years = yearlyCost * ((Math.pow(1 + 0.07, 10) - 1) / 0.07);
    
    // Health impact
    const totalCigs = cigsPerDay * 365 * yearsSmoked;
    const lifeMinutesLost = totalCigs * 11;
    const lifeDaysLost = Math.round(lifeMinutesLost / 60 / 24);
    
    // Toxins avoided (approximate grams of tar avoided if quitting now for 1 year)
    const tarAvoidedYearly = cigsPerDay * 0.012 * 365; // ~12mg tar per cig

    return {
      daily: Math.round(dailyCost),
      monthly: Math.round(monthlyCost).toLocaleString(),
      yearly: Math.round(yearlyCost).toLocaleString(),
      spentSoFar: Math.round(totalSpentSoFar).toLocaleString(),
      investmentPotential: Math.round(futureValue10Years).toLocaleString(),
      lifeDaysLost: lifeDaysLost.toLocaleString(),
      tarAvoided: tarAvoidedYearly.toFixed(1)
    };
  }, [cigsPerDay, pricePerPack, yearsSmoked]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-block bg-red-100 text-red-700 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-[0.2em]">
          מחשבון הנזק וההזדמנות
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-sky-950 mb-6">כמה באמת עולה לך העישון?</h1>
        <p className="text-slate-500 text-xl max-w-3xl mx-auto leading-relaxed">
          זה לא רק הכסף בארנק. זה העתיד הכלכלי שלך, הבריאות שלך והזמן היקר עם המשפחה. 
          השתמש במחשבון המורחב כדי לראות את התמונה המלאה.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-sky-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
            <h2 className="text-2xl font-black text-sky-950 mb-8 flex items-center gap-3">
              <span className="bg-sky-100 p-2 rounded-xl text-sky-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              </span>
              נתוני עישון אישיים
            </h2>

            <div className="space-y-12">
              <div className="group">
                <div className="flex justify-between mb-4">
                  <label className="font-bold text-slate-700 text-lg">כמות סיגריות ביום</label>
                  <span className="text-sky-600 font-black text-2xl group-hover:scale-110 transition-transform">{cigsPerDay}</span>
                </div>
                <input 
                  type="range" min="1" max="60" value={cigsPerDay} 
                  onChange={(e) => setCigsPerDay(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              <div className="group">
                <div className="flex justify-between mb-4">
                  <label className="font-bold text-slate-700 text-lg">כמה שנים כבר מעשן/ת?</label>
                  <span className="text-red-600 font-black text-2xl group-hover:scale-110 transition-transform">{yearsSmoked}</span>
                </div>
                <input 
                  type="range" min="1" max="50" value={yearsSmoked} 
                  onChange={(e) => setYearsSmoked(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-red-500"
                />
              </div>

              <div className="bg-sky-50 p-6 rounded-3xl border border-sky-100">
                <label className="block font-bold text-sky-900 mb-3 text-sm uppercase tracking-wider">מחיר ממוצע לחפיסה (₪)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" value={pricePerPack} 
                    onChange={(e) => setPricePerPack(Math.max(0, parseInt(e.target.value) || 0))}
                    className="flex-grow bg-white px-6 py-3 rounded-2xl border-2 border-sky-100 focus:border-sky-500 outline-none font-black text-xl text-sky-700 transition-all shadow-inner"
                  />
                  <div className="bg-sky-500 p-4 rounded-2xl text-white shadow-lg shadow-sky-100">₪</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-8 rounded-[2rem] border border-yellow-100 flex items-start gap-6 shadow-sm">
            <div className="bg-yellow-400 p-3 rounded-2xl text-white shrink-0">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h4 className="text-sky-900 font-black text-lg mb-2">הידעת?</h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                הכסף שאתה מוציא על עישון היום, אם היה מושקע בשוק ההון (למשל במדד S&P 500), היה יכול להפוך להון עצמי משמעותי לדירה או לפנסיה מוקדמת.
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-sky-50 hover:shadow-xl transition-all">
            <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">כבר שרפת עד היום</div>
            <div className="text-4xl font-black text-red-600 mb-2">₪{stats.spentSoFar}</div>
            <div className="text-slate-500 text-sm font-medium">הון שיכול היה להיות מושקע בעתיד שלך</div>
          </div>

          <div className="bg-sky-600 p-8 rounded-[2.5rem] shadow-xl text-white hover:-translate-y-1 transition-all">
            <div className="text-sky-200 text-[10px] font-black uppercase tracking-widest mb-2">אם תפסיק היום - חיסכון שנתי</div>
            <div className="text-4xl font-black mb-2">₪{stats.yearly}</div>
            <div className="text-sky-100/70 text-sm font-medium">תוספת נטו לשכר החודשי שלך</div>
          </div>

          <div className="bg-sky-900 p-10 rounded-[2.5rem] shadow-2xl text-white md:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-4">פוטנציאל השקעה ל-10 שנים הקרובות</div>
              <div className="text-6xl font-black mb-6">₪{stats.investmentPotential}</div>
              <p className="text-sky-100/70 text-lg max-w-lg leading-relaxed font-medium">
                זה הסכום שתצבור אם תחסוך את הכסף ותשקיע אותו בתשואה ממוצעת של 7%. 
                זה לא חלום, זו המתמטיקה של החיים שלך.
              </p>
            </div>
          </div>

          <div className="bg-red-50 p-8 rounded-[2.5rem] shadow-lg border border-red-100 hover:bg-white transition-colors">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="text-red-900 text-[10px] font-black uppercase tracking-widest mb-2">זמן חיים שאבד</div>
            <div className="text-4xl font-black text-red-600 mb-2">{stats.lifeDaysLost} ימים</div>
            <div className="text-red-900/60 text-sm font-medium leading-tight">של זמן יקר עם המשפחה והילדים</div>
          </div>

          <div className="bg-sky-50 p-8 rounded-[2.5rem] shadow-lg border border-sky-100 hover:bg-white transition-colors">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.282a2 2 0 01-1.806 0l-.628-.282a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-1.162 1.162a2 2 0 00.597 3.332l1.32.33a2 2 0 001.383-.162l.824-.412a2 2 0 011.788 0l.824.412a2 2 0 001.383.162l1.32-.33a2 2 0 00.597-3.332l-1.162-1.162z" /></svg>
            </div>
            <div className="text-sky-900 text-[10px] font-black uppercase tracking-widest mb-2">רעלים שנמנעים בשנה</div>
            <div className="text-4xl font-black text-sky-700 mb-2">{stats.tarAvoided} גרם</div>
            <div className="text-sky-900/60 text-sm font-medium leading-tight">של זפת (Tar) שלא יגיעו לריאות שלך בכל שנה</div>
          </div>
        </div>
      </div>
      
      <div className="mt-20 bg-sky-950 p-12 rounded-[3rem] text-white overflow-hidden relative">
        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h3 className="text-3xl font-black mb-6">הזמן הטוב ביותר להפסיק היה אתמול</h3>
            <p className="text-xl text-sky-200 mb-10 font-light leading-relaxed">
              הזמן השני הכי טוב הוא **עכשיו**. כל יום שאתה לא מעשן הוא ניצחון כלכלי ובריאותי. 
              בקהילה שלנו יש מאות אנשים שהיו בדיוק במקום שלך והצליחו לשנות את המספרים האלו לטובתם.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('tips')}
                className="bg-sky-400 hover:bg-sky-300 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-sky-400/20 transition-all active:scale-95 border-2 border-sky-300 drop-shadow-sm"
              >
                איך מתחילים גמילה?
              </button>
              <button 
                onClick={() => onNavigate('forum')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all active:scale-95"
              >
                לפורום התמיכה
              </button>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
             {[
               { t: '20 דקות', d: 'לחץ הדם והדופק חוזרים לנורמה' },
               { t: '12 שעות', d: 'רמת חד-תחמוצת הפחמן בדם יורדת' },
               { t: '3 חודשים', d: 'תפקוד הריאות משתפר משמעותית' },
               { t: 'שנה אחת', d: 'הסיכון למחלות לב יורד ב-50%' }
             ].map((m, i) => (
               <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10">
                 <div className="text-sky-400 font-black mb-2">{m.t}</div>
                 <div className="text-sm text-sky-100 font-medium leading-tight">{m.d}</div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
