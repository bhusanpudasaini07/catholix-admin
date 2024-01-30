// import { IProfile } from "@/interface/profile-interface";
import { create } from "zustand";

interface IProfileProps {
  profileData: any;
  setProfile: (profileData: any) => void;
}

export const useProfileStore = create<IProfileProps>((set, get) => ({
  profileData: {
    first_name: "",
    last_name: "",
    mobile_number: "",
    address: "",
    email: "",
    image: undefined,
  },
  setProfile: (data: any) => {
    set(() => ({ profileData: data }));
  },
}));
