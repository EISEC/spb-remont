'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Building, 
  Palette, 
  Wrench, 
  Zap, 
  Droplets,
  Brush,
  HardHat,
  ArrowRight
} from 'lucide-react';
import { useModal } from './ModalProvider';
import QuickForm from './forms/QuickForm';

const Services = () => {
  const { openModal } = useModal();

  const handleLearnMore = (serviceType: string) => {
    openModal(<QuickForm title={`Узнать подробнее о ${serviceType}`} subtitle="Оставьте заявку и получите подробную информацию об услуге" />);
  };

  const handleGetConsultation = () => {
    openModal(<QuickForm title="Получить консультацию" subtitle="Опишите ваши потребности и получите профессиональную консультацию" />);
  };
  const repairTypes = [
    {
      title: 'Ремонт класса "Эконом"',
      description: 'Качественный косметический ремонт по доступной цене',
      price: 'от 15 000 ₽/м²',
      features: ['Косметический ремонт', 'Базовые материалы', 'Быстрые сроки'],
      icon: Home,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Ремонт класса "Стандарт"',
      description: 'Комплексный ремонт с качественными материалами',
      price: 'от 25 000 ₽/м²',
      features: ['Полный ремонт', 'Качественные материалы', 'Дизайн-проект'],
      icon: Building,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Ремонт класса "Люкс"',
      description: 'Премиальный ремонт с эксклюзивными материалами',
      price: 'от 45 000 ₽/м²',
      features: ['Премиум материалы', 'Авторский дизайн', 'VIP сервис'],
      icon: HardHat,
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  const additionalServices = [
    {
      title: 'Дизайн помещений',
      description: 'Создание уникального дизайн-проекта',
      icon: Palette,
      color: 'text-pink-600'
    },
    {
      title: 'Сантехнические работы',
      description: 'Установка и замена сантехники',
      icon: Droplets,
      color: 'text-blue-600'
    },
    {
      title: 'Электромонтажные работы',
      description: 'Монтаж электрики и освещения',
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      title: 'Малярные работы',
      description: 'Покраска стен и потолков',
      icon: Brush,
      color: 'text-green-600'
    },
    {
      title: 'Отделочные работы',
      description: 'Укладка плитки, ламината, обоев',
      icon: Wrench,
      color: 'text-gray-600'
    },
    {
      title: 'Ремонт офисов',
      description: 'Корпоративный ремонт любой сложности',
      icon: Building,
      color: 'text-indigo-600'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Наши услуги
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Предоставляем полный спектр услуг по ремонту и отделке. 
            От косметического до VIP-ремонта любой сложности.
          </p>
        </motion.div>

        {/* Основные типы ремонта */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {repairTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              <div className={`h-2 bg-gradient-to-r ${type.gradient}`}></div>
              
              <div className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${type.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {type.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>

                <div className="text-3xl font-bold text-blue-600 mb-6">
                  {type.price}
                </div>

                <ul className="space-y-3 mb-8">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleLearnMore(type.title)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center group cursor-pointer"
                >
                  Узнать подробнее
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Дополнительные услуги */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Дополнительные услуги
          </h3>
          <p className="text-lg text-gray-600">
            Полный спектр строительно-отделочных работ
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Не нашли нужную услугу?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Мы выполняем любые виды ремонтно-строительных работ. 
            Звоните для консультации!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+79533713417"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              +7 (953) 371-34-17
            </a>
            <button 
              onClick={handleGetConsultation}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 cursor-pointer"
            >
              Получить консультацию
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 