import api from "./api";
const base = "/api/v1/vehicles";
const data = (request) => request.then((response) => response.data);
export const vehicleService = {
  getVehicles: () => data(api.get(base)), getVehicle: async (id) => (await data(api.get(base))).find((vehicle) => String(vehicle.id) === String(id)),
  createVehicle: (payload) => data(api.post(base, payload)), updateVehicle: (id, payload) => data(api.put(`${base}/${id}`, payload)),
  deleteVehicle: (id) => data(api.delete(`${base}/${id}`)), purchaseVehicle: (id, quantity = 1) => data(api.post(`${base}/${id}/purchase`, { quantity })),
  restockVehicle: (id, quantity) => data(api.post(`${base}/${id}/restock`, { quantity })), searchVehicles: (filters = {}) => data(api.get(`${base}/search`, { params: filters })),
};