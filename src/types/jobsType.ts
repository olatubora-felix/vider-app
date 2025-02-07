export interface JobsResponseApi {
  success: boolean;
  data: Data;
  message: string;
}

export interface Data {
  jobs: Job[];
  totalPages: number;
  page: number;
}

export interface Job {
  id: string;
  created_at: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  job_type: string;
  candidate_required_location: string;
  description: string;
  salary: number;
  publication_date: string;
  url: string;
  tags: string[];
  bookmarked: boolean;
  company_logo_url: string;
}
