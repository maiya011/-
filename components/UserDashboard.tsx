import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api.ts';

interface Post {
  id: number;
  title: string;
  content: string;
  status: 'pending' | 'approved';
  date: string;
}

interface Props {
  user: any;
  onNavigate: (page: any) => void;
}

export const UserDashboard: React.FC<Props> = ({ user, onNavigate }) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Tracker stats from localStorage
  const quitDate = localStorage.getItem('quit-date');
  const cigsPerDay = Number(localStorage.getItem('tracker-cigs')) || 20;
  const pricePerPack = Number(localStorage.getItem('tracker-price')) || 37;

  const stats = useMemo(() => {
    if (!quitDate) return null;
    const start = new Date(quitDate);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    if (diffMs < 0) return null;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const moneySaved = Math.round((days * cigsPerDay / 20) * pricePerPack);
    const cigsAvoided = Math.floor(days * cigsPerDay);

    return { days, moneySaved, cigsAvoided };
  }, [quitDate, cigsPerDay, pricePerPack]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const posts = await api.getUserPosts(user.id);
        setUserPosts(posts);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [user.id]);

  const handleShare = () => {
    if (!stats) return;
    const shareText = `אני כבר ${stats.days} ימים נקי מעישון! 💪 חסכתי ₪${stats.moneySaved.toLocaleString()} ונמנעתי מ-${stats.cigsAvoided.toLocaleString()} סיגריות. הצטרפו אליי למסע ב-'נקי מעישון'!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'ההתקדמות שלי בנקי מעישון',
        text: shareText,
        url: window.location.origin
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('ההישג הועתק ללוח! עכשיו אפשר להדביק ולשתף עם חברים.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      {/* Hero Stats */}
      <div className="mb-12 bg-gradient-to-r from-sky-600 to-indigo-700 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden reveal">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">שלום, {user.username}</h1>
            <p className="text-sky-100 text-xl font-medium opacity-90">הנה תמונת המצב של המסע שלך לחופש:</p>
            {stats && (
              <button 
                onClick={handleShare}
                className="mt-8 bg-white text-sky-700 px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-sky-50 transition-all flex items-center gap-3 mx-auto md:mr-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                שתף את ההצלחה שלי
              </button>
            )}
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-xl px-10 py-8 rounded-[2.5rem] border border-white/20 text-center shadow-inner min-w-[180px]">
              <div className="text-6xl font-black mb-1">{stats?.days || 0}</div>
              <div className="text-xs font-black uppercase tracking-[0.2em] opacity-60">ימים נקיים</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          {/* Detailed Financial/Health Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 reveal">
               <div className="bg-emerald-100 p-5 rounded-3xl text-emerald-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div>
                 <div className="text-3xl font-black text-slate-800">₪{stats?.moneySaved.toLocaleString() || 0}</div>
                 <div className="text-xs font-black text-slate-400 uppercase tracking-widest">חיסכון כספי</div>
               </div>
            </div>
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 reveal reveal-delay-100">
               <div className="bg-sky-100 p-5 rounded-3xl text-sky-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
               </div>
               <div>
                 <div className="text-3xl font-black text-slate-800">{stats?.cigsAvoided.toLocaleString() || 0}</div>
                 <div className="text-xs font-black text-slate-400 uppercase tracking-widest">סיגריות שנמנעו</div>
               </div>
            </div>
          </div>

          {/* User Post History */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden reveal">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800">היסטוריית פוסטים שלי</h3>
              <button 
                onClick={() => onNavigate('forum')}
                className="text-sky-600 font-bold text-sm hover:underline"
              >
                כתבו פוסט חדש +
              </button>
            </div>
            
            {isLoading ? (
              <div className="p-12 text-center text-slate-400 animate-pulse font-bold">טוען את הפעילות שלך...</div>
            ) : userPosts.length === 0 ? (
              <div className="p-16 text-center text-slate-400 font-medium italic">
                עדיין לא כתבת פוסטים בפורום. זה הזמן לשתף את הקהילה!
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {userPosts.map(post => (
                  <div key={post.id} className="p-8 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-slate-800 text-lg">{post.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        post.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {post.status === 'pending' ? 'בבדיקה' : 'מאושר'}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{post.content}</p>
                    <div className="text-[10px] text-slate-400 font-bold">פורסם בתאריך: {new Date(post.date).toLocaleDateString('he-IL')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-center reveal">
            <div className="w-24 h-24 bg-sky-100 text-sky-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-4xl font-black shadow-inner border-4 border-white">
              {user.username[0]}
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">{user.username}</h3>
            <p className="text-slate-400 text-sm font-bold mb-8 italic">חבר/ה בקהילה ללא עשן</p>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate('calculator')}
                className="w-full py-4 rounded-2xl bg-sky-600 text-white font-black text-sm hover:bg-sky-700 transition-all shadow-lg shadow-sky-100"
              >
                עדכון הגדרות מעקב
              </button>
              <button 
                onClick={() => onNavigate('tips')}
                className="w-full py-4 rounded-2xl border-2 border-slate-100 text-slate-600 font-black text-sm hover:bg-slate-50 transition-all"
              >
                טיפים לגמילה
              </button>
            </div>
          </div>
          
          <div className="bg-emerald-900 rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mt-16 blur-2xl"></div>
            <h4 className="text-xl font-black mb-4 relative z-10 text-emerald-300">הטיפ היומי שלך</h4>
            <p className="text-sm leading-relaxed opacity-90 relative z-10">
              "הדחף לעשן נמשך בערך 5 דקות. אם תצליח להעסיק את עצמך רק ב-5 הדקות האלו - ניצחת את המאבק היומי."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};