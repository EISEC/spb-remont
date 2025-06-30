import { 
  WordPressPost, 
  WordPressCategory, 
  WordPressTag,
  BlogPost, 
  BlogApiResponse, 
  BlogSearchParams 
} from '@/types';

// Базовый URL для WordPress REST API
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://spbremontotdelka.ru/wp-json/wp/v2';

// Кэш для категорий и тегов
let categoriesCache: WordPressCategory[] = [];
let tagsCache: WordPressTag[] = [];

/**
 * Получение всех постов блога с пагинацией
 */
export async function getWordPressPosts(params: BlogSearchParams = {}): Promise<BlogApiResponse> {
  const {
    page = 1,
    perPage = 10,
    search = '',
    categories = [],
    tags = [],
    orderBy = 'date',
    order = 'desc'
  } = params;

  try {
    // Строим URL с параметрами
    const searchParams = new URLSearchParams({
      _embed: 'true',
      page: page.toString(),
      per_page: perPage.toString(),
      orderby: orderBy,
      order: order
    });

    if (search) {
      searchParams.append('search', search);
    }

    if (categories.length > 0) {
      searchParams.append('categories', categories.join(','));
    }

    if (tags.length > 0) {
      searchParams.append('tags', tags.join(','));
    }

    const response = await fetch(`${WORDPRESS_API_URL}/posts?${searchParams.toString()}`, {
      next: { revalidate: 3600 }, // Кэшируем на час
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const wpPosts: WordPressPost[] = await response.json();
    
    // Получаем метаданные пагинации из заголовков
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');

    // Трансформируем посты
    const posts = await Promise.all(wpPosts.map(transformWordPressPost));

    return {
      posts,
      totalPages,
      totalPosts,
      currentPage: page
    };

  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    
    // Возвращаем пустой результат при ошибке
    return {
      posts: [],
      totalPages: 0,
      totalPosts: 0,
      currentPage: 1
    };
  }
}

/**
 * Получение поста по slug
 */
export async function getWordPressPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?_embed&slug=${slug}`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const wpPosts: WordPressPost[] = await response.json();
    
    if (wpPosts.length === 0) {
      return null;
    }

    return transformWordPressPost(wpPosts[0]);

  } catch (error) {
    console.error(`Error fetching WordPress post by slug "${slug}":`, error);
    return null;
  }
}

/**
 * Получение популярных постов
 */
export async function getPopularWordPressPosts(limit: number = 5): Promise<BlogPost[]> {
  try {
    // Используем сортировку по дате (последние статьи)
    const response = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=${limit}&orderby=date&order=desc`, {
      next: { revalidate: 7200 },
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      // Fallback: если ошибка 400, пробуем без orderby
      if (response.status === 400) {
        const fallbackResp = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=${limit}`, {
          next: { revalidate: 7200 },
          headers: { 'Accept': 'application/json' }
        });
        if (!fallbackResp.ok) throw new Error(`WordPress API error: ${fallbackResp.status}`);
        const fallbackPosts: WordPressPost[] = await fallbackResp.json();
        return Promise.all(fallbackPosts.map(transformWordPressPost));
      }
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const wpPosts: WordPressPost[] = await response.json();
    return Promise.all(wpPosts.map(transformWordPressPost));

  } catch (error) {
    console.error('Error fetching popular WordPress posts:', error);
    return [];
  }
}

/**
 * Получение связанных постов
 */
export async function getRelatedWordPressPosts(postId: number, categories: number[], limit: number = 3): Promise<BlogPost[]> {
  try {
    // Формируем URL параметры
    const params = new URLSearchParams({
      _embed: 'true',
      exclude: postId.toString(),
      per_page: limit.toString(),
      orderby: 'date',
      order: 'desc'
    });

    // Добавляем категории только если они есть
    if (categories && categories.length > 0) {
      params.append('categories', categories.join(','));
    }

    const response = await fetch(`${WORDPRESS_API_URL}/posts?${params.toString()}`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      console.warn(`WordPress API warning (${response.status}): Unable to fetch related posts`);
      return [];
    }

    const wpPosts: WordPressPost[] = await response.json();
    return Promise.all(wpPosts.map(transformWordPressPost));

  } catch (error) {
    console.error('Error fetching related WordPress posts:', error);
    return [];
  }
}

/**
 * Получение категорий
 */
export async function getWordPressCategories(): Promise<WordPressCategory[]> {
  if (categoriesCache.length > 0) {
    return categoriesCache;
  }

  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories?per_page=100`, {
      next: { revalidate: 86400 }, // Кэшируем на день
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    categoriesCache = await response.json();
    return categoriesCache;

  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    return [];
  }
}

/**
 * Получение тегов
 */
export async function getWordPressTags(): Promise<WordPressTag[]> {
  if (tagsCache.length > 0) {
    return tagsCache;
  }

  try {
    const response = await fetch(`${WORDPRESS_API_URL}/tags?per_page=100`, {
      next: { revalidate: 86400 }, // Кэшируем на день
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    tagsCache = await response.json();
    return tagsCache;

  } catch (error) {
    console.error('Error fetching WordPress tags:', error);
    return [];
  }
}

/**
 * Трансформация WordPress поста в формат приложения
 */
async function transformWordPressPost(wpPost: WordPressPost): Promise<BlogPost> {
  // Получаем категории и теги если еще не загружены
  const [, tags] = await Promise.all([
    getWordPressCategories(),
    getWordPressTags()
  ]);

  return {
    id: wpPost.id,
    slug: wpPost.slug,
    title: stripHtml(wpPost.title.rendered),
    excerpt: stripHtml(wpPost.excerpt.rendered),
    content: cleanHtmlContent(wpPost.content.rendered),
    image: getPostImage(wpPost),
    author: getPostAuthor(wpPost),
    date: wpPost.date,
    modified: wpPost.modified,
    category: getCategoryName(),
    readTime: calculateReadTime(wpPost.content.rendered),
    tags: getTagNames(wpPost.tags, tags),
    featured: wpPost.featured_media > 0
  };
}

/**
 * Получение изображения поста
 */
function getPostImage(wpPost: WordPressPost): string {
  const embedded = wpPost._embedded as unknown;
  let featuredMedia: unknown = undefined;
  if (embedded && typeof embedded === 'object' && 'wp:featuredmedia' in embedded) {
    featuredMedia = (embedded as { ['wp:featuredmedia']?: unknown })['wp:featuredmedia'];
  }
  if (Array.isArray(featuredMedia) && featuredMedia.length > 0 && typeof featuredMedia[0] === 'object' && featuredMedia[0] !== null && 'source_url' in featuredMedia[0]) {
    return (featuredMedia[0] as { source_url: string }).source_url;
  }
  // Fallback изображение
  return '/images/blog-placeholder.svg';
}

/**
 * Получение автора поста
 */
function getPostAuthor(wpPost: WordPressPost): string {
  const embedded = wpPost._embedded as unknown;
  let author: unknown = undefined;
  if (embedded && typeof embedded === 'object' && 'author' in embedded) {
    author = (embedded as { author?: unknown })['author'];
  }
  if (Array.isArray(author) && author.length > 0 && typeof author[0] === 'object' && author[0] !== null && 'name' in author[0]) {
    return (author[0] as { name: string }).name;
  }
  return 'АМСТРОЙ';
}

/**
 * Получение названия категории
 */
function getCategoryName(): string {
  // Всегда возвращаем "Блог" для единообразия
  return 'Блог';
}

/**
 * Получение названий тегов
 */
function getTagNames(tagIds: number[], tags: WordPressTag[]): string[] {
  if (tagIds.length === 0) return [];
  
  return tags
    .filter(tag => tagIds.includes(tag.id))
    .map(tag => tag.name)
    .slice(0, 10); // Ограничиваем количество тегов
}

/**
 * Удаление HTML тегов из строки
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Удаляем HTML теги
    .replace(/&nbsp;/g, ' ') // Заменяем неразрывные пробелы
    .replace(/&amp;/g, '&') // Заменяем HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/\[&hellip;\]/g, '...') // Обрабатываем [&hellip;]
    .replace(/&hellip;/g, '...') // Обрабатываем &hellip;
    .replace(/\[…\]/g, '...') // Обрабатываем [...]
    .replace(/&mdash;/g, '—') // Длинное тире
    .replace(/&ndash;/g, '–') // Короткое тире
    .replace(/&laquo;/g, '«') // Левые кавычки
    .replace(/&raquo;/g, '»') // Правые кавычки
    .trim();
}

/**
 * Очистка HTML контента от нежелательных элементов
 */
function cleanHtmlContent(html: string): string {
  return html
    // Удаляем ez-toc-container
    .replace(/<div[^>]*id=["']ez-toc-container["'][^>]*>[\s\S]*?<\/div>/gi, '')
    // Удаляем другие TOC элементы
    .replace(/<div[^>]*class=["'][^"']*toc[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '')
    // Удаляем все <nav>...</nav> (например, TOC)
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    // Обрабатываем HTML entities
    .replace(/\[&hellip;\]/g, '...')
    .replace(/&hellip;/g, '...')
    .replace(/\[…\]/g, '...')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .trim();
}

/**
 * Расчет времени чтения
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200; // Средняя скорость чтения на русском языке
  const textContent = stripHtml(content);
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  if (minutes === 1) return '1 мин';
  if (minutes < 5) return `${minutes} мин`;
  return `${minutes} мин`;
}

/**
 * Генерация статических путей для постов
 */
export async function generateBlogStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const { posts } = await getWordPressPosts({ perPage: 100 });
    return posts.map(post => ({ slug: post.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
} 