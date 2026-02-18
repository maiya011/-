
import React, { useState, useMemo, useEffect } from 'react';

interface Props {
  onNavigate: (page: any) => void;
}

const SmokingCalculator: React.FC<{onNavigate: (page: any) => void}> = ({ onNavigate }) => {
  const [cigsPerDay, setCigsPerDay] = useState<number>(20);
  const [pricePerPack, setPricePerPack] = useState<number>(37);

  const stats = useMemo(() => {
    const packsPerDay = cigsPerDay / 20;
    const monthlyCost = packsPerDay * pricePerPack * 30.44;
    const yearlyCost = monthlyCost * 12;
    const tenYearCost = yearlyCost * 10;
    
    const lifeMinutesLostYearly = cigsPerDay * 11 * 365;
    const lifeDaysLostYearly = Math.round(lifeMinutesLostYearly / 60 / 24);

    return {
      monthly: Math.round(monthlyCost),
      yearly: Math.round(yearlyCost).toLocaleString(),
      tenYears: Math.round(tenYearCost).toLocaleString(),
      lifeDays: lifeDaysLostYearly,
      vacations: Math.floor(tenYearCost / 15000)
    };
  }, [cigsPerDay, pricePerPack]);

  return (
    <div className="max-w-5xl mx-auto mb-20 px-4 relative z-30 reveal visible">
      <div className="bg-white/95 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-sky-100 p-6 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-bl-full -z-10 opacity-40"></div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center text-right">
          <div>
            <div className="inline-block bg-red-100 text-red-700 text-[10px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              חשב את המחיר שלך
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-sky-950 mb-4 md:mb-6">כמה העשן עולה לך?</h2>
            <p className="text-slate-500 mb-6 md:mb-10 leading-relaxed text-base md:text-lg font-medium">
              גלו כמה כסף וזמן חיים אתם משקיעים בעשן. בעשור הקרוב תוכלו לחסוך הון שיספיק ל- <span className="text-sky-600 font-black">{stats.vacations} חופשות משפחתיות מפנקות</span>.
            </p>
            
            <div className="space-y-6 md:space-y-10">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-bold text-slate-700">סיגריות ביום</label>
                  <span className="text-red-600 font-black text-xl">{cigsPerDay}</span>
                </div>
                <input 
                  type="range" min="1" max="60" value={cigsPerDay} 
                  onChange={(e) => setCigsPerDay(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center bg-sky-50/50 p-4 rounded-2xl border border-sky-100">
                  <label className="font-bold text-slate-700">מחיר לחפיסה</label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">₪</span>
                    <input 
                      type="number" value={pricePerPack} 
                      onChange={(e) => setPricePerPack(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 text-center bg-transparent border-b-2 border-sky-300 focus:border-sky-600 outline-none font-black text-sky-600 text-xl"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('calculator')}
                className="text-sky-600 font-black text-sm underline underline-offset-4 hover:text-sky-800 transition-colors"
              >
                למחשבון החסכונות ואריכות ימים ←
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div className="bg-sky-50 p-4 md:p-8 rounded-2xl md:rounded-3xl border border-sky-100 text-center shadow-sm">
              <div className="text-slate-400 text-[8px] md:text-[10px] mb-2 uppercase font-black tracking-widest">חיסכון חודשי</div>
              <div className="text-2xl md:text-4xl font-black text-sky-700">₪{stats.monthly}</div>
            </div>
            <div className="bg-red-600 p-4 md:p-8 rounded-2xl md:rounded-3xl text-center shadow-xl">
              <div className="text-red-100 text-[8px] md:text-[10px] mb-2 uppercase font-black tracking-widest">חיסכון שנתי</div>
              <div className="text-2xl md:text-4xl font-black text-white">₪{stats.yearly}</div>
            </div>
            <div className="bg-sky-950 p-6 md:p-8 rounded-2xl md:rounded-3xl text-center text-white col-span-2 shadow-2xl">
              <div className="text-yellow-400 text-[8px] md:text-[10px] mb-2 uppercase font-black tracking-widest">בעשור הקרוב תחסוך/י</div>
              <div className="text-3xl md:text-5xl font-black text-white mb-2 md:mb-3">₪{stats.tenYears}</div>
              <div className="text-xs md:text-sm text-sky-200/50 font-medium tracking-wide">זה שווה ערך לדירה קטנה או רכב חדש</div>
            </div>
            <div className="bg-yellow-50 p-4 md:p-6 rounded-2xl border border-yellow-100 text-center col-span-2 flex items-center justify-center gap-3 md:gap-5">
              <div className="bg-red-500 p-2 md:p-3 rounded-full text-white shadow-lg">
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="text-right">
                <div className="text-sky-950 font-black text-base md:text-lg">תוספת של {stats.lifeDays} ימי חיים בשנה</div>
                <div className="text-sky-700/60 text-[10px] md:text-sm font-bold">זמן יקר שלא חוזר</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home: React.FC<Props> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const latestResearchHeadlines = [
    "ישראל היום: שינוי שיטת המיסוי על סיגריות עשוי להכניס למדינה עד מיליארד ש\"ח בשנה.",
    "סקירת קאן (The Khan Review): הצגת התוכנית להפיכת העישון למיושן באנגליה עד 2040.",
    "מחקר ברונל: מעבר של 50% מהמעשנים לתחליפים יחסוך ל-NHS כ-518 מיליון ליש\"ט בשנה.",
    "מחקר AHA: אין רף בטוח - גם 2 עד 5 סיגריות ביום מכפילות את הסיכון למחלות לב.",
    "ניסוי NIHR: סיגריות אלקטרוניות נמצאו יעילות פי שניים מתחליפי ניקוטין מסורתיים.",
    "סקירת פגרסטרום: מדינות שאימצו תחליפי ניקוטין הורידו את שיעורי העישון מהר יותר.",
    "סקירת מורג'ריה: הפחתת נזק משמעותית של 90-95% בחשיפה לרעלים עבור חולי COPD."
  ];

  const featuredResearch = [
    {
      id: 7,
      title: "שינוי שיטת מיסוי הטבק בישראל",
      summary: "פוטנציאל להכנסות של מיליארד ש\"ח למדינה וצמצום הסחר הבלתי חוקי דרך מיסוי קצוב.",
      cat: "מחקרים כלכליים",
      icon: "🇮🇱"
    },
    {
      id: 1,
      title: "סקירת קאן (The Khan Review)",
      summary: "תוכנית נועזת להפיכת העישון למיושן באנגליה תוך עשור, כולל העלאת גיל המכירה בכל שנה.",
      cat: "סקירות ממשלתיות",
      icon: "🏛️"
    },
    {
      id: 2,
      title: "מחקר אוניברסיטת ברונל",
      summary: "חיסכון של חצי מיליארד ליש\"ט למערכת הבריאות בעקבות מעבר מסיגריות למוצרים ללא בעירה.",
      cat: "מחקרים כלכליים",
      icon: "💰"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Research Ticker */}
      <div 
        className="bg-sky-950 border-b border-sky-900 overflow-hidden py-2 relative cursor-pointer group z-40 shadow-xl"
        onClick={() => onNavigate('articles')}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 md:gap-4">
          <div className="bg-sky-500 text-white text-[8px] md:text-xs font-black px-2 md:px-4 py-1 rounded-full whitespace-nowrap z-10 shadow-lg transition-transform uppercase tracking-widest">
            עדכוני מחקר
          </div>
          <div className="relative flex-grow overflow-hidden h-4 md:h-5">
            <div className="flex gap-8 md:gap-16 animate-marquee-rtl whitespace-nowrap items-center h-full">
              {latestResearchHeadlines.map((text, i) => (
                <span key={i} className="text-[10px] md:text-sm font-bold text-sky-100 flex items-center gap-2 opacity-90">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full"></span>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative hero-gradient text-white pt-16 md:pt-24 pb-32 md:pb-44 px-4 overflow-hidden min-h-[70vh] md:min-h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=2000" 
            alt="Family in nature" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay scale-110"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-950/80 via-sky-900/40 to-sky-950/90"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 px-2">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-6 md:mb-10 border border-white/20 shadow-xl">
            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-yellow-300 animate-pulse"></span>
            <span className="text-[8px] md:text-xs font-black text-sky-50 tracking-[0.1em] md:tracking-[0.2em] uppercase text-right">FREE FROM SMOKE</span>
          </div>
          
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-10 leading-tight md:leading-[1.1] tracking-tight drop-shadow-2xl">
            האמת על סיגריות:<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-yellow-100">הידע שמציל חיים</span>
          </h1>

          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-2xl p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-white/20 shadow-2xl mt-8 md:mt-12 mb-10 md:mb-16 relative overflow-hidden group">
            <p className="text-base md:text-3xl text-white leading-relaxed font-bold text-center">
              "הקמתי את המרכז הזה לאחר שאיבדתי את אבי לסרטן ריאות. המטרה שלי היא לוודא שאף משפחה לא תעבור את מה שאנחנו עברנו. בפורום הזה, תקבלו ידע ותקווה!"
            </p>
            <div className="mt-4 md:mt-8 flex items-center justify-center gap-3">
               <span className="text-sky-200 font-black tracking-widest text-[10px] md:text-sm uppercase">מנחם ג. - מייסד המרכז</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <button 
              onClick={() => onNavigate('forum')}
              className="bg-yellow-400 hover:bg-yellow-300 text-sky-950 px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all shadow-xl shadow-yellow-900/20 active:scale-95 flex items-center justify-center gap-3"
            >
              הצטרפו לקהילה
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </button>
            <button 
              onClick={() => onNavigate('articles')}
              className="bg-yellow-400 hover:bg-yellow-300 text-sky-950 px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all shadow-xl shadow-yellow-900/20 active:scale-95 flex items-center justify-center gap-3"
            >
              לספריית המחקרים
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <div className="-mt-12 md:-mt-16 relative z-30">
        <SmokingCalculator onNavigate={onNavigate} />
      </div>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="text-center p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-sky-50/50 border border-sky-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer reveal visible" onClick={() => onNavigate('articles')}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-sky-100 text-sky-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-sky-950 mb-3 md:mb-4">מחקרים מתורגמים</h3>
            <p className="text-slate-500 font-medium text-sm md:text-base">סיכומי מחקרים מובילים מהעולם, מתורגמים לעברית פשוטה.</p>
          </div>
          <div className="text-center p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-yellow-50/50 border border-yellow-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer reveal visible" onClick={() => onNavigate('forum')}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-100 text-yellow-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-sky-950 mb-3 md:mb-4">קהילה תומכת</h3>
            <p className="text-slate-500 font-medium text-sm md:text-base">מרחב בטוח לשיתוף חוויות ותמיכה הדדית בדרך לחופש.</p>
          </div>
          <div className="text-center p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-sky-50/50 border border-sky-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer reveal visible" onClick={() => onNavigate('about')}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-sky-100 text-sky-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-sky-950 mb-3 md:mb-4">אמינות ויושרה</h3>
            <p className="text-slate-500 font-medium text-sm md:text-base">המידע מבוסס ראיות בלבד ומנוהל בהתנדבות מלאה.</p>
          </div>
        </div>
      </section>

      {/* Latest Research Section */}
      <section className="py-16 md:py-24 bg-sky-50/30 reveal visible">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4">
            <h2 className="text-3xl md:text-5xl font-black text-sky-950 leading-tight">מחקרים אחרונים מהמרכז</h2>
            <button onClick={() => onNavigate('articles')} className="text-sky-700 font-black flex items-center gap-2 hover:translate-x-[-5px] transition-transform">
              לכל המחקרים
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredResearch.map((item, idx) => (
              <div key={item.id} onClick={() => onNavigate('articles')} className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-sky-50 hover:shadow-2xl transition-all cursor-pointer reveal visible">
                <div className="text-3xl md:text-4xl mb-4 md:mb-6">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-black text-sky-950 mb-3 md:mb-4 leading-tight">{item.title}</h3>
                <p className="text-slate-500 font-medium mb-6 md:mb-8 text-sm md:text-base leading-relaxed">{item.summary}</p>
                <span className="text-sky-600 font-black text-sm">קרא עוד ←</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
