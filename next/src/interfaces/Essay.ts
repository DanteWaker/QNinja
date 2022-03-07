import { User } from "./User";

export interface EssayTheme {
  id: number;
  name: string;
  themeFile: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Essay {
  id: number;
  theme: EssayTheme;
  author: User;
  image: string;
  correction: EssayCorrection;
  createdAt?: string;
  updatedAt?: string;
}

type EssayCorrectionStatus = "PENDING" | "IN PROGRESS" | "COMPLETED" | "TIMEOUT";

type EssayCorrectionRating = 1 | 2 | 3 | 4 | 5;

export interface EssayCorrection {
  id: number;
  status: EssayCorrectionStatus;
  duration?: number;
  essay: Essay;
  rating?: EssayCorrectionRating;
  textComment?: string;
  audioComment?: string;
  corrector?: User;
  author?: User;
  competence1: number;
  competence2: number;
  competence3: number;
  competence4: number;
  competence5: number;
  totalGrade: number;
}
