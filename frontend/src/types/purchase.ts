/** TypeScript types for the Customer Purchase History module. */

export interface Purchase {
  purchase_id: string;
  vehicle_id: string;
  make: string;
  model: string;
  category: string;
  quantity: number;
  purchase_price: number;
  total_price: number;
  purchase_date: string; // ISO-8601 datetime string
}

export interface PaginationMeta {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface PaginatedPurchaseResponse {
  items: Purchase[];
  meta: PaginationMeta;
}

export interface PurchaseHistoryParams {
  page?: number;
  page_size?: number;
  make?: string;
  model?: string;
}
