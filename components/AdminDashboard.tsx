
import React, { useState } from 'react';

interface ContentItem {
  id: number;
  title: string;
  type: 'article' | 'research' | 'forum';
  status: 'published' | 'draft' | 'flagged';
  author: string;
  date: string;
}

export const AdminDashboard: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>([
    { id: 1, title: "השפעות עישון על מערכת כלי הדם", type: 'article', status: 'published', author: 'מנחם ג.', date: '2024-02-05' },
    { id: 2, title: "היום ה-30 בלי סיגריה", type: 'forum', status: 'published', author: 'יוסי כ.', date: '2024-02-09' },
    { id: 3, title: "סיכום דוח ה-PHE לשנת 2024", type: 'article', status: 'draft', author: 'מנחם ג.', date: '2024-02-01' },
    { id: 4, title: "תוכן פוגעני דווח", type: 'forum', status: 'flagged', author: 'אנונימי', date: '2024-02-10' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">לוח בקרה למנהל</h1>
          <p className="text-slate-600">ניהול תכנים, קהילה ודיווחים</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700">מאמר חדש</button>
          <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-slate-50">ייצוא נתונים</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <div className="text-slate-500 text-sm mb-1">סה"כ משתמשים</div>
          <div className="text-3xl font-bold text-slate-800">1,240</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <div className="text-slate-500 text-sm mb-1">מאמרים שפורסמו</div>
          <div className="text-3xl font-bold text-emerald-600">42</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <div className="text-slate-500 text-sm mb-1">פוסטים בפורום</div>
          <div className="text-3xl font-bold text-blue-600">856</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center border-red-100 bg-red-50">
          <div className="text-red-500 text-sm mb-1">דיווחים פתוחים</div>
          <div className="text-3xl font-bold text-red-600">3</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 text-lg">תכנים אחרונים</h2>
          <div className="flex gap-2">
            <input type="text" placeholder="חיפוש תוכן..." className="text-sm px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase">
                <th className="px-6 py-4 font-medium">כותרת</th>
                <th className="px-6 py-4 font-medium">סוג</th>
                <th className="px-6 py-4 font-medium">כותב</th>
                <th className="px-6 py-4 font-medium">תאריך</th>
                <th className="px-6 py-4 font-medium">סטטוס</th>
                <th className="px-6 py-4 font-medium text-left">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{item.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      item.type === 'article' ? 'bg-blue-50 text-blue-600' : 
                      item.type === 'research' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.type === 'article' ? 'מאמר' : item.type === 'research' ? 'מחקר' : 'פורום'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.author}</td>
                  <td className="px-6 py-4 text-slate-500">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 
                      item.status === 'draft' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'published' ? 'פורסם' : item.status === 'draft' ? 'טיוטה' : 'דווח'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="text-emerald-600 hover:text-emerald-800 ml-3">עריכה</button>
                    <button className="text-red-600 hover:text-red-800">מחיקה</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
