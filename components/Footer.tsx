
import React from 'react';

interface Props {
  onNavigate: (page: any) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-sky-950 text-sky-100/70 py-12 md:py-16 border-t border-sky-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 text-right">
        <div className="col-span-1 sm:col-span-2">
          <div className="flex items-center gap-2 mb-6 justify-start">
            <div className="bg-sky-500 p-2 rounded-lg">
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <span className="text-xl font-bold text-white">FREE FROM SMOKE</span>
          </div>
          <p className="max-w-md mb-6 leading-relaxed text-sm md:text-base">
            המרכז הוקם כיוזמה פרטית התנדבותית במטרה להנגיש ידע מחקרי עדכני ולספק תמיכה קהילתית לכל מי שבוחר בחיים בריאים יותר.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-lg">ניווט מהיר</h4>
          <ul className="space-y-4 text-sm md:text-base">
            <li><button onClick={() => onNavigate('home')} className="hover:text-yellow-300 transition-colors">דף הבית</button></li>
            <li><button onClick={() => onNavigate('tips')} className="hover:text-yellow-300 transition-colors">טיפים לגמילה</button></li>
            <li><button onClick={() => onNavigate('articles')} className="hover:text-yellow-300 transition-colors">מאמרים ומחקרים</button></li>
            <li><button onClick={() => onNavigate('forum')} className="hover:text-yellow-300 transition-colors">פורום תמיכה</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-yellow-300 transition-colors">צרו קשר</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-lg">מידע נוסף</h4>
          <ul className="space-y-4 text-sm md:text-base">
             <li><button onClick={() => onNavigate('about')} className="hover:text-yellow-300 transition-colors">הסיפור שלנו</button></li>
             <li><button onClick={() => onNavigate('calculator')} className="hover:text-yellow-300 transition-colors">מחשבון החסכונות ואריכות ימים</button></li>
             <li><button className="hover:text-yellow-300 transition-colors opacity-60 cursor-not-allowed">מדיניות פרטיות</button></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-sky-900 text-center text-[10px] md:text-xs opacity-40">
        © {new Date().getFullYear()} FREE FROM SMOKE - המרכז הישראלי למחקר ומידע. כל הזכויות שמורות למנחם ג.
      </div>
    </footer>
  );
};
