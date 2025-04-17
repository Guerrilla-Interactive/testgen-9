export interface Participant {
  _id: string;
  _createdAt: string;
  name: string;
  score: number;
  createdAt?: string;
}

export type SortOption = "latest" | "highest" | "lowest" | "alphabetical"; 