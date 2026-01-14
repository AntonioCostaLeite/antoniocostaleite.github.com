export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  type: 'unique' | 'monthly';
  features: string[];
  highlight?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Instagram' | 'Web' | 'Estratégia';
  imageUrl: string;
  description: string;
}