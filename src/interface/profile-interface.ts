import { ProfileSchema } from "@/schema/profile-schema/profile-schema";
import { z } from "zod";
export interface IProfile extends z.infer<typeof ProfileSchema> {}

export interface IProfileData {
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    contact: string | null;
    avatar: string | null;
    isTwoFAEnabled: boolean;

    role: {
      id: string | null;
      name: string;
      permissions: string[];
    };
  };
}
