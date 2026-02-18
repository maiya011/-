import React, { useState, useEffect } from 'react';
import { api } from '../services/api.ts';

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  status: 'pending' | 'approved';
  date: string;
}

export const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showArticleForm, setShowArticleForm] = useState(false);
  
  // Article Form State
  const [newArticle, setNewArticle] = useState({
    title: '',
    summary: '',
    content: '',
    image_url: '',
    source_url: ''
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const allPosts = await api.getForumPosts(true);
      setPosts(allPosts);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (postId: number) => {
    try {
      await api.approvePost(postId);
      setPosts(posts.map(p => p.id === postId ? { ...p, status: 'approved' } : p));
    } catch (err) {
      alert('שגיאה באישור הפוסט');
    }
  };

  const handleDelete = async (postId: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק את הפוסט?')) return;
    try {
      await api.deletePost(postId);
      setPosts(posts.filter(p => p.id !== postId));
    } catch (err) {
      alert('שגיאה במחיקת הפוסט');
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createArticle(newArticle);
      alert('המאמר פורסם בהצלחה!');
      setShowArticleForm(false);
      setNewArticle({ title: '', summary: '', content: '', image_url: '', source_url: '' });
    } catch (err) {
      alert('שגיאה ביצירת המאמר');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 mb-2">ניהול מערכת</h1>
          <p className="text-slate-500 font-medium">מרכז השליטה של "נקי מעישון"</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowArticleForm(!showArticleForm)}
            className="bg-sky-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-sky-700 transition-all shadow-lg active:scale-95"
          >
            {showArticleForm ? 'סגור טופס' : 'מחקר חדש +'}
          </button>
        </div>
      </div>

      {showArticleForm && (
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-sky-100 mb-12 animate-scale-in">
          <h2 className="text-2xl font-black text-sky-900 mb-8">פרסום מחקר / מאמר חדש</h2>
          <form onSubmit={handleCreateArticle} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input 
                type="text" placeholder="כותרת המאמר" 
                value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value})}
                className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none font-bold"
                required
              />
              <input 
                type="text" placeholder="לינק לתמונה (URL)" 
                value={newArticle.image_url} onChange={e => setNewArticle({...newArticle, image_url: e.target.value})}
                className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none font-bold"
              />
            </div>
            <input 
              type="text" placeholder="לינק למקור המחקר (Source URL)" 
              value={newArticle.source_url} onChange={e => setNewArticle({...newArticle, source_url: e.target.value})}
              className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none font-bold"
            />
            <textarea 
              placeholder="תקציר קצר (יופיע בכרטיסיה)" rows={2}
              value={newArticle.summary} onChange={e => setNewArticle({...newArticle, summary: e.target.value})}
              className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none font-medium"
              required
            ></textarea>
            <textarea 
              placeholder="תוכן המאמר המלא..." rows={8}
              value={newArticle.content} onChange={e => setNewArticle({...newArticle, content: e.target.value})}
              className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none font-medium"
              required
            ></textarea>
            <button type="submit" className="bg-emerald-600 text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-emerald-700 shadow-xl transition-all">
              פרסם מחקר עכשיו
            </button>
          </form>
        </div>
      )}

      {/* Forum Moderation */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/50">
          <h2 className="font-black text-slate-800 text-xl">ניהול פוסטים בפורום</h2>
        </div>
        
        {isLoading ? (
          <div className="p-20 text-center animate-pulse font-bold text-slate-400">טוען נתונים...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">הודעה</th>
                  <th className="px-8 py-4">כותב</th>
                  <th className="px-8 py-4">סטטוס</th>
                  <th className="px-8 py-4 text-left">פעולות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {posts.length === 0 ? (
                  <tr><td colSpan={4} className="p-10 text-center text-slate-400 font-bold">אין פוסטים לניהול</td></tr>
                ) : (
                  posts.map(post => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-black text-slate-800 mb-1">{post.title}</div>
                        <div className="text-sm text-slate-500 truncate max-w-xs">{post.content}</div>
                      </td>
                      <td className="px-8 py-6 font-bold text-slate-600">{post.author}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          post.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {post.status === 'pending' ? 'ממתין' : 'מאושר'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-left space-x-reverse space-x-2">
                        {post.status === 'pending' && (
                          <button 
                            onClick={() => handleApprove(post.id)}
                            className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-emerald-600 hover:text-white transition-all"
                          >
                            אשר פוסט
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-red-600 hover:text-white transition-all"
                        >
                          מחק
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};