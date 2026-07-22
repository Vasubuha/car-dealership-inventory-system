import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService } from '../services/auth.service'
import type { AuthContextValue, AuthUser, LoginPayload, RegisterPayload } from '../types/auth'
const TOKEN_KEY = 'dealership.accessToken'; const REFRESH_TOKEN_KEY = 'dealership.refreshToken'; const USER_KEY = 'dealership.user'
const AuthContext = createContext<AuthContextValue | undefined>(undefined)
function userFromToken(token: string): AuthUser | null { try { const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); return { id: payload.user_id ?? payload.sub, username: payload.username, email: payload.email, role: payload.role ?? 'user' } } catch { return null } }
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null); const [user, setUser] = useState<AuthUser | null>(null)
  useEffect(() => { const storedToken = localStorage.getItem(TOKEN_KEY); if (!storedToken) return; setToken(storedToken); const storedUser = localStorage.getItem(USER_KEY); setUser(storedUser ? JSON.parse(storedUser) : userFromToken(storedToken)) }, [])
  const login = useCallback(async (payload: LoginPayload) => { const response = await authService.login(payload); const nextUser = response.user ?? userFromToken(response.access_token) ?? { email: payload.email, role: 'user' }; localStorage.setItem(TOKEN_KEY, response.access_token); if (response.refresh_token) localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh_token); localStorage.setItem(USER_KEY, JSON.stringify(nextUser)); setToken(response.access_token); setUser(nextUser); return nextUser }, [])
  const register = useCallback(async (payload: RegisterPayload) => { await authService.register(payload) }, [])
  const logout = useCallback(() => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(REFRESH_TOKEN_KEY); localStorage.removeItem(USER_KEY); setToken(null); setUser(null) }, [])
  const value = useMemo(() => ({ user, token, isAuthenticated: Boolean(token), login, register, logout }), [user, token, login, register, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within an AuthProvider'); return context }