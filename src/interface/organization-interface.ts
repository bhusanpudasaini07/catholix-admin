import { OrganizationSchema } from "@/schema/organization-schema/organization-schema";
import { z } from "zod";

//Organization Data Interface
export interface IOrganization {
  business_address: string;
  contact: string;
  contact_person_name: string;
  created_at: string;
  email: string;
  legal_business_address: string;
  legal_business_name: string;
  logo: string;
  name: string;
  status: false;
  suite: string;
  tax_id_number: string;
  tax_id_type: string;
  type: string;
  updated_at: string;
}

export interface IOrganizationForm extends z.infer<typeof OrganizationSchema> {}
