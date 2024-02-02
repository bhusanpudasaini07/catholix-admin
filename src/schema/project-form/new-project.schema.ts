import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  project_lead: z.string(),
  tech_lead: z.string(),
  source: z.enum(["client", "in house"]),
  client: z.string().optional(),
  project_type: z.enum(["monthly", "fixed support"]),
  market: z.enum([
    "aus",
    "eu",
    "japan",
    "korea",
    "nepal",
    "singapore",
    "uk",
    "usa",
  ]),
  git_urls: z.string().optional(),
  tech_stack: z.string().optional(),
  resources: z.string().optional(),
});

export { ProjectSchema };
