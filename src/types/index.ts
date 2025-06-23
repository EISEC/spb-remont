// Основные типы проекта

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  image?: string;
  icon?: React.ComponentType;
  category: 'apartment' | 'office' | 'commercial' | 'additional';
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'apartment' | 'office' | 'house' | 'commercial';
  images: string[];
  beforeImage?: string;
  afterImage?: string;
  area: number;
  duration: string;
  cost: string;
  year: number;
  tags: string[];
}

export interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  projectType: string;
  verified: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  avatar: string;
  experience: string;
  specialization: string[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  socialLinks: {
    vk?: string;
    telegram?: string;
    whatsapp?: string;
    instagram?: string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'process' | 'warranty';
}

// Типы для форм уже определены в validations.ts
export type { ContactFormData, QuickFormData, CalculatorFormData } from '@/lib/validations';

// Состояния модальных окон
export interface ModalState {
  isOpen: boolean;
  type: 'contact' | 'calculator' | 'portfolio' | 'quote' | null;
  data?: Record<string, unknown>;
}

// Настройки сайта
export interface SiteConfig {
  name: string;
  description: string;
  keywords: string[];
  companyInfo: {
    name: string;
    fullName: string;
    inn: string;
    ogrn: string;
    license: string;
  };
  analytics: {
    yandexMetrikaId?: string;
    googleAnalyticsId?: string;
  };
} 