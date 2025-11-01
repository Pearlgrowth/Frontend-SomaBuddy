import axios from 'axios';

const API_BASE = 'http://localhost:8000';  // Local; swap to Render URL for prod

const api = axios.create({ baseURL: API_BASE });

// Kid CRUD
export const kidsApi = {
  create: (data) => api.post('/kids/', data),
  list: () => api.get('/kids/'),
  get: (id) => api.get(`/kids/${id}`),
  update: (id, data) => api.patch(`/kids/${id}`, data),
  delete: (id) => api.delete(`/kids/${id}`),
};

// TTS
export const ttsApi = {
  generate: (data) => api.post('/tts/', data, { responseType: 'blob' }),  // For MP3 download
};

// STT (File upload)
export const sttApi = {
  transcribe: (formData) => api.post('/stt/', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// AI
export const aiApi = {
  adapt: (kidId, text) => api.post(`/ai-adapt/${kidId}`, { input_text: text }),
  session: (kidId) => api.get(`/ai-session/${kidId}`),
};

export default api;