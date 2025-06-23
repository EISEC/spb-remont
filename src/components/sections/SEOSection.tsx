'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Wrench, Home, Sparkles } from 'lucide-react';

const SEOSection = () => {
  const serviceTypes = [
    {
      title: 'Ремонт класса «Эконом»',
      description: 'Доступный ремонт с качественными материалами',
      icon: Home
    },
    {
      title: 'Ремонт класса «Стандарт»',
      description: 'Оптимальное сочетание цены и качества',
      icon: Wrench
    },
    {
      title: 'Ремонт класса «Люкс»',
      description: 'Премиальные материалы и эксклюзивный дизайн',
      icon: Sparkles
    },
    {
      title: 'Коммерческие помещения',
      description: 'Офисы, магазины, рестораны и кафе',
      icon: Building2
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ремонт квартир в любом районе Санкт-Петербурга
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Наша компания позволяет каждому клиенту подобрать именно тот вариант ремонта квартиры, который ему нужен. 
            От выбранного типа ремонта зависит уровень работ и сметная стоимость. Мы выполняем полный комплекс 
            ремонтно-строительных и отделочных работ на самом высоком уровне качества.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceTypes.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Профессиональный подход к каждому проекту
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Обратившись к нам, вы получаете разумную смету, высокое качество обслуживания, 
              оперативность и профессиональную работу. Мы готовы выполнить как косметический ремонт квартир, 
              так и комплексный VIP-ремонт апартаментов представительского класса. 
              Реализуем проекты любой сложности с полным соблюдением технологий.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SEOSection; 