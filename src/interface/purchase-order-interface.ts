import { z } from "zod";
import { IPagination } from "./pagination-interface";
import { PurchaseOrderSchema } from "@/schema/purchase-order-schema/purchase-order-schema";

export interface IPurchaseOrder {
  data: {
    active_vendors: number;
    approved_invoices: number;
    purchase_orders: IPurchaseOrderDetail[];
    rejected_invoices: number;
  };
  pagination: IPagination;
}

export interface IPurchaseOrderDetail {
  created_at: string;
  id: string;
  is_synced: boolean;
  organization_id: string;
  po_amount: string;
  po_net: string;
  po_number: string;
  po_received_date: string;
  sync_date: string | null;
  updated_at: string;
  vendor_id: string;
  vendor_name: string;
}



export interface IPurchaseFormInput extends z.infer<typeof PurchaseOrderSchema> {}
