
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

interface Props {
  onSettingsUpdate?: (settings: any) => void;
}

export const AdminDashboard: React.FC<Props> = ({ onSettingsUpdate }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'appearance'>('content');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState({ logo_url: '', favicon_url: '' });
  const [isSaving, setIsSaving] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const allPosts = await api.getForumPosts(true);
      const settings = await api.getSettings();
      setPosts(allPosts);
      setSiteSettings({
        logo_url: settings.logo_url || '',
        favicon_url: settings.favicon_url || ''
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.updateSettings(siteSettings);
      if (onSettingsUpdate) onSettingsUpdate(siteSettings);
      alert('הגדרות המראה עודכנו בהצלחה!');
    } catch (err) {
      alert('שגיאה בעדכון ההגדרות');
    } finally {
      setIsSaving(false);
    }
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">ניהול מערכת</h1>
          <p className="text-slate-500 font-medium italic">ברוך הבא למרכז השליטה של "נקי מעישון"</p>
        </div>
        <div className="bg-sky-50 px-4 py-2 rounded-2xl border border-sky-100">
          <span className="text-sky-700 font-black text-xs uppercase tracking-widest">סטטוס מנהל: מחובר</span>
        </div>
      </div>

      <div className="flex gap-4 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('content')}
          className={`px-8 py-3 rounded-xl font-black transition-all ${activeTab === 'content' ? 'bg-white text-sky-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
        >
          ניהול תוכן
        </button>
        <button 
          onClick={() => setActiveTab('appearance')}
          className={`px-8 py-3 rounded-xl font-black transition-all ${activeTab === 'appearance' ? 'bg-white text-sky-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
        >
          מראה האתר
        </button>
      </div>

      {activeTab === 'appearance' ? (
        <div className="grid lg:grid-cols-3 gap-8 animate-scale-in">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-sky-50">
              <h2 className="text-2xl font-black text-sky-900 mb-8 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                מיתוג ויזואלי
              </h2>
              
              <form onSubmit={handleUpdateSettings} className="space-y-10">
                <div className="space-y-4">
                  <label className="block text-slate-700 font-black text-sm uppercase tracking-widest">כתובת URL ללוגו (SVG/PNG)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={siteSettings.logo_url} 
                      onChange={e => setSiteSettings({...siteSettings, logo_url: e.target.value})}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-sky-500 outline-none font-bold transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">הלוגו יופיע בראש כל דפי האתר. מומלץ להשתמש בתמונה עם רקע שקוף.</p>
                </div>

                <div className="space-y-4">
                  <label className="block text-slate-700 font-black text-sm uppercase tracking-widest">כתובת URL ל-Favicon (אייקון לשונית)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={siteSettings.favicon_url} 
                      onChange={e => setSiteSettings({...siteSettings, favicon_url: e.target.value})}
                      placeholder="https://example.com/favicon.ico"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:bg-white focus:border-sky-500 outline-none font-bold transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">האייקון הקטן שמופיע בלשונית הדפדפן (Favicon). גודל מומלץ: 32x32 פיקסלים.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full bg-sky-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-sky-700 shadow-xl shadow-sky-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isSaving ? 'שומר שינויים...' : 'עדכון מראה האתר'}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-sky-50">
              <h3 className="text-lg font-black text-sky-900 mb-6 text-center uppercase tracking-widest">תצוגה מקדימה</h3>
              
              <div className="space-y-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-center">
                  <span className="block text-[10px] font-black text-slate-400 mb-4 uppercase">לוגו בתפריט הניווט</span>
                  {siteSettings.logo_url ? (
                    <img src={siteSettings.logo_url} alt="Preview" className="h-10 mx-auto object-contain" />
                  ) : (
                    <div className="h-10 flex items-center justify-center text-slate-300 font-bold italic">אין לוגו מוגדר</div>
                  )}
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-center">
                  <span className="block text-[10px] font-black text-slate-400 mb-4 uppercase">אייקון דפדפן (Favicon)</span>
                  {siteSettings.favicon_url ? (
                    <div className="bg-white p-4 inline-block rounded-2xl shadow-sm border border-slate-100">
                      <img src={siteSettings.favicon_url} alt="Favicon Preview" className="w-8 h-8 object-contain" />
                    </div>
                  ) : (
                    <div className="h-8 flex items-center justify-center text-slate-300 font-bold italic">אין אייקון</div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-sky-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
              <h4 className="font-black text-lg mb-4 relative z-10">טיפ למנהל</h4>
              <p className="text-sm opacity-80 leading-relaxed font-medium relative z-10">שימוש בלוגו בפורמט SVG מבטיח חדות מקסימלית בכל המסכים (כולל רטינה) ומשקל קובץ נמוך מאוד.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden animate-scale-in">
          <div className="p-8 border-b border-slate-50 bg-slate-50/50 font-black text-slate-800 text-xl">
            פוסטים הממתינים לאישור
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">תוכן הפוסט</th>
                  <th className="px-8 py-4">כותב</th>
                  <th className="px-8 py-4">סטטוס</th>
                  <th className="px-8 py-4 text-left">פעולות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr><td colSpan={4} className="p-10 text-center animate-pulse font-bold text-slate-400">טוען פוסטים...</td></tr>
                ) : posts.length === 0 ? (
                  <tr><td colSpan={4} className="p-16 text-center text-slate-300 font-bold italic text-lg">אין פוסטים חדשים לטיפול</td></tr>
                ) : (
                  posts.map(post => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-black text-slate-800 mb-1">{post.title}</div>
                        <div className="text-sm text-slate-500 truncate max-w-xs font-medium">{post.content}</div>
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
                            className="bg-emerald-50 text-emerald-600 px-5 py-2 rounded-xl text-xs font-black hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                          >
                            אשר פוסט
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="bg-red-50 text-red-600 px-5 py-2 rounded-xl text-xs font-black hover:bg-red-600 hover:text-white transition-all shadow-sm"
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
        </div>
      )}
    </div>
  );
};
