export type UserRole = 'admin' | 'customer' | string;
export interface AuthUser {
  id?: number;
  username?: string;
  email?: string;
  role?: UserRole;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload extends LoginPayload {
  username: string;
}
export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  user?: AuthUser;
}
export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  login: (payload: LoginPayload) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  openLogin: (pendingAction?: () => void) => void;
  openRegister: (pendingAction?: () => void) => void;
  closeModal: () => void;
}
