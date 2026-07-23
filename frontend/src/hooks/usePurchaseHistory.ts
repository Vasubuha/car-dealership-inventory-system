/** Custom hook for managing purchase history state.
 *  Mirrors the useVehicles.js pattern: handles loading, error, data, and pagination.
 */
import { useCallback, useEffect, useState } from 'react';
import { purchaseService } from '../services/purchaseService';
import type { Purchase, PaginationMeta, PurchaseHistoryParams } from '../types/purchase';

interface UsePurchaseHistoryState {
  purchases: Purchase[];
  meta: PaginationMeta;
  loading: boolean;
  error: string;
  page: number;
  make: string;
  model: string;
  setPage: (page: number) => void;
  setMake: (make: string) => void;
  setModel: (model: string) => void;
  refresh: () => void;
}

const DEFAULT_META: PaginationMeta = { page: 1, page_size: 10, total: 0, total_pages: 0 };

export function usePurchaseHistory(pageSize = 10): UsePurchaseHistoryState {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>(DEFAULT_META);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const fetch = useCallback(
    async (params: PurchaseHistoryParams) => {
      setLoading(true);
      setError('');
      try {
        const data = await purchaseService.getPurchaseHistory(params);
        setPurchases(data.items);
        setMeta(data.meta);
      } catch {
        setError('Unable to load purchase history. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const refresh = useCallback(() => {
    void fetch({ page, page_size: pageSize, make: make || undefined, model: model || undefined });
  }, [fetch, page, pageSize, make, model]);

  useEffect(() => {
    void fetch({ page, page_size: pageSize, make: make || undefined, model: model || undefined });
  }, [fetch, page, pageSize, make, model]);

  // Reset to page 1 when filters change
  const handleSetMake = useCallback((value: string) => {
    setMake(value);
    setPage(1);
  }, []);

  const handleSetModel = useCallback((value: string) => {
    setModel(value);
    setPage(1);
  }, []);

  return {
    purchases,
    meta,
    loading,
    error,
    page,
    make,
    model,
    setPage,
    setMake: handleSetMake,
    setModel: handleSetModel,
    refresh,
  };
}
