'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useModal } from './ModalProvider';
import QuickForm from './forms/QuickForm';

const Reviews = () => {
  const { openModal } = useModal();

  const handleGetConsultation = () => {
    openModal(<QuickForm title="Получить консультацию" subtitle="Оставьте заявку и получите бесплатную консультацию по вашему проекту" />);
  };

  const reviews = [
    {
      id: 1,
      name: 'Анна Петрова',
      location: 'ЖК "Северная долина"',
      rating: 5,
      text: 'Отличная команда! Сделали ремонт квартиры точно в срок. Качество работ на высшем уровне, все аккуратно и профессионально. Рекомендую!',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '2 месяца назад'
    },
    {
      id: 2,
      name: 'Михаил Сергеев',
      location: 'Центральный район',
      rating: 5,
      text: 'Делали ремонт офиса. Работали быстро, качественно, без задержек. Цены адекватные, результат превзошел ожидания. Спасибо!',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '1 месяц назад'
    },
    {
      id: 3,
      name: 'Елена Козлова',
      location: 'Приморский район',
      rating: 5,
      text: 'Очень довольна работой АМСТРОЙ! Сделали ремонт ванной комнаты и кухни. Все материалы качественные, работники вежливые и аккуратные.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '3 недели назад'
    },
    {
      id: 4,
      name: 'Дмитрий Волков',
      location: 'Василеостровский район',
      rating: 5,
      text: 'Капитальный ремонт дома под ключ. Работали 4 месяца, все четко по графику. Качество отличное, цена справедливая. Очень рекомендую эту компанию!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '1 неделю назад'
    },
    {
      id: 5,
      name: 'Ольга Смирнова',
      location: 'Фрунзенский район',
      rating: 5,
      text: 'Делали ремонт детской комнаты. Подошли к работе с пониманием, учли все наши пожелания. Дочка в восторге от результата!',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '2 недели назад'
    },
    {
      id: 6,
      name: 'Александр Новиков',
      location: 'Красногвардейский район',
      rating: 5,
      text: 'Ремонт квартиры в новостройке. Команда профессиональная, все делают быстро и качественно. Цены честные, никаких скрытых доплат.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      date: '5 дней назад'
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-gray-50">
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
            Отзывы клиентов
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Более 500 довольных клиентов доверили нам ремонт своих квартир и офисов. 
            Читайте их отзывы о нашей работе.
          </p>

          {/* Статистика */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-3xl md:text-4xl font-bold text-blue-600 mr-2">4.9</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-gray-600">Средний рейтинг</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Выполненных проектов</div>
            </div>
          </div>
        </motion.div>

        {/* Отзывы */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Верхняя часть с рейтингом */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-200" />
              </div>

              {/* Текст отзыва */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {review.text}
              </p>

              {/* Информация о клиенте */}
              <div className="flex items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.location}</div>
                  <div className="text-xs text-gray-400">{review.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Призыв к действию */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Хотите присоединиться к довольным клиентам?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Оставьте заявку и получите бесплатную консультацию по вашему проекту
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetConsultation}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Получить консультацию
              </button>
              <a
                href="tel:+79533713417"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 cursor-pointer"
              >
                +7 (953) 371-34-17
              </a>
            </div>
          </div>
        </motion.div>

        {/* Ссылки на внешние отзывы */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 mb-4">Больше отзывов на внешних платформах:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-6 h-6 bg-yellow-500 rounded mr-2"></div>
              Яндекс.Отзывы
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
              Google Reviews
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-6 h-6 bg-orange-500 rounded mr-2"></div>
              Авито
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews; 