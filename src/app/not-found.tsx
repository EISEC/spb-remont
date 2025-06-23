import React from 'react';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export const metadata = {
  title: 'Страница не найдена - АМСТРОЙ',
  description: 'Запрашиваемая страница не найдена. Вернитесь на главную или выберите нужный раздел.',
};

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Страница не найдена
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
        </div>

        {/* Навигация */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            На главную
          </Link>
          
          <Link
            href="/services"
            className="flex items-center justify-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            Наши услуги
          </Link>
        </div>

        {/* Популярные разделы */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Популярные разделы
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/services/remont-ekonom"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Ремонт &quot;Эконом&quot;
            </Link>
            <Link
              href="/services/remont-standart"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Ремонт &quot;Стандарт&quot;
            </Link>
            <Link
              href="/services/remont-lux"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Ремонт &quot;Люкс&quot;
            </Link>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Блог
            </Link>
          </div>
        </div>

        {/* Контакты */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Нужна помощь? Свяжитесь с нами:
          </p>
          <a
            href="tel:+79533713417"
            className="text-blue-600 hover:text-blue-700 font-medium text-lg"
          >
            +7 (953) 371-34-17
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 