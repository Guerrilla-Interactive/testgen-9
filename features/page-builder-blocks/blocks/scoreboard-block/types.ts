export interface Participant {
  _id: string;
  _createdAt: string;
  name: string;
  score: number;
  createdAt?: string;
  _updatedAt?: string;
  _isOptimistic?: boolean;
}

export type SortOption = "latest" | "highest" | "lowest" | "alphabetical"; 