const API_BASE = './backend_core.php';

const handleResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");
  if (!res.ok) {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'שגיאת שרת');
    }
    throw new Error(`שגיאת תקשורת (${res.status})`);
  }
  return res.json();
};

export const api = {
  async getArticles(search = '') {
    const url = `${API_BASE}?action=get_articles${search ? `&search=${encodeURIComponent(search)}` : ''}`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getForumPosts(isAdmin = false) {
    const res = await fetch(`${API_BASE}?action=get_forum_posts${isAdmin ? '&role=admin' : ''}`);
    return handleResponse(res);
  },

  async getUserPosts(userId: number) {
    const res = await fetch(`${API_BASE}?action=get_user_posts&user_id=${userId}`);
    return handleResponse(res);
  },

  async register(username: string, email: string, password: any) {
    const res = await fetch(`${API_BASE}?action=register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    return handleResponse(res);
  },

  async login(email: string, password: any) {
    const res = await fetch(`${API_BASE}?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },

  async createPost(userId: number, title: string, content: string) {
    const res = await fetch(`${API_BASE}?action=create_post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, title, content })
    });
    return handleResponse(res);
  },

  async sendContactForm(data: { name: string, email: string, subject: string, message: string }) {
    const res = await fetch(`${API_BASE}?action=send_contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  // Admin Actions
  async approvePost(postId: number) {
    const res = await fetch(`${API_BASE}?action=approve_post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post_id: postId })
    });
    return handleResponse(res);
  },

  async deletePost(postId: number) {
    const res = await fetch(`${API_BASE}?action=delete_post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post_id: postId })
    });
    return handleResponse(res);
  },

  async createArticle(data: { title: string, summary: string, content: string, image_url?: string, source_url?: string }) {
    const res = await fetch(`${API_BASE}?action=create_article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
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