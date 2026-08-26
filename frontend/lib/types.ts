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

<<<<<<< HEAD
=======
/* ----------------------------- Portal module ----------------------------- */

>>>>>>> 03678f32c1a5e7f1b1df29389ff3e8c036972211
export interface MoodBoardImage {
  id: string;
  imageUrl: string;
  order: number;
<<<<<<< HEAD
=======
  createdAt?: string;
>>>>>>> 03678f32c1a5e7f1b1df29389ff3e8c036972211
}

export interface KeyBelief {
  id: string;
  text: string;
  order: number;
}

export interface PortalSlideImage {
  id: string;
<<<<<<< HEAD
=======
  slideId: string;
>>>>>>> 03678f32c1a5e7f1b1df29389ff3e8c036972211
  imageUrl: string;
  order: number;
}

export interface PortalSlide {
  id: string;
<<<<<<< HEAD
  title: string | null;
  narrativeText: string | null;
  order: number;
=======
  order: number;
  title: string | null;
  narrativeText: string;
>>>>>>> 03678f32c1a5e7f1b1df29389ff3e8c036972211
  images: PortalSlideImage[];
}

export interface PortalNarrative {
  id: string;
  text: string;
<<<<<<< HEAD
}

export interface PortalData {
=======
  updatedAt?: string;
}

export interface PortalOverview {
>>>>>>> 03678f32c1a5e7f1b1df29389ff3e8c036972211
  moodBoard: MoodBoardImage[];
  beliefs: KeyBelief[];
  slides: PortalSlide[];
  narrative: PortalNarrative | null;
}
