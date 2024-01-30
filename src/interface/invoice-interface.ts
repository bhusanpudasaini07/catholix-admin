import { IPagination } from "./pagination-interface";

export interface IInvoice {
  data: {
    approved_invoices: number;
    onprocess_invoices: number;
    pending_invoices: number;
    rejected_invoices: number;
    total_invoice_amount: number;
    total_invoices: number;
    paid_invoices: number;
    unpaid_invoices: number;
    cancelled_invoices: number;
    hold_invoices: number;
    invoices: IInvoiceDetails[];
  };
  pagination: IPagination;
}

export interface IInvoiceDetails {
  due_date: string;
  id: string;
  invoice_date: string;
  invoice_file: string;
  invoice_number: string;
  poid_number: string;
  project_id: string;
  project_name: string;
  status: string;
  payment_status: string;
  note: string;
  total_amount: string;
  updated_details: string;
  vendor_id: string;
  vendor_name: string;
  details: any;
  approval_members: IApprovalMembers[];
}
interface IApprovalMembers {
  first_name: string;
  last_name: string;
  email: string;
  image: string;
}
