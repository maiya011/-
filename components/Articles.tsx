import React, { useState, useEffect } from 'react';
import { api } from '../services/api.ts';

const CATEGORIES = ['כל הקטגוריות', 'סקירות ממשלתיות', 'מחקרים כלכליים', 'בריאות הלב', 'יעילות גמילה', 'מחלות ריאה'];

interface Article {
  id: number;
  title: string;
  cat: string;
  date: string;
  summary: string;
  fullContent: string;
  source?: string;
  imageUrl?: string;
}

export const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCat, setSelectedCat] = useState('כל הקטגוריות');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = async (query = '') => {
    setIsLoading(true);
    try {
      const data = await api.getArticles(query);
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles(searchQuery);
  };

  const filtered = selectedCat === 'כל הקטגוריות' 
    ? articles 
    : articles.filter(a => a.cat === selectedCat);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="mb-8 text-sky-600 font-black flex items-center gap-2 hover:translate-x-1 transition-transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          חזרה לספריית המחקרים
        </button>
        
        <article className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-scale-in">
          {selectedArticle.imageUrl && (
            <div className="w-full h-80 overflow-hidden">
               <img 
                 src={selectedArticle.imageUrl} 
                 alt={selectedArticle.title}
                 className="w-full h-full object-cover"
               />
            </div>
          )}
          <div className="p-8 md:p-14">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-black text-sky-600 bg-sky-50 px-4 py-1.5 rounded-full uppercase tracking-widest">{selectedArticle.cat || 'מחקר רפואי'}</span>
              <span className="text-xs text-slate-400 font-bold">{new Date(selectedArticle.date).toLocaleDateString('he-IL')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 leading-tight">{selectedArticle.title}</h1>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8 text-xl">
              {selectedArticle.fullContent.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            
            {(selectedArticle.source) && (
              <div className="mt-16 pt-10 border-t border-slate-100">
                <div className="bg-slate-50 p-6 rounded-3xl flex items-center justify-between gap-6">
                  <div>
                    <span className="block font-black text-slate-800 text-lg mb-1">מקור המחקר וביבליוגרפיה</span>
                    <span className="text-slate-500 text-sm font-medium">לקריאת המחקר המלא באתר המקור:</span>
                  </div>
                  <a 
                    href={selectedArticle.source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-sky-600 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-sky-700 transition-all flex items-center gap-2"
                  >
                    למקור חיצוני
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-start gap-10 reveal">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">ספריית הידע</h1>
          <p className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed">ריכוז מחקרים בינלאומיים, סקירות ממשלתיות ונתונים סטטיסטיים מתורגמים לעברית.</p>
        </div>
        
        <form onSubmit={handleSearch} className="w-full md:w-[400px] relative">
          <input 
            type="text" 
            placeholder="חיפוש מחקרים..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-8 py-5 rounded-[2rem] border-2 border-slate-100 focus:border-sky-500 outline-none shadow-sm font-bold text-lg transition-all"
          />
          <button type="submit" className="absolute left-6 top-1/2 -translate-y-1/2 text-sky-600 hover:scale-110 transition-transform">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </form>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-16 reveal reveal-delay-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-8 py-3 rounded-full text-sm font-black transition-all transform hover:scale-105 active:scale-95 ${
              selectedCat === cat ? 'bg-sky-600 text-white shadow-xl shadow-sky-100' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white h-[450px] rounded-[3rem] animate-pulse border border-slate-50"></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.length === 0 ? (
            <div className="col-span-full py-32 text-center text-slate-400 font-bold text-2xl italic">
              לא נמצאו מחקרים תואמים לחיפוש שלך.
            </div>
          ) : (
            filtered.map((article, idx) => (
              <div 
                key={article.id} 
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-3 transition-all flex flex-col group cursor-pointer reveal"
                style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
              >
                {article.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                )}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-widest">{article.cat || 'כללי'}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{new Date(article.date).toLocaleDateString('he-IL')}</span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-sky-700 transition-colors">{article.title}</h2>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed flex-grow font-medium line-clamp-3">{article.summary}</p>
                  <span className="text-sky-600 font-black text-sm group-hover:translate-x-[-5px] transition-transform inline-flex items-center gap-2">
                    קראו את המחקר המלא
                    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};