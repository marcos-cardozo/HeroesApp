export interface User {
  id: string;
  email: string;
  nombre: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
