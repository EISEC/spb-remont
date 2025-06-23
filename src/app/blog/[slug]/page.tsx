import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, SERVICES } from '@/lib/constants';
import { getSlugFromParams, type SlugPageProps } from '@/lib/params';
import PageLayout from '@/components/layouts/PageLayout';
import AdBanner from '@/components/ui/AdBanner';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: SlugPageProps) {
  const slug = await getSlugFromParams(params);
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Статья не найдена',
    };
  }

  return {
    title: `${post.title} - АМСТРОЙ`,
    description: post.excerpt,
    keywords: `${post.tags.join(', ')}, ремонт спб, ${post.category.toLowerCase()}`
  };
}

const BlogPostContent = async ({ params }: SlugPageProps) => {
  const slug = await getSlugFromParams(params);
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  // Получаем связанные услуги
  const relatedServices = Object.values(SERVICES)
    .filter(service => 
      post.tags.some(tag => service.title.toLowerCase().includes(tag)) ||
      service.title.toLowerCase().includes(post.title.toLowerCase().split(' ')[0])
    )
    .slice(0, 2);

  // Получаем связанные статьи (исключаем текущую)
  const relatedPosts = BLOG_POSTS
    .filter(p => p.slug !== post.slug && (
      p.category === post.category ||
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumbs */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-700">Главная</Link>
            <span className="text-gray-400">/</span>
            <Link href="/blog" className="text-blue-600 hover:text-blue-700">Блог</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Статья */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Основной контент */}
              <div className="lg:col-span-3">
                <Link 
                  href="/blog"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к блогу
                </Link>

                {/* Заголовок и мета */}
                <div className="mb-8">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-4">
                    {post.title}
                  </h1>
                  
                  <div className="flex items-center space-x-6 text-gray-500 text-sm mb-6">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(post.date).toLocaleDateString('ru-RU')}
                    </div>
                    <div className="text-blue-600">
                      {post.readTime}
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Изображение */}
                <div className="mb-8">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-96 object-cover rounded-xl"
                  />
                </div>

                {/* Рекламный блок */}
                <div className="mb-8">
                  <AdBanner type="horizontal" />
                </div>

                {/* Контент статьи */}
                <div className="prose prose-lg max-w-none mb-12">
                  <div className="text-gray-700 leading-relaxed space-y-6">
                    {post.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Теги */}
                {post.tags.length > 0 && (
                  <div className="mb-12 p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Tag className="w-5 h-5 mr-2" />
                      Теги статьи
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm border border-gray-200 hover:border-blue-300 hover:text-blue-700 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Связанные услуги */}
                {relatedServices.length > 0 && (
                  <div className="mb-12 p-6 bg-blue-50 rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Связанные услуги
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {relatedServices.map((service) => (
                        <div key={service.slug} className="bg-white rounded-lg p-4 border border-blue-100">
                          <h4 className="font-bold text-gray-900 mb-2">
                            {service.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-600 font-bold">
                              {service.price}
                            </span>
                            <Link
                              href={`/services/${service.slug}`}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Подробнее →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                      {BLOG_POSTS.slice(0, 3).map((popularPost) => (
                        <div key={popularPost.slug} className="flex space-x-3">
                          <img 
                            src={popularPost.image} 
                            alt={popularPost.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div>
                            <Link 
                              href={`/blog/${popularPost.slug}`}
                              className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                            >
                              {popularPost.title}
                            </Link>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(popularPost.date).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Наши услуги */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Нужен ремонт?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Профессиональный ремонт квартир в Санкт-Петербурге
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full justify-center"
                    >
                      Наши услуги
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>

                  {/* Квадратная реклама */}
                  <AdBanner type="square" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Связанные статьи */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Читайте также
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <span className="text-sm text-blue-600 font-medium">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 mt-1">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Читать статью
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </article>
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

const BlogPostPage = async (props: SlugPageProps) => {
  return (
    <PageLayout>
      <BlogPostContent {...props} />
    </PageLayout>
  );
};

export default BlogPostPage; 