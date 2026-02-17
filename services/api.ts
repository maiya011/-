const API_BASE = '/backend_core.php';

export const api = {
  async getArticles(search = '') {
    const url = search 
      ? `${API_BASE}?action=get_articles&search=${encodeURIComponent(search)}`
      : `${API_BASE}?action=get_articles`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('שגיאה בטעינת מאמרים');
    return res.json();
  },

  async getForumPosts() {
    const res = await fetch(`${API_BASE}?action=get_forum_posts`);
    if (!res.ok) throw new Error('שגיאה בטעינת הפורום');
    return res.json();
  },

  async register(username: string, email: string, password: any) {
    const res = await fetch(`${API_BASE}?action=register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'שגיאה ברישום');
    return data;
  },

  async login(email: string, password: any) {
    const res = await fetch(`${API_BASE}?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'אימייל או סיסמה שגויים');
    return data;
  },

  async createPost(userId: number, title: string, content: string) {
    const res = await fetch(`${API_BASE}?action=create_post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, title, content })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'שגיאה ביצירת הפוסט');
    return data;
  },

  async ping() {
    try {
      const res = await fetch(`${API_BASE}?action=ping`);
      return res.ok;
    } catch {
      return false;
    }
  }
};
