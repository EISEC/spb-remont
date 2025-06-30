import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { getSlugFromParams, type SlugPageProps } from '@/lib/params';
import PageLayout from '@/components/layouts/PageLayout';
import { getWordPressPosts } from '@/lib/wordpress-api';
import { BlogPost } from '@/types';

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: SlugPageProps) {
  const slug = await getSlugFromParams(params);
  const service = SERVICES[slug as keyof typeof SERVICES];
  
  if (!service) {
    return {
      title: 'Услуга не найдена',
    };
  }

  return {
    title: `${service.title} в СПб - АМСТРОЙ | ${service.price}`,
    description: `${service.detailedDescription} Качественно и с гарантией. Звоните: +7 (953) 371-34-17`,
    keywords: `${service.title.toLowerCase()}, ремонт спб, ${service.slug}, цена ${service.price}`
  };
}

const ServicePageContent = async ({ params }: SlugPageProps) => {
  const slug = await getSlugFromParams(params);
  const service = SERVICES[slug as keyof typeof SERVICES];
  
  if (!service) {
    notFound();
  }

  // Получаем связанные услуги (исключаем текущую)
  const relatedServices = Object.values(SERVICES)
    .filter(s => s.slug !== service.slug)
    .slice(0, 3);

  // Получаем связанные статьи блога через API
  let relatedPosts: BlogPost[] = [];
  try {
    const { posts } = await getWordPressPosts({
      perPage: 2,
      search: service.title.split(' ')[0] // ищем по ключевому слову из названия услуги
    });
    relatedPosts = posts;
  } catch (e) {
    relatedPosts = [];
  }

  return (
    <>
      {/* Breadcrumbs */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-700">Главная</Link>
            <span className="text-gray-400">/</span>
            <Link href="/services" className="text-blue-600 hover:text-blue-700">Услуги</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">{service.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero секция услуги */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/services"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к услугам
            </Link>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {service.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {service.detailedDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Стоимость работ</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{service.price}</div>
                    <p className="text-sm text-gray-600">Точная стоимость рассчитывается после осмотра объекта</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Сроки выполнения</h3>
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-xl font-bold text-green-600">{service.duration}</span>
                    </div>
                    <p className="text-sm text-gray-600">В зависимости от объема работ</p>
                  </div>
                </div>

                {/* Что входит в услугу */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Что входит в услугу</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.workTypes.map((workType, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{workType}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Преимущества */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Преимущества</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Боковая панель с формой заказа */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Заказать {service.title.toLowerCase()}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Получите бесплатную консультацию и расчет стоимости
                  </p>
                  
                  <div className="space-y-4">
                    <a
                      href="tel:+79533713417"
                      className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Позвонить сейчас
                    </a>
                    
                    <Link
                      href="/#contact"
                      className="w-full border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center block"
                    >
                      Оставить заявку
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center text-sm text-gray-500">
                      <div className="font-medium mb-1">Время работы:</div>
                      <div>Пн-Вс: 9:00 - 20:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Связанные услуги */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Другие наши услуги
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedServices.map((relatedService) => (
                  <div key={relatedService.slug} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {relatedService.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {relatedService.description}
                    </p>
                    <div className="text-xl font-bold text-blue-600 mb-4">
                      {relatedService.price}
                    </div>
                    <Link
                      href={`/services/${relatedService.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Подробнее
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Связанные статьи блога */}
      {relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Полезные статьи по теме
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                  <div key={post.slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 mt-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Читать статью
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Все статьи блога
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const ServicePage = async (props: SlugPageProps) => {
  return (
    <PageLayout>
      <ServicePageContent {...props} />
    </PageLayout>
  );
};

export default ServicePage; 