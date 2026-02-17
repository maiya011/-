
import React, { useState } from 'react';
import { Home } from './components/Home.tsx';
import { Forum } from './components/Forum.tsx';
import { Articles } from './components/Articles.tsx';
import { About } from './components/About.tsx';
import { Auth } from './components/Auth.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { Navigation } from './components/Navigation.tsx';
import { Footer } from './components/Footer.tsx';
import { CookieBanner } from './components/CookieBanner.tsx';
import { CalculatorPage } from './components/CalculatorPage.tsx';
import { Tips } from './components/Tips.tsx';
import { Contact } from './components/Contact.tsx';

type Page = 'home' | 'about' | 'articles' | 'forum' | 'auth' | 'admin' | 'calculator' | 'tips' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<{ id: number; username: string; role: string } | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'about': return <About />;
      case 'articles': return <Articles />;
      case 'tips': return <Tips />;
      case 'contact': return <Contact />;
      case 'calculator': return <CalculatorPage onNavigate={setCurrentPage} />;
      case 'forum': return <Forum user={user} onAuthClick={() => setCurrentPage('auth')} />;
      case 'auth': return <Auth onLogin={(u) => { setUser(u); setCurrentPage('home'); }} />;
      case 'admin': return user?.role === 'admin' ? <AdminDashboard /> : <Home onNavigate={setCurrentPage} />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        user={user} 
        onLogout={() => setUser(null)}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <CookieBanner />
    </div>
  );
};

export default App;
