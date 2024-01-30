import { IPagination } from "./pagination-interface";

export interface IInbox {
  data: {
    invoice_approvals: IInboxDetail[];
    total_unapproved: number;
  };
  pagination: IPagination;
}

export interface IInboxDetail {
  bill_status: IBillStatus;
  invoice_id: string;
  vendor_info: IInboxVendorDetails;
  invoice_data: IInboxInvoiceData;
}
interface IBillStatus {
  approval_note: string | null;
  approval_status: string;
  uploaded_by: string;
  uploaded_at: string;
  approval_records: [
    {
      name: string;
      approval_date: string;
      status: string;
    }
  ];
}
interface IInboxVendorDetails {
  id: string;
  name: string;
  primary_email: string;
  vendor_id: string;
  account_number: string;
  address_line_1: string | null;
}
interface IInboxInvoiceData {
  id: string;
  project_name: string;
  vendor_name: string;
  invoice_date: string | null;
  poid_number: string | null;
  invoice_number: string | null;
  total_amount: number | null;
  bill_date: string | null;
  status: string;
  note: string | null;
  due_date: string | null;
  details: any;
}
