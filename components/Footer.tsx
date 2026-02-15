
import React from 'react';

interface Props {
  onNavigate: (page: any) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-emerald-600 p-2 rounded-lg">
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <span className="text-xl font-bold text-white">נקי מעישון</span>
          </div>
          <p className="max-w-md mb-6 leading-relaxed">
            המרכז הוקם כיוזמה פרטית של מנחם ג., גמלאי ששם לו למטרה להגביר את המודעות לנזקי העישון ולסייע למשפחות בישראל להימנע מהמחיר הכבד של הטבק.
          </p>
          <div className="flex gap-4">
             {/* Social Icons Placeholder */}
             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">ניווט מהיר</h4>
          <ul className="space-y-4">
            <li><button onClick={() => onNavigate('home')} className="hover:text-emerald-400">דף הבית</button></li>
            <li><button onClick={() => onNavigate('articles')} className="hover:text-emerald-400">מאמרים ומחקרים</button></li>
            <li><button onClick={() => onNavigate('forum')} className="hover:text-emerald-400">פורום תמיכה</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-emerald-400">מי אנחנו</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">משפטי</h4>
          <ul className="space-y-4">
             <li><button className="hover:text-emerald-400 text-sm">תנאי שימוש</button></li>
             <li><button className="hover:text-emerald-400 text-sm">מדיניות פרטיות</button></li>
             <li><button className="hover:text-emerald-400 text-sm">הצהרת נגישות</button></li>
             <li><button className="hover:text-emerald-400 text-sm">צרו קשר</button></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
        © {new Date().getFullYear()} נקי מעישון - המרכז הישראלי למחקר ומידע. כל הזכויות שמורות. מבוסס על ידע מדעי.
      </div>
    </footer>
  );
};
