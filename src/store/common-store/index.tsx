// import { IProfile } from "@/interface/profile-interface";
import { IFilterConfig } from "@/interface/common-interface";
import { create } from "zustand";

interface ICommonStoreProps {
  profileData: any;
  setProfile: (profileData: any) => void;

  filterConfig: any;
  setFilterConfig: (filterconfig: any) => void;

  filterSaved: any;
  setFilterSaved: (filterSaved: any) => void;
}

export const useCommonStore = create<ICommonStoreProps>((set, get) => ({
  profileData: {
    id: null,
    email: "",
    firstName: "",
    lastName: "",
    contact: null,
    avatar: null,
    isTwoFAEnabled: false,
    regionId: null,
    stateId: null,
    localGovId: [],
    role: {
      id: null,
      name: "",
      permissions: [],
    },
  },
  setProfile: (data: any) => {
    set(() => ({ profileData: data }));
  },

  filterConfig: {},
  setFilterConfig: (data: any) => {
    set(() => ({ filterConfig: data }));
  },

  filterSaved: {
    leads: "",
    clients: "",
    sources: "",
    status: "",
    type: "",
    risk_status: "",
    market: "",
    date: "",
    date_type: "",
  },
  setFilterSaved: (data: any) => {
    set(() => ({ filterSaved: data }));
  },
}));
