import React, { useState } from 'react';

interface Props {
  currentPage: string;
  onNavigate: (page: any) => void;
  user: any;
  onLogout: () => void;
}

export const Navigation: React.FC<Props> = ({ currentPage, onNavigate, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // הגדרת פריטי התפריט הבסיסיים
  const navItems = [
    { id: 'home', label: 'דף הבית' },
    // הצגת המעקב רק למשתמשים רשומים ומחוברים
    ...(user ? [{ id: 'tracker', label: 'המעקב שלי' }] : []),
    { id: 'tips', label: 'טיפים לגמילה' },
    { id: 'articles', label: 'מאמרים' },
    { id: 'forum', label: 'פורום קהילה' },
    { id: 'contact', label: 'צור קשר' },
  ];

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4 lg:gap-8">
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>

            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => handleNavigate('home')}
            >
              <div className="bg-sky-500 p-2 rounded-lg">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-lg md:text-xl font-bold text-sky-900 whitespace-nowrap">נקי מעישון</span>
            </div>
            
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-sm font-medium transition-all hover:text-sky-600 relative py-1 ${
                    currentPage === item.id ? 'text-sky-600' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full animate-scale-in"></span>
                  )}
                </button>
              ))}
              
              <button
                onClick={() => handleNavigate('calculator')}
                className={`text-sm font-black transition-all px-4 py-1.5 rounded-full border-2 flex items-center gap-2 ${
                  currentPage === 'calculator' 
                    ? 'bg-red-600 text-white border-red-600 shadow-lg' 
                    : 'text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                מחשבון
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <button 
                  onClick={() => handleNavigate(user.role === 'admin' ? 'admin' : 'user-dashboard')}
                  className={`text-xs md:text-sm font-bold px-3 py-2 rounded-lg transition-all ${
                    ['admin', 'user-dashboard'].includes(currentPage)
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-sky-600 hover:bg-sky-50'
                  }`}
                >
                  {user.role === 'admin' ? 'לוח בקרה' : 'הדשבורד'}
                </button>
                <button 
                  onClick={onLogout}
                  className="bg-slate-100 text-slate-600 px-3 py-2 rounded-lg text-xs md:text-sm hover:bg-slate-200 transition-colors"
                >
                  התנתק
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handleNavigate('auth')}
                className="bg-sky-600 text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-sky-700 transition-shadow shadow-md hover:shadow-lg active:scale-95"
              >
                התחברות
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 pb-4 animate-scale-in origin-top">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-right px-4 py-3 text-base font-bold rounded-xl transition-all ${
                    currentPage === item.id ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavigate('calculator')}
                className={`text-right px-4 py-3 text-base font-black rounded-xl border-2 flex items-center justify-between ${
                  currentPage === 'calculator' 
                    ? 'bg-red-50 text-red-700 border-red-200' 
                    : 'text-red-600 border-red-50 hover:bg-red-50'
                }`}
              >
                <span>מחשבון חיסכון</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};