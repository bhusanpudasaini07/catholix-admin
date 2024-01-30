import { VendorFormSchema } from "@/schema/vendor-schema/vendor-schema";
import { z } from "zod";
import { IPagination } from "./pagination-interface";
export interface IVendor {
  data: {
    active_vendors: number;
    inactive_vendors: number;
    total_vendors: number;
    vendors: IVendorDetails[];
  };
  pagination: IPagination;
}
export interface IVendorDetails {
  id: string;
  account_number: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  company_name: string;
  contact_person_email: string;
  contact_person_first_name: string;
  contact_person_last_name: string;
  contact_person_phone_number: string;
  country: string;
  description: string;
  join_date: string;
  name: string;
  no_of_projects: 0;
  primary_email: string;
  state: string;
  tax_id: string;
  vendor_id: string;
  vendor_since: string;
  zip_code: string;
  is_synced: boolean;
  sync_date: string;
  tax_clearance_file: string;
  bank_details: [
    {
      name: string;
      account_number: string;
      branch: string;
      bank_contact_number: string;
    }
  ];
}

export interface IAllVendors {
  data: [
    {
      name: string;
      id: string;
    }
  ];
}

export interface IVendorFormInput extends z.infer<typeof VendorFormSchema> {}
