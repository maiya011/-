
import React from 'react';

interface Props {
  onNavigate: (page: any) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-sky-950 text-sky-100/70 py-12 border-t border-sky-900">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-sky-500 p-2 rounded-lg">
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <span className="text-xl font-bold text-white">נקי מעישון</span>
          </div>
          <p className="max-w-md mb-6 leading-relaxed">
            המרכז הוקם כיוזמה פרטית של מנחם ג., במטרה להגביר את המודעות לנזקי העישון ולסייע למשפחות בישראל להימנע מהמחיר הכבד של הטבק.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">ניווט מהיר</h4>
          <ul className="space-y-4">
            <li><button onClick={() => onNavigate('home')} className="hover:text-yellow-300">דף הבית</button></li>
            <li><button onClick={() => onNavigate('tips')} className="hover:text-yellow-300">טיפים לגמילה</button></li>
            <li><button onClick={() => onNavigate('articles')} className="hover:text-yellow-300">מאמרים ומחקרים</button></li>
            <li><button onClick={() => onNavigate('forum')} className="hover:text-yellow-300">פורום תמיכה</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">משפטי</h4>
          <ul className="space-y-4">
             <li><button className="hover:text-yellow-300 text-sm">תנאי שימוש</button></li>
             <li><button className="hover:text-yellow-300 text-sm">מדיניות פרטיות</button></li>
             <li><button className="hover:text-yellow-300 text-sm">צרו קשר</button></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-sky-900 text-center text-xs opacity-50">
        © {new Date().getFullYear()} נקי מעישון - המרכז הישראלי למחקר ומידע. כל הזכויות שמורות.
      </div>
    </footer>
  );
};
