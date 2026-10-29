export type BundleStatus = "draft" | "active" | "inactive";

export interface IBundleItem {
  id?: number;
  productId: number;
  quantity: number;
  product?: {
    id?: number;
    productName?: string;
    title?: string;
  };
}

export interface IBundle {
  id: number;
  name: string;
  description?: string;
  fixedPrice: number | string;
  imageUrl?: string;
  stockQuantity: number;
  status: BundleStatus;
  items?: IBundleItem[];
  createdAt?: string;
}

export interface IBundlePayload {
  name: string;
  description?: string;
  fixedPrice: number;
  imageUrl?: string;
  stockQuantity: number;
  status?: BundleStatus;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}
