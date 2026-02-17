
import React from 'react';

export const Tips: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const timelineItems = [
    { time: '20 דקות', desc: 'צפוי שיפור בלחץ הדם ובקצב הלב' },
    { time: '8 שעות', desc: 'ירידה של 50% ברמת הפחמן הדו חמצני והניקוטין' },
    { time: '24 שעות', desc: 'הניקוטין מורחק מהגוף. שיפור בטעם ובריח' },
    { time: '48 שעות', desc: 'הפחמן הדו חמצני חוזר לרמתו התקינה. רירית הנשימה מתנקה' },
    { time: '72 שעות', desc: 'הקלה בנשימה. רמות האנרגיה עולות' },
    { time: '2-12 שבועות', desc: 'שיפור משמעותי בזרימת הדם' },
    { time: '3-9 חודשים', desc: 'ירידה בכמות השיעולים והצפצופים בריאות' },
    { time: 'שנה אחת', desc: 'ירידה של 50% בסיכון לאוטם שריר הלב' },
    { time: '10 שנים', desc: 'ירידה של 50% בסיכון לסרטן ריאות. סיכון להתקף לב כשל אדם לא מעשן' },
    { time: '15 שנים', desc: 'הסיכון לשבץ מוחי משתווה לאדם שלא עישן מעולם' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in-up">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 print:hidden">
        <div>
          <div className="inline-block bg-sky-100 text-sky-700 text-xs font-black px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            מתכון מנצח לגמילה
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-sky-950 mb-3">טיפים חשובים לגמילה מעישון</h1>
          <p className="text-slate-500 text-lg font-medium">המדריך המלא של המרכז - כל הכלים להצלחה במקום אחד</p>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-sky-50 border-2 border-sky-100 text-sky-600 px-6 py-3 rounded-2xl font-black hover:bg-sky-100 transition-all flex items-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          גרסה להדפסה
        </button>
      </div>

      <div className="grid gap-10">
        {/* Section 1: Before Quitting */}
        <section className="bg-white rounded-[3rem] shadow-xl border border-sky-50 overflow-hidden">
          <div className="bg-sky-400 p-8 text-white shadow-inner">
            <h2 className="text-2xl font-black flex items-center gap-3 drop-shadow-sm">
              <span className="bg-white/20 p-2 rounded-xl">1</span>
              לפני הפסקת העישון: הכנה מנטלית
            </h2>
          </div>
          <div className="p-8 md:p-12">
            <p className="text-slate-700 text-lg font-bold mb-8">הקדשת מחשבה מקדימה היא המפתח ליציבות. שאלו את עצמכם:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sky-50/50 p-6 rounded-3xl border border-sky-100">
                <h3 className="font-black text-sky-900 mb-2">למה אני רוצה להפסיק?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">כתבו את כל הסיבות ברשימה ושמרו אותה קרוב אליכם (בארנק או בטלפון).</p>
              </div>
              <div className="bg-sky-50/50 p-6 rounded-3xl border border-sky-100">
                <h3 className="font-black text-sky-900 mb-2">מהם הטריגרים שלי?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">חשבו על ההרגלים: מתי אתם מעשנים? היכן? מהן התחושות שגורמות לכם לרצות סיגריה?</p>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <h4 className="font-black text-sky-950 text-xl mb-4 underline decoration-sky-300 underline-offset-8">מומלץ לעשות:</h4>
              {[
                'דחיית הסיגריה: לפני ההדלקה, המתינו 5 דקות. נסו להעלות את הזמן בכל יום.',
                'קבעו תאריך יעד: בחרו יום במהלך השבועיים הקרובים. אל תחכו יותר.',
                'שתפו את הסביבה: בקשו מחברים לא להציע לכם סיגריות ולא לעשן בקרבתכם.',
                'ניקוי סביבתי: זרקו מאפרות, מציתים וקופסאות מהבית ומהרכב.',
                'טקס פרידה: עשנו את הסיגריה האחרונה במודעות מלאה, ואז צאו לטיול או נקו שיניים.'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors border-r-4 border-sky-400">
                  <span className="text-sky-400 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </span>
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: First Days */}
        <section className="bg-white rounded-[3rem] shadow-xl border border-yellow-50 overflow-hidden">
          <div className="bg-yellow-500 p-8 text-white">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <span className="bg-white/20 p-2 rounded-xl">2</span>
              בימים הראשונים: התמודדות עם הדחף
            </h2>
          </div>
          <div className="p-8 md:p-12">
            <div className="bg-yellow-50 border-r-8 border-yellow-400 p-6 rounded-2xl mb-10">
              <p className="text-sky-950 font-bold leading-relaxed">
                התכוננו לתסמונת הגמילה - הניקוטין הוא חומר ממכר. עייפות, חוסר שקט, עצבנות וכאבי ראש הם טבעיים בימים הראשונים. 
                <span className="block mt-2 text-sky-700 font-black italic">אחרי שבוע עד עשרה ימים, הכמיהה הפיזית תיעלם!</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                <div className="text-3xl mb-4">🌬️</div>
                <h3 className="font-black text-sky-900 mb-2">שיטת הנשימות</h3>
                <p className="text-xs text-slate-500 leading-relaxed">כשהדחף עולה, קחו 10 נשימות עמוקות. החזיקו את האוויר מספר שניות ונשפו באיטיות.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                <div className="text-3xl mb-4">🥗</div>
                <h3 className="font-black text-sky-900 mb-2">נשנוש בריא</h3>
                <p className="text-xs text-slate-500 leading-relaxed">הכינו ירקות ופירות חתוכים מראש. השתמשו בהם ברגע שבו היד מחפשת סיגריה.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                <div className="text-3xl mb-4">🏃</div>
                <h3 className="font-black text-sky-900 mb-2">פעילות גופנית</h3>
                <p className="text-xs text-slate-500 leading-relaxed">הליכה קצרה או אימון קל משפרים את מצב הרוח ומסיחים את הדעת מהעישון.</p>
              </div>
            </div>
            
            <div className="mt-12 text-center p-8 bg-sky-950 rounded-3xl text-white">
              <h4 className="text-xl font-black mb-4">אל תחשבו על "לעולם לא אעשן יותר"</h4>
              <p className="text-sky-200 text-4xl font-black uppercase tracking-tighter animate-pulse italic">
                חשבו רק על: "היום לא אעשן"
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Weight Gain */}
        <section className="bg-white rounded-[3rem] shadow-xl border border-sky-50 overflow-hidden">
          <div className="bg-emerald-600 p-8 text-white">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <span className="bg-white/20 p-2 rounded-xl">3</span>
              מודאגים מעלייה במשקל?
            </h2>
          </div>
          <div className="p-8 md:p-12">
            <p className="text-slate-600 mb-8 font-medium">החשש מובן, אך עם צעדים פשוטים ניתן למזער את הסיכון:</p>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-4">
                {[
                  'שתו הרבה מים - מים או שתייה לא ממותקת בין הארוחות.',
                  'ארוחות מסודרות - כל 3-4 שעות כדי למנוע רעב קיצוני.',
                  'סיבים תזונתיים - לחם מלא, ירקות ופירות עם הקליפה.'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 italic text-emerald-800 text-sm">
                "אל תתחילו דיאטה חריפה במקביל. התמודדות עם שני שינויים גדולים בבת אחת עלולה להקשות על תהליך הגמילה."
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Timeline */}
        <section className="bg-slate-900 rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(14,165,233,0.15),_transparent)] pointer-events-none"></div>
          <h2 className="text-3xl font-black mb-12 text-center">מה קורה לגוף כשמפסיקים לעשן?</h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
            {timelineItems.map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <div className="text-sky-400 font-black text-lg whitespace-nowrap min-w-[100px] border-l border-white/10 ml-4 pl-4">{item.time}</div>
                <div className="text-sky-50/80 font-medium text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 text-center">
            <p className="text-xl font-black mb-6">מרבית ה"מעידות" מתרחשות בשבועיים הראשונים.</p>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              הדלקתם סיגריה? אל תתייאשו. מעידה היא אירוע מלמד. בדקו מה היה הטריגר, רכשו כלים חדשים והמשיכו קדימה. חצי הדרך להצלחה כבר מאחוריכם!
            </p>
          </div>
        </section>
      </div>

      <div className="mt-20 text-center text-slate-400 text-sm print:hidden">
        מבוסס על המלצות רשמיות של משרד הבריאות וקופות החולים. המידע אינו מהווה תחליף לייעוץ רפואי אישי.
      </div>

      {/* Special styles for printing */}
      <style>{`
        @media print {
          nav, footer, .print\\:hidden, button { display: none !important; }
          body { background: white; color: black; }
          .max-w-5xl { max-width: 100%; margin: 0; padding: 0; }
          section { border: 1px solid #eee; margin-bottom: 20px; page-break-inside: avoid; }
          .bg-sky-400, .bg-yellow-500, .bg-emerald-600, .bg-sky-950 { background: #f8fafc !important; color: black !important; border-bottom: 2px solid #000 !important; }
          .text-white { color: black !important; }
          .bg-slate-900 { background: white !important; color: black !important; border: 2px solid #000; }
          .text-sky-400 { color: #0284c7 !important; font-weight: bold; }
        }
      `}</style>
    </div>
  );
};
