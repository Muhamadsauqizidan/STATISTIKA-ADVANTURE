// ==============================================================================
// REST CLIENT SERVICE: STATISTIKA ADVENTURE
// Specification: API.md
// ==============================================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getHeaders(token = null) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const activeToken = token || localStorage.getItem('statistika_adventure_token');
    if (activeToken) {
      headers['Authorization'] = `Bearer ${activeToken}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.getHeaders(options.token);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...(options.headers || {})
        },
        signal: AbortSignal.timeout(4000) // 4 detik timeout
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg = data?.error?.message || data?.detail || `HTTP Error ${response.status}`;
        throw new Error(errorMsg);
      }

      return data;
    } catch (err) {
      // Lempar error untuk ditangani atau di-fallback
      throw err;
    }
  }

  // --- Auth API ---
  async loginCode(studentCode) {
    return this.request('/auth/login-code', {
      method: 'POST',
      body: JSON.stringify({ student_code: studentCode.trim().toUpperCase() })
    });
  }

  async getMe(token) {
    return this.request('/auth/me', {
      method: 'GET',
      token
    });
  }

  // --- Materials API ---
  async getMaterials() {
    return this.request('/materials', {
      method: 'GET'
    });
  }

  async getMaterialDetail(levelNumber) {
    return this.request(`/materials/${levelNumber}`, {
      method: 'GET'
    });
  }

  // --- Evaluations & Questions API ---
  async getQuestions(type = 'pretest', level = null) {
    const query = level ? `?type=${type}&level=${level}` : `?type=${type}`;
    return this.request(`/evaluations/questions${query}`, {
      method: 'GET'
    });
  }

  async submitEvaluation(studentId, evaluationType, answers) {
    return this.request('/evaluations/submit', {
      method: 'POST',
      body: JSON.stringify({
        student_id: studentId,
        evaluation_type: evaluationType,
        answers: answers
      })
    });
  }

  // --- Progress API ---
  async getProgress(studentId) {
    return this.request(`/progress/${studentId}`, {
      method: 'GET'
    });
  }

  async completeLevel(studentId, levelNumber, stars = 3) {
    return this.request('/progress/complete-level', {
      method: 'POST',
      body: JSON.stringify({
        student_id: studentId,
        level_number: Number(levelNumber),
        stars: Number(stars)
      })
    });
  }

  // --- Badges API ---
  async getBadges(studentId) {
    return this.request(`/badges/${studentId}`, {
      method: 'GET'
    });
  }
}

export const api = new ApiService();
export default api;
