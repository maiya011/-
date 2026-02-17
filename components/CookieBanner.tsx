
import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(14,165,233,0.15)] border border-sky-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-100 p-3 rounded-2xl text-yellow-600 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-black text-sky-950 mb-1">אנחנו משתמשים בעוגיות</h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              כדי להבטיח שתקבלו את החוויה הטובה ביותר באתר שלנו, אנחנו משתמשים בקוקיז לניתוח נתונים והתאמת תכנים. המשך הגלישה מהווה הסכמה לכך.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={() => window.open('/privacy', '_blank')}
            className="flex-1 md:flex-none px-6 py-3 rounded-xl text-sky-700 font-bold text-sm hover:bg-sky-50 transition-colors"
          >
            הגדרות
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none bg-sky-600 text-white px-10 py-3 rounded-xl font-black text-sm hover:bg-sky-700 shadow-lg shadow-sky-100 hover:shadow-sky-200 transition-all active:scale-95"
          >
            אני מאשר/ת
          </button>
        </div>
      </div>
    </div>
  );
};
