import { create } from "zustand";

import { IOrganization } from "@/interface/organization-interface";

interface IOrganizationProps {
  orgData: IOrganization;
  setOrgData: (orgData: IOrganization) => void;
}

export const useOrgStore = create<IOrganizationProps>((set, get) => ({
  orgData: {
    business_address: "",
    contact: "",
    contact_person_name: "",
    created_at: "",
    email: "",
    image: "",
    legal_business_address: "",
    legal_business_name: "",
    logo: "",
    name: "",
    status: false,
    suite: "",
    tax_id_number: "",
    tax_id_type: "",
    type: "",
    updated_at: "",
  },
  setOrgData: (data: IOrganization) => {
    set(() => ({ orgData: data }));
  },
}));
