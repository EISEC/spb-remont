import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Страница не найдена - АМСТРОЙ',
  description: 'Запрашиваемая страница не найдена. Вернитесь на главную или воспользуйтесь навигацией.',
};

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-8xl font-bold text-blue-600 mb-8">404</div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Страница не найдена
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                К сожалению, запрашиваемая страница не существует или была перемещена. 
                Возможно, вы перешли по устаревшей ссылке.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  На главную
                </Link>
                
                <Link
                  href="/blog"
                  className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Блог
                </Link>
                
                <Link
                  href="/services"
                  className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Услуги
                </Link>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Популярные разделы
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/services/remont-ekonom" className="text-blue-600 hover:text-blue-700 text-left">
                    Ремонт класса "Эконом"
                  </Link>
                  <Link href="/services/remont-standart" className="text-blue-600 hover:text-blue-700 text-left">
                    Ремонт класса "Стандарт"
                  </Link>
                  <Link href="/services/remont-lux" className="text-blue-600 hover:text-blue-700 text-left">
                    Ремонт класса "Люкс"
                  </Link>
                  <Link href="/services/dizayn-pomeshcheniy" className="text-blue-600 hover:text-blue-700 text-left">
                    Дизайн помещений
                  </Link>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-500 mb-4">
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage; 