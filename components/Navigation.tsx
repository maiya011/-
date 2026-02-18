
import React, { useState } from 'react';

interface Props {
  currentPage: string;
  onNavigate: (page: any) => void;
  user: any;
  onLogout: () => void;
  logoUrl?: string;
}

export const Navigation: React.FC<Props> = ({ currentPage, onNavigate, user, onLogout, logoUrl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'דף הבית' },
    { id: 'about', label: 'הסיפור שלנו' },
    ...(user ? [{ id: 'tracker', label: 'המעקב שלי' }] : []),
    { id: 'tips', label: 'טיפים לגמילה' },
    { id: 'articles', label: 'מאמרים' },
    { id: 'forum', label: 'פורום קהילה' },
    { id: 'contact', label: 'צור קשר' },
    { id: 'calculator', label: 'מחשבון החסכונות ואריכות ימים', special: 'red' },
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
              <div className="flex items-center gap-3">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
                ) : (
                  <div className="bg-red-600 p-2 rounded-lg">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
                <span className="text-lg md:text-xl font-bold text-sky-900 whitespace-nowrap">FREE FROM SMOKE</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-sm font-black transition-all hover:opacity-80 relative py-1 ${
                    item.special === 'red' 
                      ? 'text-white bg-red-600 px-4 py-1.5 rounded-full hover:bg-red-700 shadow-md' 
                      : (currentPage === item.id ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-600 hover:text-sky-600')
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <button 
                  onClick={() => handleNavigate(user.role === 'admin' ? 'admin' : 'user-dashboard')}
                  className="text-sky-600 font-bold px-3 py-2 rounded-lg hover:bg-sky-50 text-sm"
                >
                  {user.role === 'admin' ? 'ניהול' : 'אזור אישי'}
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
                className="bg-sky-600 text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-sky-700 transition-shadow shadow-md active:scale-95"
              >
                התחברות
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-2 animate-fade-in shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`block w-full text-right px-4 py-3 rounded-xl font-black ${
                item.special === 'red' 
                ? 'bg-red-600 text-white' 
                : (currentPage === item.id ? 'bg-sky-50 text-sky-600' : 'text-slate-600')
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
