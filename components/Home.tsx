
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
    <div className="max-w-5xl mx-auto -mt-16 mb-20 px-4 relative z-30 animate-fade-in-up delay-300">
      <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -z-10 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-50 rounded-tr-full -z-10 opacity-40"></div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              כלי אינטראקטיבי
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">מחשבון המחיר האמיתי</h2>
            <p className="text-slate-600 mb-10 leading-relaxed text-lg">
              תראו כמה כסף וזמן חיים יקרים אתם משקיעים בעשן. המספרים האלו הם לא רק נתונים, הם העתיד שלכם ושל המשפחה שלכם.
            </p>
            
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-bold text-slate-700">כמה סיגריות ביום?</label>
                  <span className="text-emerald-600 font-black text-xl">{cigsPerDay}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="60" 
                  value={cigsPerDay} 
                  onChange={(e) => setCigsPerDay(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="font-bold text-slate-700">מחיר ממוצע לחפיסה</label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">₪</span>
                    <input 
                      type="number" 
                      value={pricePerPack} 
                      onChange={(e) => setPricePerPack(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-16 text-center bg-transparent border-b-2 border-emerald-300 focus:border-emerald-600 outline-none font-black text-emerald-600 text-xl transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 text-center shadow-sm hover:shadow-md transition-all">
              <div className="text-slate-500 text-[10px] mb-2 uppercase font-black tracking-widest">חיסכון חודשי</div>
              <div className="text-4xl font-black text-emerald-700">₪{stats.monthly}</div>
            </div>
            <div className="bg-emerald-900 p-8 rounded-3xl text-center shadow-xl hover:-translate-y-1 transition-all">
              <div className="text-emerald-300/80 text-[10px] mb-2 uppercase font-black tracking-widest">חיסכון שנתי</div>
              <div className="text-4xl font-black text-white">₪{stats.yearly}</div>
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl text-center text-white col-span-2 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-emerald-400 text-[10px] mb-2 uppercase font-black tracking-widest">מה תעשו עם הכסף בעוד עשור?</div>
                <div className="text-5xl font-black text-white mb-3">₪{stats.tenYears}</div>
                <div className="text-sm text-slate-400 font-medium">זה יכול להיות הבית שלכם, הרכב הבא, או לימודים לילדים</div>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center col-span-2 flex items-center justify-center gap-5 shadow-sm">
              <div className="bg-red-500 p-3 rounded-full text-white animate-pulse shadow-lg shadow-red-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <div className="text-right">
                <div className="text-red-900 font-black text-lg">תוספת של {stats.lifeDays} ימי חיים בכל שנה</div>
                <div className="text-red-700/70 text-sm font-medium">זמן יקר עם הילדים והנכדים שאי אפשר לקנות בכסף</div>
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
        className="bg-emerald-950 border-b border-emerald-900 overflow-hidden py-2.5 relative cursor-pointer group z-40 shadow-xl"
        onClick={() => onNavigate('articles')}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <div className="bg-emerald-500 text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap z-10 shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform uppercase tracking-widest">
            עדכוני מחקר
          </div>
          <div className="relative flex-grow overflow-hidden h-5">
            <div className="flex gap-16 animate-marquee-rtl whitespace-nowrap items-center h-full">
              {latestResearchHeadlines.map((text, i) => (
                <span key={i} className="text-xs md:text-sm font-bold text-emerald-100 flex items-center gap-3 opacity-90 hover:opacity-100">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
                  {text}
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {latestResearchHeadlines.map((text, i) => (
                <span key={`dup-${i}`} className="text-xs md:text-sm font-bold text-emerald-100 flex items-center gap-3 opacity-90">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes marquee-rtl {
            0% { transform: translateX(50%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-rtl {
            animation: marquee-rtl 80s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee-rtl:hover {
            animation-play-state: paused;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
        `}</style>
      </div>

      {/* Hero Section */}
      <section className="relative hero-gradient text-white pt-24 pb-48 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-emerald-500/10"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/20 shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-100 tracking-widest uppercase">המרכז הלאומי למידע והפחתת נזקי עישון</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            האמת על סיגריות:<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">הידע שמציל חיים</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            "הקמתי את המרכז הזה לאחר שאיבדתי את אבי לסרטן ריאות. הוא היה אדם חזק, אבל העישון הכניע אותו. המטרה שלי היא לוודא שאף משפחה לא תעבור את מה שאנחנו עברנו מחוסר ידע."
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => onNavigate('articles')}
              className="group relative bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-xl transition-all shadow-[0_15px_30px_rgba(5,150,105,0.4)] hover:shadow-[0_20px_40px_rgba(5,150,105,0.5)] active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">לספריית המחקרים</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
            <button 
              onClick={() => onNavigate('forum')}
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-10 py-4 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-95"
            >
              הצטרפו לקהילה
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <SmokingCalculator />

      {/* Feature Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div 
            className="group relative text-center p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all cursor-pointer overflow-hidden"
            onClick={() => onNavigate('articles')}
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4">מחקרים מתורגמים</h3>
            <p className="text-slate-500 leading-relaxed font-medium">סיכומי מחקרים מאוניברסיטאות מובילות בעולם, מתורגמים לעברית פשוטה ונגישה.</p>
          </div>
          
          <div 
            className="group relative text-center p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all cursor-pointer overflow-hidden"
            onClick={() => onNavigate('forum')}
          >
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:-rotate-6 transition-all duration-500">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4">קהילה תומכת</h3>
            <p className="text-slate-500 leading-relaxed font-medium">מרחב בטוח לשיתוף חוויות, קבלת טיפים ותמיכה הדדית בתהליך הגמילה.</p>
          </div>

          <div 
            className="group relative text-center p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all cursor-pointer overflow-hidden"
            onClick={() => onNavigate('about')}
          >
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-amber-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4">אמינות ויושרה</h3>
            <p className="text-slate-500 leading-relaxed font-medium">אנחנו לא מוכרים מוצרים בחסות חברות מסחריות. המידע מבוסס ראיות בלבד ומנוהל בהתנדבות מלאה.</p>
          </div>
        </div>
      </section>

      {/* Latest Research Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <div className="inline-block bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full mb-4 uppercase tracking-[0.2em]">
                ספריית ידע
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">מחקרים אחרונים מהמרכז</h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">הצצה לסיכומי המחקר המדעיים החדשים ביותר שעלו לאתר, המבוססים על מקורות אמינים בלבד.</p>
            </div>
            <button 
              onClick={() => onNavigate('articles')}
              className="mt-8 md:mt-0 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-black hover:border-emerald-500 hover:text-emerald-600 shadow-sm hover:shadow-xl transition-all flex items-center gap-3 group"
            >
              לכל המאמרים והמחקרים
              <svg className="w-5 h-5 group-hover:translate-x-[-5px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredResearch.map((item, idx) => (
              <div 
                key={item.id} 
                onClick={() => onNavigate('articles')}
                className={`group bg-white p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all cursor-pointer flex flex-col animate-fade-in-up`}
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-500">{item.icon}</div>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">{item.cat}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors leading-tight">{item.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed mb-10 flex-grow font-medium">{item.summary}</p>
                
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-emerald-600 font-black text-sm group-hover:translate-x-[-5px] transition-transform flex items-center gap-2">
                    קרא עוד
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                  <div className="bg-slate-100 p-2 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/20 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <svg className="w-16 h-16 text-emerald-500/30 mx-auto mb-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.899 14.914 16 16.017 16H19.017V14H17.017C15.36 14 14.017 12.657 14.017 11V8H20.017V14.167C20.017 17.418 17.368 20.067 14.117 20.067L14.017 21ZM5.017 21V18C5.017 16.899 5.914 16 7.017 16H10.017V14H8.017C6.36 14 5.017 12.657 5.017 11V8H11.017V14.167C11.017 17.418 8.368 20.067 5.117 20.067L5.017 21Z" /></svg>
          <p className="text-3xl md:text-4xl italic font-light text-white mb-10 leading-tight">
            "אנחנו לא אומרים לאנשים מה לעשות - אנחנו נותנים להם את כל המידע שהם צריכים כדי להבין את המחיר הבריאותי והכלכלי."
          </p>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto mb-8 rounded-full"></div>
          <p className="font-black text-emerald-400 uppercase tracking-[0.3em] text-sm">המרכז הישראלי למחקר ומידע על נזקי עישון</p>
        </div>
      </section>
    </div>
  );
};
