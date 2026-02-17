
import React, { useState, useEffect } from 'react';
import { Home } from './components/Home.tsx';
import { Forum } from './components/Forum.tsx';
import { Articles } from './components/Articles.tsx';
import { About } from './components/About.tsx';
import { Auth } from './components/Auth.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { UserDashboard } from './components/UserDashboard.tsx';
import { Navigation } from './components/Navigation.tsx';
import { Footer } from './components/Footer.tsx';
import { CookieBanner } from './components/CookieBanner.tsx';
import { CalculatorPage } from './components/CalculatorPage.tsx';
import { Tips } from './components/Tips.tsx';
import { Contact } from './components/Contact.tsx';

type Page = 'home' | 'about' | 'articles' | 'forum' | 'auth' | 'admin' | 'user-dashboard' | 'calculator' | 'tips' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<{ id: number; username: string; role: string } | null>(null);

  // Initialize Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, we can stop observing this specific element
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Re-run observer setup when the page content changes
    const timer = setTimeout(() => {
      const updatedElements = document.querySelectorAll('.reveal:not(.visible)');
      updatedElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'about': return <About />;
      case 'articles': return <Articles />;
      case 'tips': return <Tips />;
      case 'contact': return <Contact />;
      case 'calculator': return <CalculatorPage onNavigate={setCurrentPage} />;
      case 'forum': return <Forum user={user} onAuthClick={() => setCurrentPage('auth')} />;
      case 'user-dashboard': return user ? <UserDashboard user={user} onNavigate={setCurrentPage} /> : <Home onNavigate={setCurrentPage} />;
      case 'auth': return <Auth onLogin={(u) => { 
        setUser(u); 
        setCurrentPage(u.role === 'admin' ? 'admin' : 'user-dashboard'); 
      }} />;
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
        onLogout={() => { setUser(null); setCurrentPage('home'); }}
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
