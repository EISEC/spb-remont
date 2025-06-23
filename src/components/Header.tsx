'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from './ModalProvider';
import QuickForm from './forms/QuickForm';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { href: '/services', label: 'Услуги', external: true },
    { href: '#portfolio', label: 'Наши работы' },
    { href: '#calculator', label: 'Калькулятор' },
    { href: '/blog', label: 'Блог', external: true },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#about', label: 'О нас' },
    { href: '#contact', label: 'Контакты' },
  ];

  const handleCallEstimatorClick = () => {
    openModal(<QuickForm title="Вызвать сметчика" subtitle="Оставьте заявку и наш специалист приедет для составления сметы" />);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">А</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800">АМСТРОЙ</span>
              <span className="text-xs text-gray-500 font-medium">Ремонт и отделка</span>
            </div>
          </Link>

          {/* Навигация - десктоп */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-800 hover:text-green-500 transition-colors duration-200 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Контакты и CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="tel:+79533713417"
                            className="flex items-center space-x-2 text-gray-800 hover:text-green-500 transition-colors group"
            >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">+7 (953) 371-34-17</span>
                                        <span className="text-xs text-gray-500">Звонок бесплатный</span>
              </div>
            </a>
            <button 
              onClick={handleCallEstimatorClick}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Вызвать сметчика
            </button>
          </div>

          {/* Мобильное меню кнопка */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:text-green-500 transition-colors rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Мобильное меню */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm rounded-b-2xl"
            >
              <nav className="flex flex-col space-y-1 mt-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-800 hover:text-green-500 hover:bg-gray-100 transition-all duration-200 font-medium py-3 px-4 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 px-4">
                  <a
                    href="tel:+79533713417"
                                                                className="flex items-center space-x-3 text-gray-800 hover:text-green-500 transition-colors py-2"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">+7 (953) 371-34-17</span>
                      <span className="text-xs text-gray-500">Звонок бесплатный</span>
                    </div>
                  </a>
                  <button 
                    onClick={() => {
                      handleCallEstimatorClick();
                      setIsMenuOpen(false);
                    }}
                                          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-500 transition-all duration-200 font-medium w-full shadow-lg"
                  >
                    Вызвать сметчика
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 