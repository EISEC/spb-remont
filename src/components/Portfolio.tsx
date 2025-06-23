'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowRight } from 'lucide-react';
import { useModal } from './ModalProvider';
import QuickForm from './forms/QuickForm';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { openModal } = useModal();

  const handleShowAllWorks = () => {
    openModal(<QuickForm title="Показать все работы" subtitle="Оставьте контакт и мы вышлем вам полное портфолио" />);
  };

  const handleScheduleMeeting = () => {
    openModal(<QuickForm title="Записаться на встречу" subtitle="Запишитесь на встречу в нашем офисе для просмотра работ" />);
  };

  const filters = [
    { id: 'all', label: 'Все работы' },
    { id: 'apartment', label: 'Квартиры' },
    { id: 'kitchen', label: 'Кухни' },
    { id: 'bathroom', label: 'Ванные' },
    { id: 'office', label: 'Офисы' }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Современная квартира в ЖК "Северная долина"',
      category: 'apartment',
      area: '85 м²',
      duration: '2 месяца',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Полный ремонт 3-комнатной квартиры в современном стиле'
    },
    {
      id: 2,
      title: 'Элитная кухня в классическом стиле',
      category: 'kitchen',
      area: '25 м²',
      duration: '3 недели',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Эксклюзивная кухня с мраморными столешницами'
    },
    {
      id: 3,
      title: 'Роскошная ванная комната',
      category: 'bathroom',
      area: '12 м²',
      duration: '4 недели',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Ванная комната с итальянской плиткой и дизайнерской сантехникой'
    },
    {
      id: 4,
      title: 'Офис IT-компании',
      category: 'office',
      area: '200 м²',
      duration: '1.5 месяца',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Современный офис с open space и переговорными'
    },
    {
      id: 5,
      title: 'Двухуровневая квартира',
      category: 'apartment',
      area: '120 м²',
      duration: '3 месяца',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Эксклюзивный дизайн двухуровневой квартиры с лестницей'
    },
    {
      id: 6,
      title: 'Минималистичная кухня',
      category: 'kitchen',
      area: '18 м²',
      duration: '2 недели',
      image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Современная кухня в стиле минимализм'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-white">
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
            Наши работы
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Более 500 завершенных проектов в Санкт-Петербурге. 
            Каждый ремонт выполнен с гарантией качества.
          </p>

          {/* Фильтры */}
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Галерея работ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                      <Eye className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {item.area}
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {item.duration}
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center group cursor-pointer">
                    Смотреть проект
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Хотите увидеть больше работ?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Приезжайте в наш офис или запросите полное портфолио
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleShowAllWorks}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 cursor-pointer"
            >
              Показать все работы
            </button>
            <button 
              onClick={handleScheduleMeeting}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
            >
              Записаться на встречу
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio; 