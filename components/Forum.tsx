
import React, { useState } from 'react';

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
  isLiked?: boolean;
}

interface Props {
  user: any;
  onAuthClick: () => void;
}

export const Forum: React.FC<Props> = ({ user, onAuthClick }) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "ד\"ר רחל ל.",
      title: "האם תחליפי סיגריות באמת פחות מזיקים?",
      content: "חשוב להבין שכל מה שכולל שאיפה של חומרים זרים לריאות נושא סיכון. עם זאת, מחקרי PHE מראים שאידוי עשוי להיות מזיק משמעותית פחות מטבק בוער.",
      likes: 24,
      comments: 5,
      date: "10.02.2024"
    },
    {
      id: 2,
      author: "יוסי כ.",
      title: "היום ה-30 בלי סיגריה - תובנות",
      content: "השבוע הראשון היה סיוט, אבל היום הריח של הסיגריות כבר דוחה אותי. אל תתייאשו!",
      likes: 56,
      comments: 12,
      date: "09.02.2024"
    }
  ]);

  const toggleLike = (id: number) => {
    if (!user) {
      onAuthClick();
      return;
    }
    setPosts(posts.map(p => 
      p.id === id ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p
    ));
  };

  const handleNewPost = () => {
    if (!user) {
      onAuthClick();
    } else {
      alert("תכונה זו בפיתוח - בקרוב תוכלו להוסיף פוסטים משלכם!");
    }
  };

  const handleReport = () => {
    alert("הדיווח התקבל וייבדק על ידי מנהלי המערכת בהקדם.");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-black text-sky-950 mb-3">פורום קהילה וידע</h1>
          <p className="text-slate-500 text-lg font-medium">מרחב בטוח לשיתוף, התייעצות ותמיכה הדדית</p>
        </div>
        <button 
          onClick={handleNewPost}
          className="bg-sky-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-sky-700 hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 transition-all"
        >
          <span>{user ? 'פוסט חדש' : 'התחברו כדי להשתתף'}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>

      <div className="space-y-8">
        {posts.map((post, idx) => (
          <div 
            key={post.id} 
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-sky-50 hover:border-sky-200 hover:shadow-xl transition-all animate-fade-in-up"
            style={{ animationDelay: `${(idx + 1) * 150}ms` }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner group-hover:rotate-3 transition-transform">
                {post.author[0]}
              </div>
              <div>
                <div className="font-black text-sky-900 text-lg">{post.author}</div>
                <div className="text-xs text-slate-400 font-bold tracking-wider">{post.date}</div>
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-sky-950 mb-4">{post.title}</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg font-medium">{post.content}</p>
            
            <div className="flex items-center gap-8 pt-6 border-t border-sky-50">
              <button 
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-2.5 text-sm font-black transition-all transform active:scale-125 ${post.isLiked ? 'text-sky-600' : 'text-slate-400 hover:text-sky-600'}`}
              >
                <svg className={`w-6 h-6 ${post.isLiked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likes}</span>
              </button>
              
              <div className="flex items-center gap-2.5 text-sm font-black text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => alert("התגובות יוטענו בקרוב...")}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.808-1.232L3 20l1.397-3.618A8.956 8.956 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comments}</span>
              </div>
              
              <button 
                onClick={handleReport}
                className="text-slate-300 hover:text-red-500 mr-auto flex items-center gap-2 text-xs font-black transition-colors"
              >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                 דווח
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 bg-yellow-50 p-10 rounded-[3rem] border border-yellow-100 flex flex-col md:flex-row items-center gap-10 animate-fade-in delay-500 shadow-inner">
        <div className="flex-grow">
          <h3 className="text-2xl font-black text-sky-900 mb-4 flex items-center gap-3">
             <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             תקנון הקהילה
          </h3>
          <ul className="text-slate-700 space-y-3 text-base font-medium list-none">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>שמירה על שיח מכבד וענייני</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>חל איסור מוחלט על פרסום מסחרי</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>אין לראות בתכנים ייעוץ רפואי מחייב</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>אנחנו כאן כדי לתמוך, לא לשפוט</li>
          </ul>
        </div>
        <div className="relative group">
          <div className="absolute -inset-1 bg-sky-200 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <img src="https://picsum.photos/seed/smoking/200/200" alt="Support" className="relative rounded-full w-28 h-28 border-4 border-white shadow-xl transform group-hover:scale-105 transition-transform" />
        </div>
      </div>
    </div>
  );
};
