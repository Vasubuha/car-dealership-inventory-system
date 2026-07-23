/** API service for the Customer Purchase History module.
 *  Reuses the existing Axios instance (api.js) which automatically
 *  attaches the JWT from localStorage on every request.
 */
import api from './api';
import type { PaginatedPurchaseResponse, PurchaseHistoryParams } from '../types/purchase';

const BASE = '/api/v1/purchases';

export const purchaseService = {
  /**
   * Fetch the paginated purchase history for the currently authenticated customer.
   * Supports optional make/model text filters.
   */
  getPurchaseHistory: async (params: PurchaseHistoryParams = {}): Promise<PaginatedPurchaseResponse> => {
    // Strip out undefined / empty-string params so the query string stays clean
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
    );
    const response = await api.get<PaginatedPurchaseResponse>(`${BASE}/my-history`, {
      params: cleanParams,
    });
    return response.data;
  },

  /**
   * Fetch revenue summary (admin only).
   */
  getRevenueSummary: async (): Promise<{ total_revenue: number; total_purchases: number; total_units_sold: number }> => {
    const response = await api.get<{ total_revenue: number; total_purchases: number; total_units_sold: number }>(
      `${BASE}/summary`
    );
    return response.data;
  },
};

