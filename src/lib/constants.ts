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

// Услуги компании
export const SERVICES = {
  'remont-ekonom': {
    title: 'Ремонт класса "Эконом"',
    description: 'Качественный косметический ремонт по доступной цене',
    slug: 'remont-ekonom',
    price: 'от 15 000 ₽/м²',
    features: ['Косметический ремонт', 'Базовые материалы', 'Быстрые сроки', 'Гарантия качества'],
    detailedDescription: 'Ремонт класса "Эконом" - это оптимальное решение для тех, кто хочет освежить свое жилье без больших затрат. Мы используем качественные базовые материалы и выполняем все работы в кратчайшие сроки.',
    workTypes: ['Покраска стен и потолков', 'Поклейка обоев', 'Укладка линолеума', 'Замена розеток и выключателей', 'Косметический ремонт санузла'],
    duration: '7-14 дней'
  },
  'remont-standart': {
    title: 'Ремонт класса "Стандарт"',
    description: 'Комплексный ремонт с качественными материалами',
    slug: 'remont-standart',
    price: 'от 25 000 ₽/м²',
    features: ['Полный ремонт', 'Качественные материалы', 'Дизайн-проект', 'Профессиональный монтаж'],
    detailedDescription: 'Ремонт класса "Стандарт" включает полный комплекс работ с использованием качественных материалов. Включает разработку дизайн-проекта и профессиональное выполнение всех этапов.',
    workTypes: ['Демонтаж и подготовка', 'Электромонтажные работы', 'Сантехнические работы', 'Отделочные работы', 'Укладка плитки и ламината', 'Установка дверей и окон'],
    duration: '21-35 дней'
  },
  'remont-lux': {
    title: 'Ремонт класса "Люкс"',
    description: 'Премиальный ремонт с эксклюзивными материалами',
    slug: 'remont-lux',
    price: 'от 45 000 ₽/м²',
    features: ['Премиум материалы', 'Авторский дизайн', 'VIP сервис', 'Эксклюзивная отделка'],
    detailedDescription: 'Ремонт класса "Люкс" - это воплощение самых смелых дизайнерских идей с использованием премиальных материалов. Индивидуальный подход к каждому проекту.',
    workTypes: ['Авторский дизайн-проект', 'Премиальные материалы', 'Сложные архитектурные решения', 'Умный дом', 'Эксклюзивная мебель', 'VIP-сервис'],
    duration: '45-90 дней'
  },
  'dizayn-pomeshcheniy': {
    title: 'Дизайн помещений',
    description: 'Создание уникального дизайн-проекта',
    slug: 'dizayn-pomeshcheniy',
    price: 'от 2 000 ₽/м²',
    features: ['3D визуализация', 'Авторский проект', 'Подбор материалов', 'Техническая документация'],
    detailedDescription: 'Профессиональное проектирование интерьеров с учетом всех ваших пожеланий. Создаем уникальные и функциональные пространства.',
    workTypes: ['Планировочные решения', '3D моделирование', 'Подбор материалов и мебели', 'Техническая документация', 'Авторский надзор'],
    duration: '14-21 день'
  },
  'santehnicheskie-raboty': {
    title: 'Сантехнические работы',
    description: 'Установка и замена сантехники',
    slug: 'santehnicheskie-raboty',
    price: 'от 3 000 ₽/точка',
    features: ['Замена труб', 'Установка сантехники', 'Гарантия', 'Быстрое выполнение'],
    detailedDescription: 'Полный спектр сантехнических работ: от замены смесителя до комплексной реконструкции санузла.',
    workTypes: ['Замена водопроводных труб', 'Установка сантехники', 'Монтаж теплых полов', 'Подключение бытовой техники'],
    duration: '1-7 дней'
  },
  'elektromontazhnye-raboty': {
    title: 'Электромонтажные работы',
    description: 'Монтаж электрики и освещения',
    slug: 'elektromontazhnye-raboty',
    price: 'от 500 ₽/точка',
    features: ['Замена проводки', 'Установка освещения', 'Умный дом', 'Безопасность'],
    detailedDescription: 'Современные электромонтажные решения с соблюдением всех норм безопасности.',
    workTypes: ['Замена электропроводки', 'Установка розеток и выключателей', 'Монтаж освещения', 'Системы умного дома'],
    duration: '3-10 дней'
  },
  'malyarnye-raboty': {
    title: 'Малярные работы',
    description: 'Покраска стен и потолков',
    slug: 'malyarnye-raboty',
    price: 'от 350 ₽/м²',
    features: ['Подготовка поверхностей', 'Качественные краски', 'Равномерное покрытие', 'Быстрое высыхание'],
    detailedDescription: 'Профессиональные малярные работы с использованием качественных материалов.',
    workTypes: ['Подготовка поверхностей', 'Грунтование', 'Покраска стен', 'Покраска потолков', 'Декоративная отделка'],
    duration: '3-7 дней'
  },
  'otdelochnye-raboty': {
    title: 'Отделочные работы',
    description: 'Укладка плитки, ламината, обоев',
    slug: 'otdelochnye-raboty',
    price: 'от 1 200 ₽/м²',
    features: ['Укладка плитки', 'Монтаж ламината', 'Поклейка обоев', 'Профессиональный инструмент'],
    detailedDescription: 'Комплексные отделочные работы любой сложности с гарантией качества.',
    workTypes: ['Укладка керамической плитки', 'Монтаж ламината и паркета', 'Поклейка обоев', 'Декоративная штукатурка'],
    duration: '5-14 дней'
  },
  'remont-ofisov': {
    title: 'Ремонт офисов',
    description: 'Корпоративный ремонт любой сложности',
    slug: 'remont-ofisov',
    price: 'от 18 000 ₽/м²',
    features: ['Быстрые сроки', 'Работа вне рабочих часов', 'Минимум простоев', 'Корпоративные скидки'],
    detailedDescription: 'Специализируемся на ремонте офисных и коммерческих помещений с учетом специфики бизнеса.',
    workTypes: ['Планировка open space', 'Офисные перегородки', 'Системы кондиционирования', 'Серверные помещения'],
    duration: '14-30 дней'
  }
};

export const BLOG_CATEGORIES = [
  { slug: 'all', name: 'Все статьи' },
  { slug: 'dizayn', name: 'Дизайн' },
  { slug: 'materialy', name: 'Материалы' },
  { slug: 'ekonomiya', name: 'Экономия' },
  { slug: 'novostroyki', name: 'Новостройки' },
  { slug: 'tehnologii', name: 'Технологии' },
  { slug: 'vannaya', name: 'Ванная' }
]; 