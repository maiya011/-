
import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // סימולציה של שליחת נתונים לשרת (Admin Email)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form Submitted to Admin:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-scale-in">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-sky-50 inline-block">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-sky-950 mb-4">הודעתך התקבלה!</h2>
          <p className="text-slate-500 text-xl font-medium mb-10 max-w-md mx-auto leading-relaxed">
            תודה שפנית אלינו. צוות המרכז יבדוק את פנייתך ויחזור אלייך בהקדם האפשרי לכתובת המייל שציינת.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="bg-sky-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-sky-700 transition-all shadow-xl shadow-sky-100 active:scale-95"
          >
            שלח הודעה נוספת
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <div className="inline-block bg-sky-100 text-sky-700 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          אנחנו כאן בשבילכם
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-sky-950 mb-6">צרו איתנו קשר</h1>
        <p className="text-slate-500 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
          יש לכם שאלה על מחקר? צריכים תמיכה בתהליך הגמילה? או אולי סתם רוצים לשתף בסיפור האישי שלכם? נשמח לשמוע מכם.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-sky-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            
            <h2 className="text-3xl font-black mb-10 relative z-10">פרטי התקשרות</h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-3 rounded-2xl">
                  <svg className="w-6 h-6 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-black text-sky-200 text-sm uppercase tracking-wider mb-1">דוא"ל למנהל המרכז</h3>
                  <p className="text-xl font-bold">admin@naki-meishun.org.il</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-3 rounded-2xl">
                  <svg className="w-6 h-6 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-black text-sky-200 text-sm uppercase tracking-wider mb-1">מיקום המרכז</h3>
                  <p className="text-xl font-bold">תל אביב - יפו, ישראל</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-3 rounded-2xl">
                  <svg className="w-6 h-6 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-black text-sky-200 text-sm uppercase tracking-wider mb-1">שעות מענה בפורום</h3>
                  <p className="text-xl font-bold">א' - ה': 09:00 - 20:00</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-6 bg-white/5 rounded-3xl border border-white/10 text-sm text-sky-100 leading-relaxed italic">
              "אנחנו משתדלים לחזור לכל פנייה בתוך 24 שעות. אם מדובר במקרה דחוף בתהליך הגמילה, מומלץ לכתוב בפורום לקבלת תמיכה מיידית מהקהילה."
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl border border-sky-50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sky-900 font-black text-sm uppercase tracking-widest mb-3">שם מלא</label>
                  <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    placeholder="ישראל ישראלי"
                  />
                </div>
                <div>
                  <label className="block text-sky-900 font-black text-sm uppercase tracking-widest mb-3">כתובת דוא"ל</label>
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sky-900 font-black text-sm uppercase tracking-widest mb-3">נושא הפנייה</label>
                <select 
                  name="subject" required value={formData.subject} onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none transition-all font-bold text-slate-700 appearance-none"
                >
                  <option value="">בחרו נושא...</option>
                  <option value="גמילה">תמיכה בתהליך גמילה</option>
                  <option value="מחקר">שאלה בנושא מחקר</option>
                  <option value="שיתוף">שיתוף סיפור אישי</option>
                  <option value="טכני">בעיה טכנית באתר</option>
                  <option value="אחר">אחר</option>
                </select>
              </div>

              <div>
                <label className="block text-sky-900 font-black text-sm uppercase tracking-widest mb-3">תוכן ההודעה</label>
                <textarea 
                  name="message" required rows={5} value={formData.message} onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl focus:border-sky-500 focus:bg-white outline-none transition-all font-bold text-slate-700 resize-none"
                  placeholder="כתבו לנו כאן..."
                ></textarea>
              </div>

              <button 
                type="submit" disabled={status === 'sending'}
                className={`w-full py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 ${
                  status === 'sending' 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sky-100 hover:shadow-sky-200'
                }`}
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    שולח הודעה...
                  </>
                ) : (
                  <>
                    שליחת הודעה למנהל
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
