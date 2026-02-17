
import React from 'react';

export const Facts: React.FC = () => {
  const swedenStats = [
    { label: 'שיעור עישון בשוודיה', value: '5.6%', sub: 'מול 23% ממוצע אירופי', color: 'emerald' },
    { label: 'תמותה מטבק (גברים)', value: '-44%', sub: 'נמוך מהממוצע באיחוד האירופי', color: 'sky' },
    { label: 'תמותה מסרטן הריאות', value: '-41%', sub: 'הנתון הנמוך ביותר באירופה', color: 'indigo' },
    { label: 'סרטן באופן כללי', value: '-38%', sub: 'בהשוואה לממוצע ה-EU', color: 'blue' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
      {/* Header section based on smokefreesweden.org */}
      <div className="text-center mb-20">
        <div className="inline-block bg-sky-100 text-sky-700 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          The Swedish Experience: 5% Smoke Free
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-sky-950 mb-8 leading-tight tracking-tight">המודל השוודי: <br/><span className="text-sky-600">המהפכה בבריאות הציבור</span></h1>
        <p className="text-slate-500 text-xl max-w-4xl mx-auto leading-relaxed font-medium">
          שוודיה עומדת להפוך למדינה הראשונה בעולם המוגדרת "נקייה מעישון" (פחות מ-5% שכיחות). הנתונים המחקריים מוכיחים כי גישת "הפחתת הנזק" מצילה חיים בקנה מידה לאומי.
        </p>
      </div>

      {/* Grid of Key Stats from Resources */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {swedenStats.map((stat, i) => (
          <div key={i} className={`bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform text-center relative overflow-hidden group`}>
            <div className={`absolute top-0 right-0 w-2 h-full bg-${stat.color}-500 opacity-20`}></div>
            <div className={`text-4xl md:text-5xl font-black text-slate-900 mb-4 group-hover:text-${stat.color}-600 transition-colors`}>{stat.value}</div>
            <div className="text-lg font-black text-slate-800 mb-2 leading-tight">{stat.label}</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Deep Dive into Harm Reduction */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="order-2 lg:order-1">
          <div className="bg-sky-950 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(14,165,233,0.1),_transparent)]"></div>
             <h2 className="text-3xl font-black mb-10 relative z-10 flex items-center gap-4">
               <span className="text-yellow-400">💡</span>
               מה המדע אומר?
             </h2>
             <div className="space-y-8 relative z-10">
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                 <h3 className="font-black text-xl mb-4 text-sky-400 leading-tight">הפחתת נזק מול איסור מוחלט</h3>
                 <p className="text-sky-100/70 leading-relaxed font-medium">
                   המפתח להצלחה השוודית הוא הנגשת חלופות ניקוטין ללא בעירה. המדע מוכיח כי 95% מהנזק הבריאותי נגרם מהבעירה (עשן) ולא מהניקוטין עצמו.
                 </p>
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <div className="text-center">
                   <div className="text-3xl font-black text-emerald-400 mb-2">38%</div>
                   <div className="text-[10px] text-white/50 uppercase font-black tracking-widest">פחות תמותה מסרטן</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-black text-sky-400 mb-2">44%</div>
                   <div className="text-[10px] text-white/50 uppercase font-black tracking-widest">פחות מחלות טבק</div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-sky-950 mb-6 leading-tight">למה ישראל צריכה ללמוד מהמודל השוודי?</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              בשוודיה, המעשנים עוברים למוצרים כמו סנוס או סיגריות אלקטרוניות – מוצרים ללא בעירה. התוצאה היא ירידה דרמטית בעומס על מערכת הבריאות ובשיעורי התמותה.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl font-black shrink-0">1</div>
              <div>
                <h4 className="font-black text-sky-900 text-xl mb-2">פחות רעלים</h4>
                <p className="text-slate-500 text-sm leading-relaxed">מוצרי הפחתת נזק מכילים עד 95% פחות כימיקלים מזיקים בהשוואה לסיגריה רגילה.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl font-black shrink-0">2</div>
              <div>
                <h4 className="font-black text-sky-900 text-xl mb-2">הגנה על הסביבה</h4>
                <p className="text-slate-500 text-sm leading-relaxed">ללא עשן סיגריות יד שנייה, כל הסביבה הופכת לבריאה יותר עבור הילדים והמשפחה.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action based on Resource Page */}
      <div className="bg-emerald-50 p-12 rounded-[4rem] border border-emerald-100 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-right">
        <div className="lg:shrink-0">
          <img 
            src="https://smokefreesweden.org/wp-content/themes/smokefree/assets/img/logo-dark.svg" 
            alt="Smoke Free Sweden" 
            className="h-14 opacity-80"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-2xl font-black text-sky-950 mb-4 leading-tight">רוצים לראות את כל המקורות?</h3>
          <p className="text-slate-600 font-medium">כל הנתונים המוצגים כאן מבוססים על מחקרי אורך ונתוני WHO המפורסמים באתר Smoke Free Sweden.</p>
        </div>
        <a 
          href="https://smokefreesweden.org/resources/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-sky-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-sky-700 transition-all shadow-xl shadow-sky-100 flex items-center gap-4 group active:scale-95"
        >
          לספריית המשאבים המלאה
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </a>
      </div>
    </div>
  );
};
