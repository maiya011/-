
import React, { useState, useMemo, useEffect } from 'react';

interface Props {
  onNavigate: (page: any) => void;
}

export const CalculatorPage: React.FC<Props> = ({ onNavigate }) => {
  // Inputs
  const [age, setAge] = useState<number>(35);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [cigsPerDay, setCigsPerDay] = useState<number>(Number(localStorage.getItem('tracker-cigs')) || 20);
  const [pricePerPack, setPricePerPack] = useState<number>(Number(localStorage.getItem('tracker-price')) || 37);
  const [cigsInPack, setCigsInPack] = useState<number>(20);
  const [yearsSmoked, setYearsSmoked] = useState<number>(10);

  const stats = useMemo(() => {
    const packsPerDay = cigsPerDay / cigsInPack;
    const dailyCost = packsPerDay * pricePerPack;
    const yearlyCost = dailyCost * 365.25;
    
    // Past Calculations
    const totalCigsPast = cigsPerDay * 365.25 * yearsSmoked;
    const totalSpentSoFar = (totalCigsPast / cigsInPack) * pricePerPack;
    
    // Future with 4% annual price increase (Inflation)
    let future10YearsCost = 0;
    let currentYearPrice = yearlyCost;
    for (let i = 0; i < 10; i++) {
      future10YearsCost += currentYearPrice;
      currentYearPrice *= 1.04; // 4% hike each year
    }

    // Health Impact logic
    const lifeMinutesLostPerCig = 11;
    const totalLifeMinutesLost = totalCigsPast * lifeMinutesLostPerCig;
    const lifeDaysLost = Math.round(totalLifeMinutesLost / (60 * 24));
    
    // Lung Age estimate (Psychological metric)
    // Formula: Actual Age + (Pack Years * Constant)
    const packYears = (cigsPerDay / 20) * yearsSmoked;
    const lungAge = age + (packYears * 1.5);

    // Contextual Health Message by Age
    let ageMessage = "";
    if (age < 30) ageMessage = "זה הזמן הקריטי ביותר. הפסקה עכשיו תמנע כמעט את כל הנזק המצטבר בעתיד.";
    else if (age < 45) ageMessage = "מחקרים מראים שהפסקה לפני גיל 40 מחזירה כמעט 10 שנים לתוחלת החיים שלך.";
    else ageMessage = "אף פעם לא מאוחר. גם בגילך, תוך שנה אחת בלבד הסיכון להתקף לב יורד ב-50%.";

    // Comparisons
    const thailandTrips = Math.floor(totalSpentSoFar / 12000);
    const familyCars = Math.floor(totalSpentSoFar / 140000);
    const monthlyRent = Math.floor(totalSpentSoFar / 5500);

    return {
      spentSoFar: Math.round(totalSpentSoFar).toLocaleString(),
      future10Years: Math.round(future10YearsCost).toLocaleString(),
      lifeDaysLost: lifeDaysLost.toLocaleString(),
      totalCigs: Math.round(totalCigsPast).toLocaleString(),
      lungAge: Math.round(lungAge),
      ageMessage,
      comparisons: { thailandTrips, familyCars, monthlyRent },
      tarGrams: ((totalCigsPast * 12) / 1000).toFixed(1)
    };
  }, [age, gender, cigsPerDay, pricePerPack, cigsInPack, yearsSmoked]);

  const handleSave = () => {
    localStorage.setItem('tracker-cigs', cigsPerDay.toString());
    localStorage.setItem('tracker-price', pricePerPack.toString());
    localStorage.setItem('tracker-age', age.toString());
    alert('הנתונים נשמרו! המעקב האישי שלך עודכן בהתאם.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-block bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-[0.2em] shadow-lg">
          מחשבון החסכונות ואריכות ימים
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-sky-950 mb-6">מחשבון החסכונות ואריכות ימים</h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">
          גלו כמה באמת עלה לכם העבר, ומה אתם יכולים להרוויח מהעתיד שלכם.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Input Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-24">
            <h2 className="text-xl font-black text-sky-900 mb-8 border-r-4 border-red-500 pr-3">הנתונים שלך</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">הגיל שלך</label>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full bg-transparent font-black text-sky-700 text-xl outline-none" />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">מגדר</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value as any)} className="w-full bg-transparent font-black text-sky-700 text-sm outline-none">
                    <option value="male">גבר</option>
                    <option value="female">אישה</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-slate-700">סיגריות ביום</label>
                  <span className="text-red-600 font-black">{cigsPerDay}</span>
                </div>
                <input type="range" min="1" max="60" value={cigsPerDay} onChange={(e) => setCigsPerDay(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-red-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">מחיר חפיסה</label>
                  <input type="number" value={pricePerPack} onChange={(e) => setPricePerPack(Number(e.target.value))} className="w-full bg-transparent font-black text-sky-700 text-xl outline-none" />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">שנות עישון</label>
                  <input type="number" value={yearsSmoked} onChange={(e) => setYearsSmoked(Number(e.target.value))} className="w-full bg-transparent font-black text-red-600 text-xl outline-none" />
                </div>
              </div>

              <button onClick={handleSave} className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-red-700 transition-all active:scale-95">
                שמור נתונים לפרופיל
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {/* Top Money Card */}
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10">
               <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
             </div>
             <div className="relative z-10">
                <h3 className="text-red-400 font-black text-sm uppercase tracking-widest mb-4">הפסד מצטבר עד היום</h3>
                <div className="text-6xl md:text-8xl font-black mb-6">₪{stats.spentSoFar}</div>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold">~ {stats.totalCigs} סיגריות</div>
                  <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold">~ {stats.tarGrams} גרם זפת בריאות</div>
                </div>
             </div>
          </div>

          {/* Psychological Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 text-center">
              <h4 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4">גיל הריאות הביולוגי</h4>
              <div className="text-6xl font-black text-red-600 mb-2">{stats.lungAge}</div>
              <p className="text-slate-500 font-medium">למרות שאתה בן {age}, הריאות שלך מתפקדות כמו אדם בן {stats.lungAge}.</p>
            </div>
            <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100 flex flex-col justify-center">
              <h4 className="text-red-600 font-black text-xs uppercase tracking-widest mb-4">הפסד זמן חיים</h4>
              <div className="text-4xl font-black text-slate-900 mb-2">{stats.lifeDaysLost} ימים</div>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">זהו זמן נטו שנגזל מהעתיד שלך עם המשפחה והחברים.</p>
            </div>
          </div>

          {/* Future Projection */}
          <div className="bg-emerald-600 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-emerald-100 font-black text-sm uppercase tracking-widest mb-4">חיסכון ב-10 השנים הבאות (כולל עליית מחירים)</h3>
              <div className="text-5xl md:text-7xl font-black mb-6">₪{stats.future10Years}</div>
              <p className="text-emerald-50 text-lg font-medium max-w-xl">{stats.ageMessage}</p>
            </div>
          </div>

          {/* Viral Components */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="text-3xl mb-3">✈️</div>
              <div className="text-2xl font-black text-slate-900">{stats.comparisons.thailandTrips}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase">חופשות בתאילנד</div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="text-3xl mb-3">🚗</div>
              <div className="text-2xl font-black text-slate-900">{stats.comparisons.familyCars}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase">רכב משפחתי חדש</div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="text-3xl mb-3">🏠</div>
              <div className="text-2xl font-black text-slate-900">{stats.comparisons.monthlyRent}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase">חודשי שכירות</div>
            </div>
          </div>

          {/* Achievements CTA */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-[3rem] p-10 text-center">
            <h3 className="text-2xl font-black text-sky-900 mb-4">מוכנים להתחיל לחסוך?</h3>
            <p className="text-slate-600 font-medium mb-8">הצטרפו לאלפי אנשים שכבר עוקבים אחרי ההישגים שלהם בדרך לחופש.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={() => onNavigate('auth')} className="bg-sky-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-sky-700 transition-all shadow-lg">צור חשבון למעקב חי</button>
               <button onClick={() => onNavigate('forum')} className="bg-white border-2 border-slate-200 text-slate-600 px-10 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all">התייעץ בפורום</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
