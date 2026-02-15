
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const Shop: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);

  const products: Product[] = [
    {
      id: 1,
      name: "הספר: 'לנשום מחדש'",
      description: "המדריך המלא של מנחם לגמילה עצמית ושינוי הרגלים, המבוסס על ניסיון חיים ומחקרים.",
      price: 89,
      category: "ספרות והדרכה",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      name: "ערכת צמחי מרפא להרגעה",
      description: "תערובת חליטות טבעית המסייעת בהפחתת מתח וחרדה בשבועות הראשונים של הגמילה.",
      price: 120,
      category: "עזרי גמילה",
      image: "https://images.unsplash.com/photo-1594631252845-29fc4586c55c?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      name: "סימולטור נשימה נייד",
      description: "מכשיר קטן המסייע בתרגול נשימות עמוקות ברגעי דחף לעישון.",
      price: 249,
      category: "טכנולוגיה ובריאות",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 4,
      name: "יומן מעקב אישי - 90 יום",
      description: "יומן מעוצב הכולל משפטי מוטיבציה יומיים ומקום לתיעוד ההתקדמות.",
      price: 65,
      category: "ספרות והדרכה",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">חנות עזרים וכלים</h1>
          <p className="text-slate-600">כל מה שיכול לעזור לכם בדרך לחיים נקיים מעישון</p>
        </div>
        <div className="relative">
          <button className="bg-slate-100 p-3 rounded-full hover:bg-slate-200 transition-colors">
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700">
                {product.category}
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">{product.description}</p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
                <span className="text-2xl font-bold text-slate-800">₪{product.price}</span>
                <button 
                  onClick={() => setCartCount(prev => prev + 1)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  הוספה לסל
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-slate-50 p-10 rounded-3xl border border-slate-200">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="bg-emerald-100 p-6 rounded-2xl">
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">משלוח חינם בקנייה מעל 299 ₪</h2>
            <p className="text-slate-600">כל ההכנסות מהחנות מופנות להמשך תחזוקת האתר ומימון מחקרים חדשים עבור הקהילה שלנו.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
