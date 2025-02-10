export interface Job {
  id: number;
  title: string;
  organization: string;
  degree: string;
  jobType: string;
  locations: string[];
  minimumQualifications: string[];
  preferredQualifications: string[];
  description: string[];
  dateAdded: string;
}
export interface Degree {
  id: number;
  degree: string;
}

export interface Spotlight {
  id: number;
  img: string;
  title: string;
  description: string;
}

export interface ApiResponse {
  record: {
    degrees: Degree[];
    jobs: Job[];
    spotlights: Spotlight[];
  };
}
