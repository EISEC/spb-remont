import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { 
  getWordPressPostBySlug, 
  getWordPressPosts,
  getRelatedWordPressPosts, 
  generateBlogStaticParams 
} from '@/lib/wordpress-api';
import { SERVICES } from '@/lib/constants';
import { getSlugFromParams, type SlugPageProps } from '@/lib/params';
import { BlogPost } from '@/types';
import PageLayout from '@/components/layouts/PageLayout';
import AdBanner from '@/components/ui/AdBanner';
import BlogImage from '@/components/BlogImage';
import TableOfContents from '@/components/TableOfContents';

export async function generateStaticParams() {
  try {
    return await generateBlogStaticParams();
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: SlugPageProps) {
  const slug = await getSlugFromParams(params);
  const post = await getWordPressPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Статья не найдена - АМСТРОЙ',
      description: 'Запрашиваемая статья не найдена.',
    };
  }

  return {
    title: `${post.title} - АМСТРОЙ`,
    description: post.excerpt,
    keywords: `${post.tags.join(', ')}, ремонт спб, ${post.category.toLowerCase()}`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

const BlogPostContent = async ({ params }: SlugPageProps) => {
  const slug = await getSlugFromParams(params);
  const post = await getWordPressPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Получаем связанные услуги
  const relatedServices = Object.values(SERVICES)
    .filter(service => 
      post.tags.some(tag => service.title.toLowerCase().includes(tag.toLowerCase())) ||
      service.title.toLowerCase().includes(post.title.toLowerCase().split(' ')[0])
    )
    .slice(0, 2);

  // Получаем связанные статьи
  let relatedPosts: BlogPost[] = [];
  try {
    // Сначала пытаемся получить связанные посты без категорий (просто последние посты, исключая текущий)
    relatedPosts = await getRelatedWordPressPosts(post.id, [], 3);
    
         // Если не получилось, попробуем получить просто последние посты
     if (relatedPosts.length === 0) {
       const { posts: latestPosts } = await getWordPressPosts({ perPage: 4 });
       relatedPosts = latestPosts.filter((p: BlogPost) => p.id !== post.id).slice(0, 3);
     }
   } catch (error) {
     console.error('Error fetching related posts:', error);
     // В случае ошибки пытаемся получить просто последние посты
     try {
       const { posts: latestPosts } = await getWordPressPosts({ perPage: 4 });
       relatedPosts = latestPosts.filter((p: BlogPost) => p.id !== post.id).slice(0, 3);
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      relatedPosts = [];
    }
  }

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
                  <BlogImage
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-96 object-cover rounded-xl"
                    priority={true}
                  />
                </div>

                {/* Рекламный блок */}
                <div className="mb-8">
                  <AdBanner type="horizontal" />
                </div>

                {/* Содержание статьи */}
                <TableOfContents content={post.content} className="mb-8" />

                {/* Контент статьи */}
                <div className="prose prose-lg max-w-none mb-12">
                  <div 
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>

                {/* Теги */}
                {post.tags.length > 0 && (
                  <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Tag className="w-5 h-5 mr-2 text-blue-600" />
                      Теги статьи
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:border-blue-400 hover:text-blue-700 hover:shadow-md transition-all duration-200 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                      Нажмите на тег, чтобы найти похожие статьи
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
                  
                  {/* Связанные статьи */}
                  {relatedPosts.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Похожие статьи
                    </h3>
                    <div className="space-y-4">
                                                 {relatedPosts.map((relatedPost) => (
                           <div key={relatedPost.slug} className="flex space-x-3">
                             <BlogImage
                               src={relatedPost.image} 
                               alt={relatedPost.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div>
                            <Link 
                                href={`/blog/${relatedPost.slug}`}
                              className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                            >
                                {relatedPost.title}
                            </Link>
                            <div className="text-xs text-gray-500 mt-1">
                                {new Date(relatedPost.date).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  )}
                  
                  {/* Наши услуги */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Нужен ремонт?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Профессиональный ремонт квартир в Санкт-Петербурге. Качество, надежность, гарантия.
                    </p>
                    <div className="space-y-2">
                      <Link 
                        href="/calculator"
                        className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                      >
                        Рассчитать стоимость
                      </Link>
                    <Link
                      href="/services"
                        className="block w-full bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors text-center"
                    >
                      Наши услуги
                    </Link>
                    </div>
                  </div>

                  {/* Контакты */}
                  <div className="bg-gray-900 text-white rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">
                      Остались вопросы?
                    </h3>
                    <p className="text-sm text-gray-300 mb-4">
                      Получите бесплатную консультацию наших специалистов
                    </p>
                    <a 
                      href="tel:+79533713417"
                      className="block w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors text-center"
                    >
                      📞 +7 (953) 371-34-17
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
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