const API_BASE = '/backend_core.php';

const handleResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");
  
  if (!res.ok) {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await res.json();
      // הצגת השגיאה העיקרית + פירוט אם קיים (חשוב לניפוי שגיאות DB)
      const message = errorData.details 
        ? `${errorData.error}: ${errorData.details}`
        : (errorData.error || errorData.message || 'שגיאת שרת');
      throw new Error(message);
    } else {
      const text = await res.text();
      console.error("Server returned non-JSON error:", text);
      throw new Error(`שגיאת שרת (Status ${res.status}). פנה למנהל המערכת.`);
    }
  }

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON but got:", text);
    throw new Error("השרת החזיר תשובה שאינה תקינה. וודא שקובץ ה-PHP קיים ונגיש.");
  }

  return res.json();
};

export const api = {
  async getArticles(search = '') {
    const url = search 
      ? `${API_BASE}?action=get_articles&search=${encodeURIComponent(search)}`
      : `${API_BASE}?action=get_articles`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getForumPosts() {
    const res = await fetch(`${API_BASE}?action=get_forum_posts`);
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

  async ping() {
    try {
      const res = await fetch(`${API_BASE}?action=ping`);
      return res.ok;
    } catch {
      return false;
    }
  }
};