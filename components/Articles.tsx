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
          className="mb-8 text-sky-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform"
        >
          <svg className="w-5 h-5 rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          חזרה לרשימת המחקרים
        </button>
        
        <article className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">{selectedArticle.cat || 'כללי'}</span>
            <span className="text-sm text-slate-400 font-medium">{new Date(selectedArticle.date).toLocaleDateString('he-IL')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">{selectedArticle.title}</h1>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-lg">
            {selectedArticle.fullContent.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {selectedArticle.source && (
            <div className="mt-12 pt-8 border-t border-slate-100 text-sm text-slate-500">
              <span className="font-bold">מקור:</span> {selectedArticle.source}
            </div>
          )}
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start gap-8 reveal">
        <div>
          <h1 className="text-4xl font-black text-slate-800 mb-4">ספריית מחקרים וסיכומי ידע</h1>
          <p className="text-lg text-slate-600 max-w-xl font-medium">ריכוז המחקרים הבינלאומיים העדכניים ביותר בתחום העישון.</p>
        </div>
        
        <form onSubmit={handleSearch} className="w-full md:w-96 relative">
          <input 
            type="text" 
            placeholder="חפשו במחקרים..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-sky-500 outline-none shadow-sm font-bold"
          />
          <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </form>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-12 reveal reveal-delay-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-6 py-2 rounded-full text-sm font-black transition-all transform hover:scale-105 ${
              selectedCat === cat ? 'bg-sky-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white h-80 rounded-[2rem] animate-pulse border border-slate-100"></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-400 font-bold text-xl">
              לא נמצאו מאמרים תואמים לחיפוש שלך.
            </div>
          ) : (
            filtered.map((article, idx) => (
              <div 
                key={article.id} 
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col group cursor-pointer reveal"
                style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
              >
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-widest">{article.cat || 'מחקר'}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{new Date(article.date).toLocaleDateString('he-IL')}</span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-sky-700 transition-colors">{article.title}</h2>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow font-medium">{article.summary}</p>
                  <span className="text-sky-600 font-black text-sm group-hover:translate-x-[-5px] transition-transform inline-flex items-center gap-2">
                    קרא עוד
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
