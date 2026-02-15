
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="h-80 bg-slate-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            <h1 className="text-5xl font-black text-white relative z-10 animate-fade-in-up">הסיפור מאחורי המרכז</h1>
        </div>
        <div className="p-8 md:p-16 prose prose-slate max-w-none">
          <h2 className="text-3xl md:text-4xl font-black text-emerald-600 mb-10 leading-tight animate-slide-in-right">"הייתי רוצה שאנשים יידעו את מה שלא ידענו אז"</h2>
          
          <div className="space-y-8 text-xl leading-relaxed text-slate-700 font-medium">
            <p className="font-black text-2xl text-slate-900 animate-fade-in delay-100">
              אני לא כועס, לא רוצה להעציב, ולא מנסה לשכנע אף אחד.
            </p>
            
            <p className="animate-fade-in delay-200">
              אבל אני כן רוצה לשתף את מי שיקרא את הפוסט הזה במשהו אישי וקבור אצלי בלב – משהו שלא מדברים עליו מספיק, אפילו שזה כל כך חשוב. 
              התקווה שלי? לגרום למודעות ולמנוע נזקים עתידיים בקרב המעשנים. המחיר שאני שילמתי היה כבד מדי.
            </p>

            <p className="animate-fade-in delay-300">
              הייתי ילד וגדלתי בלי אבא, למרות שבשנים הראשונות לחיי, הוא היה שם פיזית. את רוב הילדות שלי העשן של הסיגריות מילא את הבית יותר מהנוכחות שלו.
              בסופו של דבר, אבא שלי חלה בסרטן ריאות ואיבדתי אותו בגיל צעיר. 
              וכל מה שנשאר לי זה לחשוב – אם רק היינו יודעים את מה שאנחנו יודעים היום, אולי הדברים היו יכולים להיות שונים ולא היינו מאבדים אותו.
            </p>

            <div className="bg-emerald-50 p-10 rounded-[2.5rem] border-r-8 border-emerald-500 my-12 shadow-inner animate-scale-in delay-400">
              <h3 className="text-2xl font-black text-emerald-900 mb-6 italic flex items-center gap-3">
                 <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 הבעיה האמיתית בעישון היא לא הניקוטין.
              </h3>
              <p className="text-emerald-800 text-lg">
                האם ידעתם? הבעיה החמורה והמחמירה של הסיגריות היא <strong>העשן</strong>. 
                העשן שמגיע מהמבער של הסיגריות מכיל חומרים רעילים – אותם חומרים שמובילים למחלות הקשות: סרטן, מחלות לב, פגיעות בריאות.
              </p>
              <p className="text-emerald-800 mt-6 font-bold">
                הניקוטין? לא בריא. ובעיקר ממכר. אבל הוא לא הגורם העיקרי למחלות הקשות והסופניות.
              </p>
            </div>

            <p className="animate-fade-in delay-500">
              אז מה עושים? ברור שעדיף לא לעשן. לא להתחיל בכלל. להפסיק! אבל מי כמוני יודע וראה עד כמה היה קשה לאבא שלי להפסיק עם ההרגל ההרסני הזה! 
              היום קיימים פתרונות אלטרנטיביים, שיכולים לעזור לאלו שמעשנים ועדיין לא מצליחים להפסיק.
            </p>

            <p className="animate-fade-in delay-500">
              כל מה שאני אומר כאן ומשתף מבוסס לחלוטין על ידי מחקרים. במדינות אחרות בעולם, כבר הבינו את זה ויש שינוי משמעותי בכמות המעשנים ובמספרים של חולים מסרטן. 
              תחליפי העישון אפילו גורמים לחלק משמעותי להפסיק לעשן – ממש כמו "אבן דרך".
            </p>

            <div className="flex flex-col md:flex-row gap-8 my-14 animate-fade-in-up delay-500">
              <div className="flex-1 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-slate-900 mb-3 text-xl">הכרה בינלאומית</h4>
                <p className="text-base text-slate-600 leading-relaxed font-medium">ה-FDA עצמו מכיר בתחליפי העישון כמוצרים פחות מסוכנים מאשר סיגריות רגילות. מדינות רבות כבר עברו למוצרים כמו חימום טבק ואידוי.</p>
              </div>
              <div className="flex-1 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-slate-900 mb-3 text-xl">היבט כלכלי</h4>
                <p className="text-base text-slate-600 leading-relaxed font-medium">עבור הרבה אנשים התחליפים גם יותר זולים מהסיגריות. למרות שאין פתרון בריא ב-100%, ניכרת הפחתת נזקים משמעותית.</p>
              </div>
            </div>

            <p className="font-black text-slate-900 text-2xl animate-fade-in delay-500">
              אז אני לא מגיע לשכנע, אני רק רוצה להעלות מודעות לנושא הזה. אני רוצה שידעו שזו אפשרות.
              אולי זה יאפשר לאדם כמו אבא שלי להישאר קצת יותר זמן בבית.
            </p>

            <p className="text-emerald-600 font-black text-2xl mt-12 animate-fade-in-up delay-500">
              מאחל לכולם בריאות ושתזכו לשנים רבות עם היקרים לכם.
            </p>
          </div>
          
          <div className="mt-20 pt-10 border-t border-slate-100 flex items-center gap-8 animate-fade-in delay-500">
            <div className="relative group">
              <div className="absolute -inset-1 bg-emerald-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img src="https://picsum.photos/seed/menachem/150/150" alt="מנחם ג." className="relative w-28 h-28 rounded-full border-4 border-emerald-50 shadow-2xl object-cover transform transition-transform group-hover:scale-105" />
              <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-2 rounded-full shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            </div>
            <div>
                <p className="font-black text-3xl text-slate-900">מנחם ג.</p>
                <p className="text-emerald-600 font-black text-lg">מייסד המרכז ופעיל חברתי להפחתת נזקי העישון</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
