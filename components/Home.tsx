
import React, { useState, useMemo } from 'react';

interface Props {
  onNavigate: (page: any) => void;
}

const SmokingCalculator: React.FC = () => {
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
      lifeDays: lifeDaysLostYearly
    };
  }, [cigsPerDay, pricePerPack]);

  return (
    <div className="max-w-5xl mx-auto mb-20 px-4 relative z-30 reveal">
      <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-sky-100 p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-bl-full -z-10 opacity-40"></div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center text-right">
          <div>
            <div className="inline-block bg-sky-100 text-sky-700 text-xs font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              כלי אינטראקטיבי
            </div>
            <h2 className="text-3xl font-black text-sky-950 mb-6">מחשבון המחיר האמיתי</h2>
            <p className="text-slate-500 mb-10 leading-relaxed text-lg font-medium">
              גלו כמה כסף וזמן חיים יקרים אתם משקיעים בעשן. המספרים האלו הם העתיד שאתם יכולים להרוויח בחזרה.
            </p>
            
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-bold text-slate-700">כמה סיגריות ביום?</label>
                  <span className="text-sky-600 font-black text-xl">{cigsPerDay}</span>
                </div>
                <input 
                  type="range" min="1" max="60" value={cigsPerDay} 
                  onChange={(e) => setCigsPerDay(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center bg-sky-50/50 p-4 rounded-2xl border border-sky-100">
                  <label className="font-bold text-slate-700">מחיר ממוצע לחפיסה</label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">₪</span>
                    <input 
                      type="number" value={pricePerPack} 
                      onChange={(e) => setPricePerPack(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 text-center bg-transparent border-b-2 border-sky-300 focus:border-sky-600 outline-none font-black text-sky-600 text-xl transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-sky-50 p-8 rounded-3xl border border-sky-100 text-center shadow-sm">
              <div className="text-slate-400 text-[10px] mb-2 uppercase font-black tracking-widest">חיסכון חודשי</div>
              <div className="text-4xl font-black text-sky-700">₪{stats.monthly}</div>
            </div>
            <div className="bg-sky-600 p-8 rounded-3xl text-center shadow-xl">
              <div className="text-sky-100 text-[10px] mb-2 uppercase font-black tracking-widest">חיסכון שנתי</div>
              <div className="text-4xl font-black text-white">₪{stats.yearly}</div>
            </div>
            <div className="bg-sky-950 p-8 rounded-3xl text-center text-white col-span-2 shadow-2xl">
              <div className="text-yellow-400 text-[10px] mb-2 uppercase font-black tracking-widest">בעוד עשור תוכלו לחסוך</div>
              <div className="text-5xl font-black text-white mb-3">₪{stats.tenYears}</div>
              <div className="text-sm text-sky-200/50 font-medium tracking-wide">זמן להשקיע בעצמכם ובמשפחה</div>
            </div>
            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 text-center col-span-2 flex items-center justify-center gap-5">
              <div className="bg-sky-500 p-3 rounded-full text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <div className="text-right">
                <div className="text-sky-950 font-black text-lg">תוספת של {stats.lifeDays} ימי חיים בשנה</div>
                <div className="text-sky-700/60 text-sm font-bold">זמן יקר שלא חוזר</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home: React.FC<Props> = ({ onNavigate }) => {
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
        className="bg-sky-950 border-b border-sky-900 overflow-hidden py-2.5 relative cursor-pointer group z-40 shadow-xl"
        onClick={() => onNavigate('articles')}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <div className="bg-sky-500 text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap z-10 shadow-lg group-hover:scale-105 transition-transform uppercase tracking-widest">
            עדכוני מחקר
          </div>
          <div className="relative flex-grow overflow-hidden h-5">
            <div className="flex gap-16 animate-marquee-rtl whitespace-nowrap items-center h-full">
              {latestResearchHeadlines.map((text, i) => (
                <span key={i} className="text-xs md:text-sm font-bold text-sky-100 flex items-center gap-3 opacity-90">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  {text}
                </span>
              ))}
              {latestResearchHeadlines.map((text, i) => (
                <span key={`dup-${i}`} className="text-xs md:text-sm font-bold text-sky-100 flex items-center gap-3 opacity-90">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Personal, Powerful, and Emotional with Background Image */}
      <section className="relative hero-gradient text-white pt-24 pb-44 px-4 overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=2000" 
            alt="Family in nature" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-950/80 via-sky-900/40 to-sky-950/90"></div>
          {/* Decorative blurry circles */}
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-sky-300 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-yellow-200 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-10 border border-white/20 shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-yellow-300 animate-pulse"></span>
            <span className="text-xs font-black text-sky-50 tracking-[0.2em] uppercase">המרכז הלאומי למידע והפחתת נזקי עישון</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 leading-[1.1] tracking-tight drop-shadow-2xl">
            האמת על סיגריות:<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-yellow-100">הידע שמציל חיים</span>
          </h1>

          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] border border-white/20 shadow-2xl mt-12 mb-16 relative overflow-hidden group hover:border-white/30 transition-colors">
            <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500 text-white rounded-bl-3xl flex items-center justify-center shadow-lg opacity-40 group-hover:opacity-100 transition-opacity">
               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.899 14.914 16 16.017 16H19.017V14H17.017C15.36 14 14.017 12.657 14.017 11V8H20.017V14.167C20.017 17.418 17.368 20.067 14.117 20.067L14.017 21ZM5.017 21V18C5.017 16.899 5.914 16 7.017 16H10.017V14H8.017C6.36 14 5.017 12.657 5.017 11V8H11.017V14.167C11.017 17.418 8.368 20.067 5.117 20.067L5.017 21Z" /></svg>
            </div>
            <p className="text-xl md:text-3xl text-white leading-relaxed font-bold text-center">
              "הקמתי את המרכז הזה לאחר שאיבדתי את אבי לסרטן ריאות. הוא היה אדם חזק, אבל העישון הכניע אותו. המטרה שלי היא לוודא שאף משפחה לא תעבור את מה שאנחנו עברנו כי יש היום פתרונות. בפורום הזה, תקבלו ידע ותקווה!"
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
               <div className="h-px w-12 bg-sky-400/50"></div>
               <span className="text-sky-200 font-black tracking-widest text-sm uppercase">מנחם ג. - מייסד המרכז</span>
               <div className="h-px w-12 bg-sky-400/50"></div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => onNavigate('forum')}
              className="bg-sky-600 hover:bg-sky-500 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-[0_20px_40px_rgba(14,165,233,0.3)] active:scale-95 flex items-center gap-3"
            >
              הצטרפו לקהילה לקבלת תקווה
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </button>
            <button 
              onClick={() => onNavigate('articles')}
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-12 py-5 rounded-2xl font-black text-xl transition-all active:scale-95"
            >
              לספריית המחקרים
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <div className="-mt-16 relative z-30">
        <SmokingCalculator />
      </div>

      {/* Features & Research Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="text-center p-10 rounded-[2.5rem] bg-sky-50/50 border border-sky-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer reveal" onClick={() => onNavigate('articles')}>
            <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 className="text-2xl font-black text-sky-950 mb-4">מחקרים מתורגמים</h3>
            <p className="text-slate-500 font-medium">סיכומי מחקרים מובילים מהעולם, מתורגמים לעברית פשוטה.</p>
          </div>
          <div className="text-center p-10 rounded-[2.5rem] bg-yellow-50/50 border border-yellow-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer reveal reveal-delay-100" onClick={() => onNavigate('forum')}>
            <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-2xl font-black text-sky-950 mb-4">קהילה תומכת</h3>
            <p className="text-slate-500 font-medium">מרחב בטוח לשיתוף חוויות ותמיכה הדדית בדרך לחופש.</p>
          </div>
          <div className="text-center p-10 rounded-[2.5rem] bg-sky-50/50 border border-sky-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer reveal reveal-delay-200" onClick={() => onNavigate('about')}>
            <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-2xl font-black text-sky-950 mb-4">אמינות ויושרה</h3>
            <p className="text-slate-500 font-medium">המידע מבוסס ראיות בלבד ומנוהל בהתנדבות מלאה.</p>
          </div>
        </div>
      </section>

      {/* Latest Research Section */}
      <section className="py-24 bg-sky-50/30 reveal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-sky-950">מחקרים אחרונים מהמרכז</h2>
            <button onClick={() => onNavigate('articles')} className="mt-8 text-sky-700 font-black flex items-center gap-3 hover:translate-x-[-5px] transition-transform">
              לכל המחקרים
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredResearch.map((item, idx) => (
              <div key={item.id} onClick={() => onNavigate('articles')} className={`bg-white p-10 rounded-[2.5rem] shadow-sm border border-sky-50 hover:shadow-2xl transition-all cursor-pointer reveal reveal-delay-${(idx + 1) * 100}`}>
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-black text-sky-950 mb-4 leading-tight">{item.title}</h3>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed">{item.summary}</p>
                <span className="text-sky-600 font-black text-sm">קרא עוד ←</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
