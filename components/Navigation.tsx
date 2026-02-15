
import React from 'react';

interface Props {
  currentPage: string;
  onNavigate: (page: any) => void;
  user: any;
  onLogout: () => void;
}

export const Navigation: React.FC<Props> = ({ currentPage, onNavigate, user, onLogout }) => {
  const navItems = [
    { id: 'home', label: 'דף הבית' },
    { id: 'about', label: 'הסיפור שלי' },
    { id: 'articles', label: 'מאמרים ומחקר' },
    { id: 'forum', label: 'פורום קהילה' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => onNavigate('home')}
            >
              <div className="bg-emerald-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-800">נקי מעישון</span>
            </div>
            
            <div className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-medium transition-all hover:text-emerald-600 relative py-1 ${
                    currentPage === item.id ? 'text-emerald-600' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full animate-scale-in"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <button 
                    onClick={() => onNavigate('admin')}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded"
                  >
                    ניהול
                  </button>
                )}
                <span className="text-sm font-medium text-slate-700">שלום, {user.username}</span>
                <button 
                  onClick={onLogout}
                  className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-sm hover:bg-slate-200 transition-colors"
                >
                  התנתק
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('auth')}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-shadow shadow-md hover:shadow-lg active:scale-95"
              >
                התחברות / הרשמה
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
