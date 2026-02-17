
const API_BASE = '/backend_core.php';

export const api = {
  async getArticles() {
    const res = await fetch(`${API_BASE}?action=get_articles`);
    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
  },

  async getForumPosts() {
    const res = await fetch(`${API_BASE}?action=get_forum_posts`);
    if (!res.ok) throw new Error('Failed to fetch posts');
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
  }
};
