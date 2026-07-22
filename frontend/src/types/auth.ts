export type UserRole = 'admin' | 'user' | string
export interface AuthUser { id?: number; username?: string; email?: string; role?: UserRole }
export interface LoginPayload { email: string; password: string }
export interface RegisterPayload extends LoginPayload { username: string }
export interface LoginResponse { access_token: string; refresh_token?: string; token_type?: string; user?: AuthUser }
export interface AuthContextValue { user: AuthUser | null; token: string | null; isAuthenticated: boolean; login: (payload: LoginPayload) => Promise<AuthUser>; register: (payload: RegisterPayload) => Promise<void>; logout: () => void }