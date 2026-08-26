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

export interface MoodBoardImage {
  id: string;
  imageUrl: string;
  order: number;
}

export interface KeyBelief {
  id: string;
  text: string;
  order: number;
}

export interface PortalSlideImage {
  id: string;
  imageUrl: string;
  order: number;
}

export interface PortalSlide {
  id: string;
  title: string | null;
  narrativeText: string | null;
  order: number;
  images: PortalSlideImage[];
}

export interface PortalNarrative {
  id: string;
  text: string;
}

export interface PortalData {
  moodBoard: MoodBoardImage[];
  beliefs: KeyBelief[];
  slides: PortalSlide[];
  narrative: PortalNarrative | null;
}
