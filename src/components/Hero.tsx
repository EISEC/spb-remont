'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useModal } from './ModalProvider';
import QuickForm from './forms/QuickForm';

const Hero = () => {
  const { openModal } = useModal();

  const handleGetCalculationClick = () => {
    openModal(<QuickForm title="Получить расчет" subtitle="Оставьте заявку и получите предварительный расчет стоимости ремонта" />);
  };

  const benefits = [
    'Гарантия качества',
    'Фиксированные цены',
    'Сроки выполнения',
    'Опытная команда'
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20 overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - контент */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Заголовок */}
            <div className="space-y-4">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Лидер рынка ремонта в СПб
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Ремонт и отделка квартир в{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Санкт-Петербурге
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Качественный ремонт любой сложности с гарантией. 
                Работаем по договору, соблюдаем сроки, предоставляем отчетность.
              </p>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetCalculationClick}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
              >
                Получить расчет
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="tel:+79533713417"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-center cursor-pointer"
              >
                Позвонить сейчас
              </a>
            </div>

            {/* Контактная информация */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 font-medium">Работаем сейчас</span>
              </div>
              <div className="text-gray-600">
                <span className="font-semibold text-blue-600">+7 (953) 371-34-17</span>
                {' • '}
                <span>с 9:00 до 20:00, без выходных</span>
              </div>
            </div>
          </motion.div>

          {/* Правая колонка - форма */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:justify-self-end"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Бесплатный выезд сметчика
                </h3>
                <p className="text-gray-600">
                  Получите точный расчет стоимости ремонта
                </p>
              </div>

              <QuickForm 
                title="" 
                subtitle=""
              />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    Бесплатно
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    Без обязательств
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Добавляем CSS для анимации blob */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero; 