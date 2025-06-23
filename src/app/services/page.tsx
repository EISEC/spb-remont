import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import PageLayout from '@/components/layouts/PageLayout';

export const metadata = {
  title: 'Услуги ремонта и отделки в СПб - АМСТРОЙ | Все виды работ',
  description: 'Полный спектр услуг по ремонту и отделке квартир в Санкт-Петербурге. Косметический, капитальный ремонт, дизайн, электрика, сантехника. Гарантия качества.',
  keywords: 'услуги ремонта, отделка квартир спб, капитальный ремонт, косметический ремонт, дизайн интерьера',
};

const ServicesPageContent = () => {
  const servicesArray = Object.values(SERVICES);

  return (
    <>
      {/* Breadcrumbs */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-700">Главная</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Услуги</span>
          </nav>
        </div>
      </section>

      {/* Hero секция */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Услуги ремонта и отделки
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Полный спектр работ по ремонту и отделке помещений в Санкт-Петербурге. 
              От косметического ремонта до VIP-отделки представительского класса.
            </p>
          </div>
        </div>
      </section>

      {/* Список услуг */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {servicesArray.map((service) => (
                <div 
                  key={service.slug} 
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {service.price}
                      </div>
                      <div className="text-sm text-gray-600">
                        Стоимость от
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center mb-1">
                        <Clock className="w-4 h-4 text-green-600 mr-2" />
                        <span className="font-bold text-green-600">
                          {service.duration}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Сроки работ
                      </div>
                    </div>
                  </div>

                  {/* Что входит в услугу (первые 4 пункта) */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Что входит:</h3>
                    <div className="space-y-2">
                      {service.workTypes.slice(0, 4).map((workType, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{workType}</span>
                        </div>
                      ))}
                      {service.workTypes.length > 4 && (
                        <div className="text-sm text-gray-500">
                          +{service.workTypes.length - 4} дополнительных услуг
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Подробнее об услуге
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Готовы начать ремонт?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Получите бесплатную консультацию и расчет стоимости работ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+79533713417"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Позвонить: +7 (953) 371-34-17
              </a>
              <Link
                href="/#contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ServicesPage = () => {
  return (
    <PageLayout>
      <ServicesPageContent />
    </PageLayout>
  );
};

export default ServicesPage; 