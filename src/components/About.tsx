'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock, Shield, CheckCircle } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '15+', label: 'Лет на рынке', icon: Clock },
    { number: '500+', label: 'Завершенных проектов', icon: Award },
    { number: '50+', label: 'Специалистов', icon: Users },
    { number: '100%', label: 'Гарантия качества', icon: Shield }
  ];

  const advantages = [
    'Работаем по договору с фиксированными ценами',
    'Предоставляем гарантию на все виды работ',
    'Используем только качественные материалы',
    'Соблюдаем сроки выполнения работ',
    'Убираем за собой после завершения',
    'Предоставляем полную отчетность'
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            О компании АМСТРОЙ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы - команда профессионалов с многолетним опытом в сфере ремонта и строительства. 
            Каждый проект выполняем с душой и гарантируем качество результата.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Почему выбирают нас?
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Компания АМСТРОЙ работает на рынке ремонтно-строительных услуг уже более 15 лет. 
              За это время мы завоевали доверие сотен клиентов благодаря профессиональному подходу, 
              качественным материалам и соблюдению сроков.
            </p>

            <div className="space-y-4">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{advantage}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Команда АМСТРОЙ"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="text-xl font-bold mb-2">Наша команда</h4>
                <p className="text-white/90">
                  Профессионалы своего дела с многолетним опытом
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 