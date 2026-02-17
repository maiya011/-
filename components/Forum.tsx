
import React, { useState, useEffect } from 'react';
import { api } from '../services/api.ts';

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  likes?: number;
  comments?: number;
  date: string;
  isLiked?: boolean;
}

interface Props {
  user: any;
  onAuthClick: () => void;
}

export const Forum: React.FC<Props> = ({ user, onAuthClick }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const data = await api.getForumPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await api.createPost(user.id, newTitle, newContent);
      setNewTitle('');
      setNewContent('');
      setShowNewPostForm(false);
      await loadPosts(); // רענון רשימה
    } catch (err) {
      alert('שגיאה ביצירת הפוסט');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLike = (id: number) => {
    if (!user) {
      onAuthClick();
      return;
    }
    setPosts(posts.map(p => 
      p.id === id ? { ...p, likes: (p.likes || 0) + (p.isLiked ? -1 : 1), isLiked: !p.isLiked } : p
    ));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 reveal">
        <div>
          <h1 className="text-4xl font-black text-sky-950 mb-3">פורום קהילה וידע</h1>
          <p className="text-slate-500 text-lg font-medium">מרחב בטוח לשיתוף, התייעצות ותמיכה הדדית</p>
        </div>
        <button 
          onClick={() => user ? setShowNewPostForm(!showNewPostForm) : onAuthClick()}
          className="bg-sky-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-sky-700 hover:shadow-xl transition-all"
        >
          {showNewPostForm ? 'ביטול' : (user ? 'פוסט חדש' : 'התחברו כדי להשתתף')}
        </button>
      </div>

      {showNewPostForm && (
        <div className="mb-12 bg-white p-8 rounded-[2rem] shadow-xl border border-sky-100 animate-scale-in">
          <h2 className="text-2xl font-black text-sky-900 mb-6">מה תרצו לשתף?</h2>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <input 
              type="text" 
              placeholder="כותרת הפוסט" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-sky-500 outline-none font-bold"
              required
            />
            <textarea 
              placeholder="כתבו כאן..." 
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={5}
              className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-sky-500 outline-none font-medium"
              required
            ></textarea>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-emerald-600 text-white px-10 py-3 rounded-xl font-black hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting ? 'שולח...' : 'פרסום פוסט'}
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 font-bold">
              אין עדיין פוסטים בפורום. היו הראשונים לשתף!
            </div>
          ) : (
            posts.map((post, idx) => (
              <div 
                key={post.id} 
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-sky-50 hover:border-sky-200 transition-all reveal"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-2xl flex items-center justify-center font-black">
                    {post.author?.[0] || 'U'}
                  </div>
                  <div>
                    <div className="font-black text-sky-900">{post.author}</div>
                    <div className="text-xs text-slate-400 font-bold">{new Date(post.date).toLocaleDateString('he-IL')}</div>
                  </div>
                </div>
                <h2 className="text-2xl font-black text-sky-950 mb-4">{post.title}</h2>
                <p className="text-slate-600 mb-8 leading-relaxed text-lg">{post.content}</p>
                <div className="flex items-center gap-8 pt-6 border-t border-sky-50">
                  <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-2 font-black ${post.isLiked ? 'text-sky-600' : 'text-slate-400'}`}>
                    <svg className="w-6 h-6" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    {post.likes || 0}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
