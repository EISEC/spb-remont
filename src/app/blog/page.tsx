import React from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/constants';
import PageLayout from '@/components/layouts/PageLayout';
import AdBanner from '@/components/ui/AdBanner';

export const metadata = {
  title: 'Блог о ремонте и дизайне интерьера - АМСТРОЙ | Полезные советы',
  description: 'Полезные статьи о ремонте квартир, дизайне интерьера, строительных материалах и технологиях. Советы от профессионалов в сфере ремонта.',
  keywords: 'блог о ремонте, дизайн интерьера статьи, советы по ремонту, строительные материалы, ремонт своими руками',
};

const BlogPageContent = () => {
  const categories = Array.from(new Set(BLOG_POSTS.map(post => post.category)));

  return (
    <>
      {/* Breadcrumbs */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-700">Главная</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Блог</span>
          </nav>
        </div>
      </section>

      {/* Hero секция */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Блог о ремонте и дизайне
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Полезные статьи, советы экспертов и актуальные тренды в мире ремонта и дизайна интерьера
            </p>
            
            {/* Поиск */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по статьям..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                Все статьи
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className="bg-white text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Список статей */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Основной контент */}
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 gap-8">
                  {BLOG_POSTS.map((post) => (
                    <article key={post.slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString('ru-RU')}
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            Читать
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                        
                        {/* Теги */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                            <Tag className="w-4 h-4 text-gray-400" />
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
                
                {/* Пагинация (заглушка) */}
                <div className="flex justify-center items-center space-x-4 mt-12">
                  <button className="px-4 py-2 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50">
                    Предыдущая
                  </button>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                    <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">2</button>
                    <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">3</button>
                  </div>
                  <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                    Следующая
                  </button>
                </div>
              </div>

              {/* Боковая панель */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  {/* Реклама */}
                  <AdBanner type="vertical" />
                  
                  {/* Популярные статьи */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Популярные статьи
                    </h3>
                    <div className="space-y-4">
                      {BLOG_POSTS.slice(0, 3).map((post) => (
                        <div key={post.slug} className="flex space-x-3">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div>
                            <Link 
                              href={`/blog/${post.slug}`}
                              className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                            >
                              {post.title}
                            </Link>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(post.date).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Наши услуги */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Наши услуги
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Профессиональный ремонт квартир в Санкт-Петербурге
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Узнать больше
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>

                  {/* Еще одна реклама */}
                  <AdBanner type="square" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const BlogPage = () => {
  return (
    <PageLayout>
      <BlogPageContent />
    </PageLayout>
  );
};

export default BlogPage; 