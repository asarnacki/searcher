import type { Job } from "@/api/types";

export const createJob = (job: Partial<Job> = {}): Job => ({
  id: 13,
  title: "Backbone Lead",
  organization: "VueTube",
  degree: "Master's",
  jobType: "Intern",
  locations: ["Boulder"],
  minimumQualifications: ["Innovate magnetic solutions."],
  preferredQualifications: ["Disintermediate cross-platform web services."],
  description: ["Financial song write since ground security week."],
  dateAdded: "2021-06-23",
  ...job,
});
