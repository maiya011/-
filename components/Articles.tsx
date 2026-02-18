
import React, { useState, useEffect } from 'react';
import { api } from '../services/api.ts';

const CATEGORIES = ['כל הקטגוריות', 'סקירות ממשלתיות', 'מחקרים כלכליים', 'בריאות הלב', 'יעילות גמילה', 'מחלות ריאה', 'מדע וטכנולוגיה'];

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

const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: "תהליך הגמילה והשפעתו המיידית על הגוף",
    cat: "בריאות הלב",
    date: "2024-01-15",
    summary: "סקירה של ynet על השינויים הפיזיולוגיים המתרחשים בגוף מרגע הפסקת העישון ועד שנים לאחר מכן.",
    fullContent: "הפסקת עישון היא הצעד המשמעותי ביותר שניתן לעשות למען הבריאות. תוך דקות ספורות לחץ הדם מתייצב, ותוך שבועות הריאות מתחילות להשתקם...",
    source: "https://www.ynet.co.il/health/article/r1ac3vnxbg",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "שינויים באורח החיים ומניעת מחלות לב",
    cat: "בריאות הלב",
    date: "2021-10-11",
    summary: "מחקר מה-ACC הבוחן את הקשר בין הפסקת עישון לבין ירידה דרמטית בסיכון למחלות קרדיווסקולריות.",
    fullContent: "המחקר מראה כי שילוב של הפסקת עישון עם פעילות גופנית מפחית את הסיכון לאירועי לב במידה ניכרת גם בקרב מעשנים כבדים לשעבר...",
    source: "https://www.acc.org/Latest-in-Cardiology/Journal-Scans/2021/10/11/19/20/Combined-Associations-of-Changes",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "חיסכון של 500 מיליון ליש\"ט למערכת הבריאות הבריטית",
    cat: "מחקרים כלכליים",
    date: "2023-08-07",
    summary: "מחקר מאוניברסיטת ברונל חושף את הפוטנציאל הכלכלי העצום של מעבר מעשנים לתחליפים מופחתי נזק.",
    fullContent: "אם מחצית מהמעשנים באנגליה יעברו לאידוי, ה-NHS יחסוך מעל חצי מיליארד ליש\"ט בשנה רק מהפחתת אשפוזים הקשורים לעישון...",
    source: "https://www.brunel.ac.uk/news-and-events/news/articles/NHS-would-save-more-than-500m-a-year-if-half-of-England's-adult-smokers-vaped-instead",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "סקירת קוקריין: יעילות מוצרי טבק ללא בעירה",
    cat: "יעילות גמילה",
    date: "2022-01-20",
    summary: "הסקירה המדעית המקיפה ביותר בעולם בוחנת את רמת הבטיחות והיעילות של תחליפי טבק מחומם.",
    fullContent: "הראיות מצביעות על כך שמוצרי טבק מחומם חושפים את המשתמשים לרמות נמוכות משמעותית של רעלים בהשוואה לסיגריות בוערות...",
    source: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013790.pub2/full",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9d39d6d2d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "הפחתת נזק משמעותית במוצרי טבק מחומם",
    cat: "מדע וטכנולוגיה",
    date: "2021-12-05",
    summary: "ניתוח סיכונים ויתרונות של טכנולוגיות חימום טבק לעומת בעירה מסורתית.",
    fullContent: "המאמר סוקר את הממצאים האחרונים בנוגע להפחתת חשיפה לחומרים מסרטנים בעת שימוש בטכנולוגיות חימום ללא עשן...",
    source: "https://theconversation.com/heated-tobacco-a-new-review-looks-at-the-risks-and-benefits-173110",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "שינוי שיטת מיסוי הטבק והשפעתו על בריאות הציבור",
    cat: "מחקרים כלכליים",
    date: "2023-09-12",
    summary: "דיווח ממעריב על המלצות למיסוי דיפרנציאלי המעודד מעבר למוצרים פחות מזיקים.",
    fullContent: "מומחים קוראים לממשלה לאמץ את המודל הבריטי והשוודי, המבחין בין סיגריות בוערות למוצרים ללא עשן מבחינת מיסוי...",
    source: "https://www.maariv.co.il/news/health/article-1035519",
    imageUrl: "https://images.unsplash.com/photo-1580519327900-512c9852262a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    title: "המדריך הרשמי של ה-NHS לשימוש באידוי ככלי גמילה",
    cat: "יעילות גמילה",
    date: "2023-11-01",
    summary: "הנחיות מערכת הבריאות הבריטית למעשנים המעוניינים להשתמש בתחליפים כדי להפסיק לעשן.",
    fullContent: "ה-NHS קובע כי אידוי הוא אחד הכלים היעילים ביותר לגמילה מעישון סיגריות, וכי הסיכון הבריאותי שלו נמוך בהרבה...",
    source: "https://www.nhs.uk/live-well/quit-smoking/using-e-cigarettes-to-stop-smoking/",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    title: "8 דברים שחשוב לדעת על סיגריות אלקטרוניות",
    cat: "מדע וטכנולוגיה",
    date: "2020-03-05",
    summary: "סקירה של רשות בריאות הציבור באנגליה (UKHSA) המפריכה מיתוסים נפוצים.",
    fullContent: "רשות הבריאות מבהירה כי אידוי אינו נטול סיכונים, אך הוא בטוח ב-95% יותר מעישון טבק מסורתי...",
    source: "https://ukhsa.blog.gov.uk/2020/03/05/8-things-to-know-about-e-cigarettes/",
    imageUrl: "https://images.unsplash.com/photo-1512428559083-a401a3039550?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    title: "השפעת גישה למוצרי אידוי על בריאות הציבור באוסטרליה",
    cat: "סקירות ממשלתיות",
    date: "2023-07-28",
    summary: "ניתוח של אוניברסיטת מלבורן המצביע על כך שהקלת הגישה לתחליפים עשויה להציל חיים.",
    fullContent: "המחקר טוען כי המדיניות הנוכחית באוסטרליה עשויה להשתנות כדי לאפשר למעשנים גישה בטוחה יותר לתחליפים...",
    source: "https://pursuit.unimelb.edu.au/articles/access-to-e-cigarettes-will-improve-australia-s-health",
    imageUrl: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    title: "בריאות הציבור והפחתת נזקי העישון במבט עולמי",
    cat: "מדע וטכנולוגיה",
    date: "2019-11-20",
    summary: "מחקר ב-The Lancet הבוחן את ההשפעה של חלופות ניקוטין על אוכלוסיות מעשנים.",
    fullContent: "המאמר מדגיש את החשיבות של הצעת חלופות לאנשים שאינם מצליחים להיגמל לחלוטין מניקוטין באמצעים מסורתיים...",
    source: "https://www.thelancet.com/journals/lanpub/article/PIIS2468-2667(19)30241-5/fulltext",
    imageUrl: "https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 11,
    title: "מחקר קליני: השוואת סמני רעילות בין סיגריות לתחליפים",
    cat: "מדע וטכנולוגיה",
    date: "2022-12-01",
    summary: "ממצאים מ-PubMed המראים ירידה דרמטית בחשיפה לרעלים בעת מעבר למוצרים ללא בעירה.",
    fullContent: "המחקר מנתח את רמות החומרים המסרטנים בשתן ובדם של מעשנים שעברו לשימוש מלא בתחליפים...",
    source: "https://pubmed.ncbi.nlm.nih.gov/36456941/",
    imageUrl: "https://images.unsplash.com/photo-1579154235602-4bc197443139?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 12,
    title: "השפעות ארוכות טווח של אידוי על הריאות",
    cat: "מחלות ריאה",
    date: "2023-01-10",
    summary: "מחקר נוסף מ-PubMed הבוחן את השינויים בתפקודי הריאה לאורך זמן בקרב מעשנים לשעבר.",
    fullContent: "הממצאים מראים שיפור משמעותי בתסמינים נשימתיים בקרב חולי COPD שעברו מעישון סיגריות לאידוי...",
    source: "https://pubmed.ncbi.nlm.nih.gov/36638185/",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800"
  }
];

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
      if (data && data.length > 0) {
        setArticles(data);
      } else {
        setArticles(MOCK_ARTICLES);
      }
    } catch (err) {
      console.error(err);
      setArticles(MOCK_ARTICLES);
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
      <div className="mb-16 flex flex-col md:flex-row justify-between items-start gap-10 reveal visible">
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
      
      <div className="flex flex-wrap gap-3 mb-16 reveal visible">
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
                className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-3 transition-all flex flex-col group cursor-pointer reveal visible"
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
