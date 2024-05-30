import { ProfileSchema } from "@/schema/profile-schema/profile-schema";
import { z } from "zod";
export interface IProfile extends z.infer<typeof ProfileSchema> {}
