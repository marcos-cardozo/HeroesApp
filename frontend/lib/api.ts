'use client';

import axios from 'axios';
import {
  PortalData,
  MoodBoardImage,
  KeyBelief,
  PortalSlide,
  PortalSlideImage,
  PortalNarrative,
} from '@/lib/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    const loginUrl = new URL('/login', window.location.origin).toString();
    window.location.assign(loginUrl);
  }
};

// Response interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: async (data: { email: string; password: string; nombre: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export const portalApi = {
  getAll: async (): Promise<PortalData> => {
    const response = await api.get('/portal');
    return response.data;
  },
  // Mood Board
  getMoodBoard: async (): Promise<MoodBoardImage[]> => {
    const response = await api.get('/portal/mood-board');
    return response.data;
  },
  addMoodBoardImage: async (imageUrl: string, order: number): Promise<MoodBoardImage> => {
    const response = await api.post('/portal/mood-board', { imageUrl, order });
    return response.data;
  },
  updateMoodBoardImage: async (id: string, data: Partial<MoodBoardImage>): Promise<MoodBoardImage> => {
    const response = await api.patch(`/portal/mood-board/${id}`, data);
    return response.data;
  },
  deleteMoodBoardImage: async (id: string): Promise<void> => {
    await api.delete(`/portal/mood-board/${id}`);
  },
  // Beliefs
  getBeliefs: async (): Promise<KeyBelief[]> => {
    const response = await api.get('/portal/beliefs');
    return response.data;
  },
  addBelief: async (text: string, order: number): Promise<KeyBelief> => {
    const response = await api.post('/portal/beliefs', { text, order });
    return response.data;
  },
  updateBelief: async (id: string, data: Partial<KeyBelief>): Promise<KeyBelief> => {
    const response = await api.patch(`/portal/beliefs/${id}`, data);
    return response.data;
  },
  deleteBelief: async (id: string): Promise<void> => {
    await api.delete(`/portal/beliefs/${id}`);
  },
  // Slides
  getSlides: async (): Promise<PortalSlide[]> => {
    const response = await api.get('/portal/slides');
    console.log('Slides fetched:', response.data);
    return response.data;
  },
  createSlide: async (title: string, narrativeText: string, order: number): Promise<PortalSlide> => {
    const response = await api.post('/portal/slides', { title, narrativeText, order });
    return response.data;
  },
  updateSlide: async (id: string, data: Partial<Pick<PortalSlide, 'title' | 'narrativeText' | 'order'>>): Promise<PortalSlide> => {
    const response = await api.patch(`/portal/slides/${id}`, data);
    return response.data;
  },
  deleteSlide: async (id: string): Promise<void> => {
    await api.delete(`/portal/slides/${id}`);
  },
  addSlideImage: async (slideId: string, imageUrl: string, order: number): Promise<PortalSlideImage> => {
    const response = await api.post(`/portal/slides/${slideId}/images`, { imageUrl, order });
    return response.data;
  },
  deleteSlideImage: async (slideId: string, imageId: string): Promise<void> => {
    await api.delete(`/portal/slides/${slideId}/images/${imageId}`);
  },
  // Narrative
  getNarrative: async (): Promise<PortalNarrative | null> => {
    const response = await api.get('/portal/narrative');
    return response.data;
  },
  upsertNarrative: async (text: string): Promise<PortalNarrative> => {
    const response = await api.put('/portal/narrative', { text });
    return response.data;
  },
};

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }
};

export default api;
