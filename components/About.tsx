
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-sky-50">
        <div className="h-80 bg-sky-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950 to-transparent"></div>
            <h1 className="text-5xl font-black text-white relative z-10 animate-fade-in-up">הסיפור מאחורי המרכז</h1>
        </div>
        <div className="p-8 md:p-16 prose prose-slate max-w-none">
          <h2 className="text-3xl md:text-4xl font-black text-sky-600 mb-10 leading-tight animate-slide-in-right">"הייתי רוצה שאנשים יידעו את מה שלא ידענו אז"</h2>
          
          <div className="space-y-8 text-xl leading-relaxed text-slate-700 font-medium">
            <p className="font-black text-2xl text-sky-950 animate-fade-in delay-100">
              אני לא כועס, לא רוצה להעציב, ולא מנסה לשכנע אף אחד.
            </p>
            
            <p className="animate-fade-in delay-200">
              אבל אני כן רוצה לשתף את מי שיקרא את הפוסט הזה במשהו אישי וקבור אצלי בלב – משהו שלא מדברים עליו מספיק, אפילו שזה כל כך חשוב. 
            </p>

            <div className="bg-yellow-50 p-10 rounded-[2.5rem] border-r-8 border-yellow-400 my-12 shadow-inner animate-scale-in delay-400">
              <h3 className="text-2xl font-black text-sky-900 mb-6 italic flex items-center gap-3">
                 <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 הבעיה האמיתית בעישון היא לא הניקוטין.
              </h3>
              <p className="text-slate-800 text-lg">
                האם ידעתם? הבעיה החמורה והמחמירה של הסיגריות היא <strong>העשן</strong>. 
                העשן שמגיע מהמבער של הסיגריות מכיל חומרים רעילים – אותם חומרים שמובילים למחלות הקשות.
              </p>
              <p className="text-sky-900 mt-6 font-bold">
                הניקוטין? לא בריא. ובעיקר ממכר. אבל הוא לא הגורם העיקרי למחלות הקשות והסופניות.
              </p>
            </div>

            <p className="animate-fade-in delay-500">
              כל מה שאני אומר כאן ומשתף מבוסס לחלוטין על ידי מחקרים. במדינות אחרות בעולם, כבר הבינו את זה ויש שינוי משמעותי בכמות המעשנים ובמספרים של חולים מסרטן. 
            </p>

            <div className="flex flex-col md:flex-row gap-8 my-14 animate-fade-in-up delay-500">
              <div className="flex-1 bg-sky-50 p-8 rounded-3xl border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-sky-900 mb-3 text-xl">הכרה בינלאומית</h4>
                <p className="text-base text-slate-600 leading-relaxed font-medium">ה-FDA וגופי בריאות מובילים מכירים בתחליפי עישון כחלופות פחות מזיקות.</p>
              </div>
              <div className="flex-1 bg-yellow-50/50 p-8 rounded-3xl border border-yellow-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-sky-900 mb-3 text-xl">היבט כלכלי</h4>
                <p className="text-base text-slate-600 leading-relaxed font-medium">שינוי הרגלים מוביל גם לחיסכון כלכלי משמעותי לטווח הארוך.</p>
              </div>
            </div>

            <p className="text-sky-600 font-black text-2xl mt-12 animate-fade-in-up delay-500">
              מאחל לכולם בריאות ושתזכו לשנים רבות עם היקרים לכם.
            </p>
          </div>
          
          <div className="mt-20 pt-10 border-t border-sky-50 flex items-center gap-8 animate-fade-in delay-500">
            <div className="relative group">
              <div className="absolute -inset-1 bg-sky-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img src="https://picsum.photos/seed/menachem/150/150" alt="מנחם ג." className="relative w-28 h-28 rounded-full border-4 border-sky-50 shadow-2xl object-cover transform transition-transform group-hover:scale-105" />
            </div>
            <div>
                <p className="font-black text-3xl text-sky-950">מנחם ג.</p>
                <p className="text-sky-600 font-black text-lg">מייסד המרכז ופעיל חברתי</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
