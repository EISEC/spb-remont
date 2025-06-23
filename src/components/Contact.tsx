'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/validations';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log('Contact form data:', data);
      // Здесь будет отправка данных на сервер
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка при отправке сообщения. Попробуйте еще раз.');
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Телефон',
      details: '+7 (953) 371-34-17',
      description: 'Звонок бесплатный',
      action: 'tel:+79533713417'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@spbremontotdelka.ru',
      description: 'Ответим в течение часа',
      action: 'mailto:info@spbremontotdelka.ru'
    },
    {
      icon: MapPin,
      title: 'Адрес',
      details: 'Санкт-Петербург',
      description: 'Работаем по всему городу',
      action: null
    },
    {
      icon: Clock,
      title: 'Режим работы',
      details: 'Пн-Вс: 9:00 - 20:00',
      description: 'Без выходных',
      action: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
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
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Готовы обсудить ваш проект? Оставьте заявку или позвоните нам. 
            Предоставим бесплатную консультацию и составим смету.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Левая колонка - контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Контактная информация
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    {item.action ? (
                      <a
                        href={item.action}
                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
                        {item.details}
                      </a>
                    ) : (
                      <div className="text-gray-900 font-medium">{item.details}</div>
                    )}
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Социальные сети */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-gray-900 mb-4">Мы в социальных сетях</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  VK
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors cursor-pointer"
                >
                  YT
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  TG
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Правая колонка - форма */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-6">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Написать нам
              </h3>
              <p className="text-gray-600">
                Опишите ваш проект и мы свяжемся с вами
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    placeholder="Введите ваше имя"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Номер телефона *
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    placeholder="+7 (___) ___-__-__"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email (необязательно)
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Сообщение
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  placeholder="Опишите ваш проект: тип помещения, площадь, желаемые сроки..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? 'Отправляем...' : 'Отправить сообщение'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="#" className="text-blue-600 hover:underline cursor-pointer">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </motion.div>
        </div>

        {/* Карта */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Мы работаем по всему Санкт-Петербургу
          </h3>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Здесь будет интерактивная карта Санкт-Петербурга
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Выезжаем во все районы города
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 