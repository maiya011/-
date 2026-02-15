
import React, { useState } from 'react';

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
  const [selectedCat, setSelectedCat] = useState('כל הקטגוריות');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const articles: Article[] = [
    {
      id: 7,
      title: "מומחים: שינוי שיטת המיסוי על סיגריות יכניס למדינה מיליארד ש\"ח",
      cat: 'מחקרים כלכליים',
      date: '12.02.2024',
      summary: 'שינוי למודל מס קצוב ואחיד עשוי להגדיל משמעותית את הכנסות המדינה ולצמצם את הסחר הבלתי חוקי.',
      fullContent: 'מומחי מס מצביעים על פוטנציאל כלכלי משמעותי לשינוי שיטת המיסוי על מוצרי טבק בישראל. לפי ההערכות, מעבר למיסוי אחיד וקבוע לכל מוצר טבק – במקום שילוב של מס קבוע ומס יחסי למחיר – עשוי להגדיל את הכנסות המדינה בעד כמיליארד שקלים.\n\nכיום, שיטת המיסוי משלבת שני רכיבים: מס קצוב (סכום קבוע) ומס יחסי המשתנה לפי מחיר המוצר. המשמעות היא שסיגריות זולות ממוסות בפועל בסכום נמוך יותר, דבר שמפחית את פוטנציאל גביית המס. לפי המומחים, מעבר למודל של מס קבוע בלבד יאפשר גבייה גבוהה ויציבה יותר.\n\nבנוסף, מדיניות זו עשויה גם לצמצם את היקף הסחר הבלתי חוקי, שכן לא תהיה עדיפות כלכלית לרכישת מוצרים זולים או מוברחים. כיום, שוק הטבק בישראל מוערך בכ-11 מיליארד שקלים בשנה, כאשר הכנסות המדינה ממסים עומדות על כ-7.6–7.7 מיליארד שקלים.\n\nהתאמת מדיניות המיסוי עשויה לא רק להגדיל את הכנסות המדינה, אלא גם לשפר את היכולת לנהל מדיניות כלכלית יציבה ויעילה יותר בתחום מוצרי הטבק.',
      source: 'ישראל היום'
    },
    { 
      id: 1, 
      title: "סקירת קאן (The Khan Review): הפיכת העישון למיושן", 
      cat: 'סקירות ממשלתיות', 
      date: '05.02.2024', 
      summary: 'ד"ר ג\'אבד קאן מציג תוכנית להפיכת העישון למיושן באנגליה עד 2040.',
      fullContent: 'הסקירה מדגישה כי ללא פעולה ממשלתית דחופה, אנגליה תחמיץ את יעד ה"מדינה ללא עישון" של שנת 2030 ב-7 שנים לפחות. המלצות המפתח כוללות העלאת גיל המכירה של טבק בשנה בכל שנה (כדי למנוע מצעירים להתחיל לעשן לעולם), השקעה של 125 מיליון ליש"ט נוספים בשנה בשירותי הפסקה, וקידום אידוי ככלי יעיל למעבר מעישון. הסקירה מציינת כי העישון הוא הגורם המרכזי לפערים בריאותיים, כאשר בקהילות מוחלשות שיעורי העישון גבוהים משמעותית.',
      source: 'Government of UK - Department of Health and Social Care'
    },
    { 
      id: 2, 
      title: "מחקר אוניברסיטת ברונל: חיסכון של חצי מיליארד ליש\"ט ל-NHS", 
      cat: 'מחקרים כלכליים', 
      date: '01.02.2024', 
      summary: 'מעבר של מחצית מהמעשנים לתחליפים עשוי לחסוך הון למערכת הבריאות.',
      fullContent: 'מחקר מאוניברסיטת ברונל בלונדון מצא כי אם מחצית מהמעשנים באנגליה יעברו לסיגריות אלקטרוניות, מערכת הבריאות הלאומית (NHS) עשויה לחסוך כ-518 מיליון ליש"ט בשנה ממוצעת. חיסכון זה נובע מירידה צפויה של 13% באשפוזים הקשורים לעישון. העלות הכוללת של העישון לחברה באנגליה נאמדת בכ-17 מיליארד ליש"ט בשנה, סכום הגבוה משמעותית מהכנסות המדינה ממסים על טבק.',
      source: 'Brunel University London - Public Health Research'
    },
    { 
      id: 3, 
      title: "מחקר קוהורט דרום-קוריאני: הפחתת סיכון למחלות לב", 
      cat: 'בריאות הלב', 
      date: '28.01.2024', 
      summary: 'מעקב אחר 5 מיליון גברים מראה ירידה בסיכון ל-CVD במעבר לתחליפים.',
      fullContent: 'מחקר רחב היקף שעקב אחר למעלה מ-5 מיליון גברים מבוגרים כדי לבחון את הקשר בין מעבר למוצרי ניקוטין ללא בעירה (NNTP) לבין סיכון למחלות לב. הממצאים העיקריים מראים כי מעבר מסיגריות למוצרי ניקוטין ללא בעירה נמצא קשור לסיכון נמוך יותר למחלות לב וכלי דם בהשוואה להמשך עישון סיגריות רגילות. עם זאת, המחקר מצא כי מעשנים שהפסיקו לעשן לחלוטין ללא מעבר למוצרים חלופיים נהנו מהסיכון הנמוך ביותר ל-CVD.',
      source: 'Korean National Health Insurance Service Database'
    },
    { 
      id: 4, 
      title: "מחקר איגוד הלב האמריקני (AHA): נזקי העישון המועט", 
      cat: 'בריאות הלב', 
      date: '20.01.2024', 
      summary: 'אין רף בטוח לעישון: גם 2 סיגריות ביום מכפילות את הסיכון למחלות לב.',
      fullContent: 'ניתוח מקיף של 22 מחקרי אורך בהשתתפות למעלה מ-320,000 מבוגרים, שפורסם ב-PLOS Medicine. הממצאים העיקריים קובעים כי אין רף בטוח לעישון טבק; אפילו עישון של 2 עד 5 סיגריות ביום מכפיל את הסיכון למחלות לב ומעלה ב-60% את הסיכון למוות מכל סיבה. המחקר מדגיש כי הפחתת כמות הסיגריות אינה מספיקה להגנה על הלב, ונדרשת הפסקה מוחלטת.',
      source: 'American Heart Association - PLOS Medicine'
    },
    { 
      id: 5, 
      title: "ניסוי קליני NIHR ו-UCL: יעילות האידוי מול מדבקות", 
      cat: 'יעילות גמילה', 
      date: '15.01.2024', 
      summary: 'סיגריות אלקטרוניות נמצאו כיעילות פי שניים מתחליפי ניקוטין מסורתיים.',
      fullContent: 'מחקר קליני מרכזי שמומן על ידי ה-NIHR בבריטניה וכלל כ-900 משתתפים. נמצא כי שימוש בסיגריות אלקטרוניות היה יעיל פי שניים בסיוע למעשנים להיגמל בהשוואה לשילוב של תחליפי ניקוטין מסורתיים כמו מדבקות או מסטיקים. שילוב של שימוש בסיגריות אלקטרוניות עם תמיכה מקצועית מעלה משמעותית את סיכויי ההצלחה של המעשן להיגמל לצמיתות.',
      source: 'National Institute for Health Research (NIHR)'
    },
    { 
      id: 6, 
      title: "סקירת מורג'ריה: השפעה על חולי COPD", 
      cat: 'מחלות ריאה', 
      date: '10.01.2024', 
      summary: 'הפחתה של 90-95% בחשיפה לכימיקלים רעילים בחולי ריאות כרוניים.',
      fullContent: 'סקירה שבחנה מחקרים קליניים וסקרים על ההשפעות הנשימתיות של סיגריות אלקטרוניות וטבק מחומם בקרב חולי מחלת ריאות חסימתית כרונית (COPD). הממצאים מראים כי מוצרים אלו מציעים הפחתה משמעותית בחשיפה לכימיקלים רעילים (90% עד 95% פחות) בהשוואה לסיגריות בוערות. עבור חולי COPD שלא מצליחים להיגמל, מעבר לתחליפים עשוי להאט את הידרדרות המחלה על ידי הפחתת הנזק מהעשן.',
      source: 'Morjaria et al. Research Review'
    }
  ];

  const filtered = selectedCat === 'כל הקטגוריות' ? articles : articles.filter(a => a.cat === selectedCat);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="mb-8 text-emerald-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform"
        >
          <svg className="w-5 h-5 rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          חזרה לרשימת המחקרים
        </button>
        
        <article className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{selectedArticle.cat}</span>
            <span className="text-sm text-slate-400 font-medium">{selectedArticle.date}</span>
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
      <div className="mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-black text-slate-800 mb-4">ספריית מחקרים וסיכומי ידע</h1>
        <p className="text-lg text-slate-600 max-w-3xl font-medium">ריכוז המחקרים הבינלאומיים העדכניים ביותר בתחום העישון, הגמילה והפחתת הנזק. כל המידע מוגש בעברית נגישה לטובת הציבור.</p>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-12 animate-fade-in delay-100">
        {CATEGORIES.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-6 py-2 rounded-full text-sm font-black transition-all transform hover:scale-105 ${
              selectedCat === cat ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((article, idx) => (
          <div 
            key={article.id} 
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col group animate-fade-in-up"
            style={{ animationDelay: `${(idx + 1) * 100}ms` }}
          >
            <div className="h-2 bg-emerald-500 w-0 group-hover:w-full transition-all duration-700"></div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">{article.cat}</span>
                <span className="text-[10px] text-slate-400 font-bold">{article.date}</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">{article.title}</h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow font-medium">{article.summary}</p>
              
              <div className="bg-slate-50 p-4 rounded-2xl text-[13px] text-slate-600 mb-6 italic border-r-4 border-emerald-200">
                {article.fullContent.substring(0, 140)}...
              </div>

              <button 
                onClick={() => setSelectedArticle(article)}
                className="text-emerald-600 font-black text-sm hover:text-emerald-700 mt-auto inline-flex items-center gap-2 transition-all hover:translate-x-[-5px]"
              >
                <span>קרא את הסיכום המלא</span>
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 bg-emerald-950 text-white p-12 rounded-[3rem] relative overflow-hidden shadow-2xl animate-fade-in delay-500">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_rgba(16,185,129,0.1),_transparent)] pointer-events-none"></div>
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6 leading-tight">מקורות המידע שלנו</h2>
            <p className="text-emerald-100 mb-8 leading-relaxed text-lg font-light">אנחנו מתבססים על גופים רשמיים כמו ה-NHS הבריטי, ה-FDA האמריקאי, וכתבי עת מדעיים כמו PLOS Medicine ו-NIHR. המטרה היא להביא לכם את האמת המדעית ללא פילטרים מסחריים.</p>
            <div className="flex gap-4">
              <div className="bg-emerald-800/50 backdrop-blur-md px-6 py-3 rounded-2xl text-sm font-black border border-emerald-700/50">עשרות סקירות</div>
              <div className="bg-emerald-800/50 backdrop-blur-md px-6 py-3 rounded-2xl text-sm font-black border border-emerald-700/50">עדכון שבועי</div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg p-10 rounded-[2rem] border border-white/10 shadow-inner">
            <h3 className="font-black text-2xl mb-4 text-emerald-400">הצהרת שקיפות</h3>
            <p className="text-base text-emerald-100/80 italic font-medium leading-relaxed">"כל הסיכומים באתר נערכו על ידי מתנדבים ואינם מהווים תחליף לייעוץ רפואי אישי. אנחנו מעודדים אתכם לגשת למקורות המקוריים המקושרים בכל מאמר."</p>
          </div>
        </div>
      </div>
    </div>
  );
};
