import { useCallback, useEffect, useState } from 'react';
import { vehicleService } from '../services/vehicleService';
export function useVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setVehicles(await vehicleService.getVehicles());
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Unable to load inventory. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      void refresh();
    }, 0);
    return () => clearTimeout(timer);
  }, [refresh]);
  return { vehicles, loading, error, refresh };
}
