'use client';

import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    'Ремонт квартир эконом',
    'Ремонт квартир стандарт',
    'Ремонт квартир люкс',
    'Ремонт офисов',
    'Дизайн интерьера',
    'Сантехнические работы',
    'Электромонтажные работы',
    'Малярные работы'
  ];

  const quickLinks = [
    { href: '#services', label: 'Услуги' },
    { href: '#portfolio', label: 'Наши работы' },
    { href: '#calculator', label: 'Калькулятор' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#about', label: 'О нас' },
    { href: '#contact', label: 'Контакты' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Кнопка "Наверх" */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg cursor-pointer"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Колонка 1: О компании */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">А</span>
              </div>
              <div>
                <div className="text-xl font-bold">АМСТРОЙ</div>
                <div className="text-sm text-gray-400">Ремонт и отделка</div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Профессиональный ремонт квартир и офисов в Санкт-Петербурге. 
              Более 15 лет опыта, гарантия качества.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
              >
                VK
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
              >
                YT
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer"
              >
                TG
              </a>
            </div>
          </div>

          {/* Колонка 2: Услуги */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Наши услуги</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-white transition-colors text-sm cursor-pointer"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3: Быстрые ссылки */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Быстрые ссылки</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Документы</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm cursor-pointer">
                    Политика конфиденциальности
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm cursor-pointer">
                    Пользовательское соглашение
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Колонка 4: Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Контакты</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+79533713417"
                    className="text-white hover:text-blue-400 transition-colors font-medium"
                  >
                    +7 (953) 371-34-17
                  </a>
                  <p className="text-gray-400 text-sm">Звонок бесплатный</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:info@spbremontotdelka.ru"
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    info@spbremontotdelka.ru
                  </a>
                  <p className="text-gray-400 text-sm">Ответим в течение часа</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white">Санкт-Петербург</p>
                  <p className="text-gray-400 text-sm">Работаем по всему городу</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
              <p className="text-sm font-medium mb-2">Режим работы</p>
              <p className="text-sm">Пн-Вс: 9:00 - 20:00</p>
              <p className="text-xs text-blue-100 mt-1">Без выходных</p>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 АМСТРОЙ. Все права защищены.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>ИНН: 1234567890</span>
              <span>ОГРН: 1234567890123</span>
              <span>СРО</span>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              Не является публичной офертой. Цены указаны ориентировочно. 
              Точная стоимость определяется после осмотра объекта.
            </p>
          </div>
        </div>
      </div>

      {/* Липкая кнопка звонка для мобильных */}
      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <a
          href="tel:+79533713417"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors animate-pulse"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer; 