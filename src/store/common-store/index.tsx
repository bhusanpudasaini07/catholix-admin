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
    fullname: "",
    department_id: "",
    employee_id: null,
    mattermost_username: null,
    is_team_lead: "",
    is_project_lead: "",
    git_username: null,
    oa_id: null,
    permitted_modules: [],
    role: "",
    role_id: null,
    special_permission: [],
    email: "",
    username: "",
    image: undefined,
    id: "",
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
