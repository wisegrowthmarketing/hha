export interface FormData {
  careType: string;
  hourlyRate: string;
  schedule: string;
  budgetRange: string;
  urgency: string;
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  textOptIn: boolean;
}

export interface FormStep {
  id: number;
  title: string;
  completed: boolean;
}