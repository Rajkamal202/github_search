// repository.ts (You can place this in a separate file or within the same file if preferred)
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  [key: string]: any; // to allow any additional properties
}
