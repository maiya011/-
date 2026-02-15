
import React, { useState } from 'react';

interface Props {
  onLogin: (user: { id: number; username: string; role: string }) => void;
}

export const Auth: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ id: 1, username: 'ישראל ישראלי', role: 'user' });
  };

  const handleAdminLogin = () => {
    onLogin({ id: 99, username: 'מנהל המערכת', role: 'admin' });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 animate-fade-in">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 animate-scale-in">
        <h2 className="text-3xl font-black text-slate-800 mb-3 text-center">
          {isLogin ? 'ברוכים השבים' : 'הצטרפו לקהילה'}
        </h2>
        <p className="text-slate-500 text-center mb-10 font-medium">
          {isLogin ? 'היכנסו כדי להשתתף בפורום ולשמור מאמרים' : 'הרשמה מהירה וקלה לקהילת נקי מעישון'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="animate-fade-in">
              <label className="block text-sm font-black text-slate-700 mb-2">שם משתמש</label>
              <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all text-lg font-medium" required />
            </div>
          )}
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">כתובת אימייל</label>
            <input type="email" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all text-lg font-medium" required />
          </div>
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">סיסמה</label>
            <input type="password" placeholder="••••••••" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all text-lg font-medium" required />
          </div>
          
          <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all mt-6 shadow-xl shadow-emerald-100 hover:shadow-emerald-200 active:scale-95">
            {isLogin ? 'התחברות רגילה' : 'יצירת חשבון'}
          </button>
        </form>

        {isLogin && (
          <div className="mt-5">
            <button 
              onClick={handleAdminLogin}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-all border-2 border-slate-900 active:scale-95"
            >
              כניסת מנהל (הדגמה)
            </button>
          </div>
        )}
        
        <div className="mt-10 pt-10 border-t border-slate-100 text-center">
          <p className="text-slate-500 font-bold">
            {isLogin ? 'עדיין לא רשומים?' : 'כבר יש לכם חשבון?'}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 font-black mr-3 hover:text-emerald-700 transition-colors underline decoration-2 underline-offset-4"
            >
              {isLogin ? 'צרו חשבון' : 'התחברו כאן'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
