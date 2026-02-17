
import React, { useState } from 'react';
import { api } from '../services/api.ts';

interface Props {
  onLogin: (user: { id: number; username: string; role: string }) => void;
}

export const Auth: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        const user = await api.login(email, password);
        onLogin(user);
      } else {
        await api.register(username, email, password);
        // לאחר הרשמה, ננסה להתחבר אוטומטית
        const user = await api.login(email, password);
        onLogin(user);
      }
    } catch (err: any) {
      setError(err.message || 'שגיאה בפעולה');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 animate-fade-in">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-800 mb-3 text-center">
          {isLogin ? 'ברוכים השבים' : 'הצטרפו לקהילה'}
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center mb-6 font-bold text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-black text-slate-700 mb-2">שם משתמש</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-emerald-500 outline-none font-medium" 
                required 
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">כתובת אימייל</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-emerald-500 outline-none font-medium" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">סיסמה</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-emerald-500 outline-none font-medium" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl disabled:opacity-50"
          >
            {isLoading ? 'מעבד...' : (isLogin ? 'התחברות' : 'יצירת חשבון')}
          </button>
        </form>
        
        <div className="mt-10 pt-10 border-t border-slate-100 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-emerald-600 font-black">
            {isLogin ? 'צרו חשבון חדש' : 'כבר יש לכם חשבון? התחברו'}
          </button>
        </div>
      </div>
    </div>
  );
};
