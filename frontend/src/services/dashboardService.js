import api from './api';

export const dashboardService = {
  getDashboardData: () => api.get('/api/v1/dashboard').then((res) => res.data),
};
