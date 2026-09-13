export type Language = 'pl' | 'en' | 'br' | 'es';
export type Currency = 'PLN' | 'USD' | 'BRL' | 'EUR';
export type Theme = 'dark' | 'light';

export interface ProjectQuote {
  packageName: string;
  price: string;
  description: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  packageName: string;
  estimatedPrice: string;
  message: string;
}

export interface Lead extends LeadFormData {
  id: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'completed';
}
