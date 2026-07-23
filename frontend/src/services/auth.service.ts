import api from './api';
import axios, { AxiosError } from 'axios';
import type { LoginPayload, LoginResponse, RegisterPayload } from '../types/auth';

export const authService = {
  register: async (payload: RegisterPayload): Promise<void> => {
    await api.post('/api/auth/register', payload);
  },
  login: async (payload: LoginPayload): Promise<LoginResponse> =>
    (await api.post<LoginResponse>('/api/auth/login', payload)).data,
};
export function getAuthErrorMessage(error: unknown, action: 'login' | 'register') {
  if (!axios.isAxiosError(error)) return 'Something went wrong. Please try again.';
  const response = error as AxiosError<{ detail?: string; message?: string }>;
  const status = response.response?.status;
  if (action === 'register' && status === 409) return 'An account with this email already exists.';
  if (action === 'login' && [400, 401, 403].includes(status ?? 0))
    return 'Invalid email or password.';
  if (status === 500) return 'Our server is having trouble. Please try again shortly.';
  return (
    response.response?.data?.detail ??
    response.response?.data?.message ??
    'Something went wrong. Please try again.'
  );
}
