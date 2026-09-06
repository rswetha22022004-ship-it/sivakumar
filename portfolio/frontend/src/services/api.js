import axios from 'axios';
import skillmaxImage from '../assets/skillmax.jpeg';
import exchangeImage from '../assets/exchange.ai.jpeg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getProfile = () => api.get('/profile/').then((r) => r.data);
export const getExperience = () => api.get('/experience/').then((r) => r.data.results ?? r.data);
export const getSkills = () => api.get('/skills/').then((r) => r.data.results ?? r.data);
const localProjectImages = {
  'skillsmax-ai': skillmaxImage,
  'skillsmax-exchange': exchangeImage,
};

const withProjectImage = (project) => ({
  ...project,
  image: project.image || localProjectImages[project.slug] || null,
});

export const getProjects = () => api.get('/projects/').then((r) => {
  const projects = r.data.results ?? r.data;
  return projects.map(withProjectImage);
});
export const getProject = (slug) => api.get(`/projects/${slug}/`).then((r) => withProjectImage(r.data));
export const getEducation = () => api.get('/education/').then((r) => r.data.results ?? r.data);
export const getResume = () => api.get('/resume/').then((r) => r.data);
export const sendContactMessage = (payload) => api.post('/contact/', payload).then((r) => r.data);

export const mediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  if (path.startsWith('/assets/')) return path;
  const origin = API_BASE_URL.replace(/\/api\/?$/, '');
  return `${origin}${path}`;
};

export default api;
