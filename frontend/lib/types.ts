export interface User {
  id: string;
  email: string;
  nombre: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

/* ----------------------------- Portal module ----------------------------- */

export interface MoodBoardImage {
  id: string;
  imageUrl: string;
  order: number;
  createdAt?: string;
}

export interface KeyBelief {
  id: string;
  text: string;
  order: number;
}

export interface PortalSlideImage {
  id: string;
  slideId: string;
  imageUrl: string;
  order: number;
}

export interface PortalSlide {
  id: string;
  order: number;
  title: string | null;
  narrativeText: string;
  images: PortalSlideImage[];
}

export interface PortalNarrative {
  id: string;
  text: string;
  updatedAt?: string;
}

export interface PortalOverview {
  moodBoard: MoodBoardImage[];
  beliefs: KeyBelief[];
  slides: PortalSlide[];
  narrative: PortalNarrative | null;
}
