import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Tag, Phone } from 'lucide-react';
import { getWordPressPosts, getPopularWordPressPosts } from '@/lib/wordpress-api';
import PageLayout from '@/components/layouts/PageLayout';
import BlogSearch from '@/components/BlogSearch';
import BlogImage from '@/components/BlogImage';
import type { BlogPost } from '@/types';

export const metadata = {
  title: 'Блог о ремонте и дизайне интерьера - АМСТРОЙ | Полезные советы',
  description: 'Полезные статьи о ремонте квартир, дизайне интерьера, строительных материалах и технологиях. Советы от профессионалов в сфере ремонта.',
  keywords: 'блог о ремонте, дизайн интерьера статьи, советы по ремонту, строительные материалы, ремонт своими руками',
};

export default async function BlogPage({ searchParams }: { searchParams?: URLSearchParams }) {
  const page = Number(searchParams?.get?.('page') ?? 1) || 1;
  const perPage = 6;
  const blogData = await getWordPressPosts({ perPage, page });
  const posts: BlogPost[] = blogData.posts;
  const totalPages = blogData.totalPages;
  const popularPosts: BlogPost[] = await getPopularWordPressPosts(4);

  return (
    <PageLayout>
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
            <div className="max-w-2xl mx-auto">
              <BlogSearch placeholder="Поиск по статьям..." />
            </div>
          </div>
        </div>
      </section>

      {/* Список статей */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Статьи не найдены
                </h3>
                <p className="text-gray-600">
                  В данный момент статьи блога недоступны. Попробуйте позже.
                </p>
              </div>
            ) : (
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Основной контент */}
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                    <article key={post.slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <BlogImage
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
                          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
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
                              {post.tags.slice(0, 3).map((tag: string) => (
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
                  {/* Пагинация */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-12 gap-2">
                      <Link
                        href={`?page=${page - 1}`}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium ${page === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
                        aria-disabled={page === 1}
                      >
                        Назад
                      </Link>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <Link
                          key={i}
                          href={`?page=${i + 1}`}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium ${page === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-100'}`}
                        >
                          {i + 1}
                        </Link>
                      ))}
                      <Link
                        href={`?page=${page + 1}`}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium ${page === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
                        aria-disabled={page === totalPages}
                      >
                        Вперёд
                      </Link>
                  </div>
                  )}
              </div>

              {/* Боковая панель */}
                <aside className="lg:col-span-1 space-y-8">
                  {/* Популярные статьи */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Популярные статьи
                    </h3>
                    <div className="space-y-4">
                      {popularPosts.map((post) => (
                        <div key={post.slug} className="flex space-x-3">
                          <BlogImage
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
                  
                  {/* О компании */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">О компании</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      АМСТРОЙ — профессиональный ремонт и отделка в Санкт-Петербурге. Более 10 лет опыта, гарантия на все работы, честные цены и индивидуальный подход.
                    </p>
                    <Link href="/about" className="text-blue-600 hover:text-blue-700 text-sm font-medium underline">Подробнее о нас</Link>
                  </div>

                  {/* Быстрые контакты */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Контакты</h3>
                    <div className="space-y-2 text-sm">
                      <a href="tel:+79533713417" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                        <Phone className="w-4 h-4" /> +7 (953) 371-34-17
                      </a>
                      <a href="mailto:info@spbremontotdelka.ru" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /><path d="M22 6l-10 7L2 6" /></svg> info@spbremontotdelka.ru
                      </a>
                      <a href="https://t.me/spbremontotdelka" target="_blank" rel="noopener" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 3L3 10.53l5.18 2.06L19 6.5l-7.5 7.5v4l3-2.5" /></svg> Telegram
                      </a>
                      <a href="https://wa.me/79533713417" target="_blank" rel="noopener" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16.72 15.85c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.29-1 1.01-1 2.46 0 1.45 1.03 2.85 1.18 3.05.15.19 2.03 3.1 5.02 4.23.7.24 1.24.38 1.67.48.7.15 1.34.13 1.85.08.56-.06 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.11-.26-.18-.55-.33z" /></svg> WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* CTA Задать вопрос */}
                  <div className="bg-blue-600 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Остались вопросы?</h3>
                    <p className="text-blue-100 text-sm mb-4">Наши эксперты помогут вам с любым вопросом по ремонту и отделке.</p>
                    <Link
                      href="/#contact"
                      className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors inline-block"
                    >
                      Задать вопрос
                    </Link>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 