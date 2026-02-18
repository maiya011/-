// Path to the PHP backend
const API_BASE = 'backend_core.php';

const handleResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");
  
  // If we get a 404, it means the PHP file is missing from the current server path
  if (res.status === 404) {
    console.warn(`Backend file not found at ${API_BASE}. Make sure you are running on a PHP server.`);
    // Return mock data for development environment to prevent crash
    return {}; 
  }

  if (!res.ok) {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'שגיאת שרת');
    }
    throw new Error(`שגיאת תקשורת (${res.status})`);
  }
  
  try {
    return await res.json();
  } catch (e) {
    return {};
  }
};

export const api = {
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE}?action=get_settings`);
      return await handleResponse(res);
    } catch (e) {
      return { favicon_url: 'https://cdn-icons-png.flaticon.com/512/2855/2855546.png' };
    }
  },

  async updateSettings(settings: Record<string, string>) {
    const res = await fetch(`${API_BASE}?action=update_settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return handleResponse(res);
  },

  async getArticles(search = '') {
    const url = `${API_BASE}?action=get_articles${search ? `&search=${encodeURIComponent(search)}` : ''}`;
    const res = await fetch(url);
    const data = await handleResponse(res);
    return Array.isArray(data) ? data : [];
  },

  async getForumPosts(isAdmin = false) {
    const res = await fetch(`${API_BASE}?action=get_forum_posts${isAdmin ? '&role=admin' : ''}`);
    const data = await handleResponse(res);
    return Array.isArray(data) ? data : [];
  },

  async getUserPosts(userId: number) {
    const res = await fetch(`${API_BASE}?action=get_user_posts&user_id=${userId}`);
    const data = await handleResponse(res);
    return Array.isArray(data) ? data : [];
  },

  async login(email: string, password: any) {
    const res = await fetch(`${API_BASE}?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
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

  async createPost(userId: number, title: string, content: string) {
    const res = await fetch(`${API_BASE}?action=create_post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, title, content })
    });
    return handleResponse(res);
  },

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

  async sendContactForm(data: any) {
    const res = await fetch(`${API_BASE}?action=send_contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  }
};