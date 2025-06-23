import { SiteConfig, ContactInfo } from '@/types';

export const SITE_CONFIG: SiteConfig = {
  name: 'АМСТРОЙ',
  description: 'Профессиональный ремонт квартир в Санкт-Петербурге. Ремонт эконом, стандарт и люкс класса. Гарантия качества, низкие цены.',
  keywords: [
    'ремонт квартир спб',
    'ремонт квартир санкт-петербург',
    'отделка квартир',
    'дизайн интерьера',
    'строительство',
    'ремонт под ключ',
    'косметический ремонт',
    'капитальный ремонт'
  ],
  companyInfo: {
    name: 'АМСТРОЙ',
    fullName: 'ООО "АМСТРОЙ"',
    inn: '1234567890',
    ogrn: '1234567890123',
    license: 'СРО-001234'
  },
  analytics: {
    yandexMetrikaId: '12345678',
    googleAnalyticsId: 'G-XXXXXXXXXX'
  }
};

export const CONTACT_INFO: ContactInfo = {
  phone: '+7 (953) 371-34-17',
  email: 'info@spbremontotdelka.ru',
  address: 'Санкт-Петербург',
  workingHours: {
    weekdays: '9:00 - 20:00',
    weekends: '10:00 - 18:00'
  },
  socialLinks: {
    vk: 'https://vk.com/amstroy_spb',
    telegram: 'https://t.me/amstroy_spb',
    whatsapp: 'https://wa.me/79533713417'
  }
};

// Цены на услуги (за м²)
export const REPAIR_PRICES = {
  economy: {
    min: 12000,
    max: 18000,
    average: 15000
  },
  standard: {
    min: 20000,
    max: 30000,
    average: 25000
  },
  luxury: {
    min: 35000,
    max: 55000,
    average: 45000
  }
} as const;

// Дополнительные услуги и их стоимость
export const ADDITIONAL_SERVICES = {
  design: { name: 'Дизайн-проект', multiplier: 1.2 },
  demolition: { name: 'Демонтаж', price: 800 },
  plumbing: { name: 'Сантехнические работы', price: 1500 },
  electrical: { name: 'Электромонтажные работы', price: 1200 },
  flooring: { name: 'Напольные покрытия', price: 2000 },
  ceiling: { name: 'Потолки', price: 1800 },
  doors: { name: 'Окна и двери', price: 2500 }
} as const;

// Навигационные ссылки
export const NAVIGATION_LINKS = [
  { href: '#services', label: 'Услуги' },
  { href: '#portfolio', label: 'Наши работы' },
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#about', label: 'О нас' },
  { href: '#contact', label: 'Контакты' }
] as const;

// Социальные сети
export const SOCIAL_LINKS = [
  { name: 'VK', url: CONTACT_INFO.socialLinks.vk, icon: 'vk' },
  { name: 'Telegram', url: CONTACT_INFO.socialLinks.telegram, icon: 'telegram' },
  { name: 'WhatsApp', url: CONTACT_INFO.socialLinks.whatsapp, icon: 'whatsapp' }
] as const;

// SEO метаданные
export const SEO_DEFAULT = {
  title: `Ремонт квартир в СПб - ${SITE_CONFIG.name} | Качественно и с гарантией`,
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords.join(', '),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Ремонт квартир в СПб`
      }
    ]
  }
} as const; 