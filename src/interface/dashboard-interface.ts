export interface IDashboard {
  data: IDashboardData;
}

export interface IDashboardData {
  highest_amount_invoice_per_vendor: {
    [key: string]: number;
  };
  invoice_status: {
    [key: string]: number;
  };
  top_vendors_by_invoice_count: {
    [key: string]: number;
  };
  total_info: {
    latest_invoice: number;
    pending_approval_invoices: number;
    this_month_invoice_amount: number;
    approved_bills_this_month: number;
    last_month_invoice_amount: number;
    last_month_invoice_count: number;
    last_month_pending_approval_invoices: number;
  };
}
