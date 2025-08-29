export interface FormData {
  careType: string;
  hourlyRate: string;
  schedule: string;
  budgetRange: string;
  urgency: string;
  fullName: string;
  email: string;
  phone: string;
  textOptIn: boolean;
}

export interface FormStep {
  id: number;
  title: string;
  completed: boolean;
}