# 📝 Настройка WordPress API для блога

## 🚀 Интеграция завершена!

Ваш блог на Next.js теперь полностью интегрирован с WordPress сайтом **[spbremontotdelka.ru](https://spbremontotdelka.ru)**.

## ⚙️ Настройка переменных окружения

Создайте файл `.env.local` в корне проекта `spb-remont/`:

```env
# WordPress API Configuration
WORDPRESS_API_URL=https://spbremontotdelka.ru/wp-json/wp/v2

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# WordPress Site Configuration  
NEXT_PUBLIC_WORDPRESS_SITE_URL=https://spbremontotdelka.ru
```

## 🎯 Что реализовано

### ✅ Основные функции
- **Получение постов** из WordPress REST API
- **Поиск по статьям** с live-preview результатов
- **Пагинация** (готово к использованию)
- **Фильтрация по категориям** и тегам
- **SEO-оптимизация** с метаданными из WordPress
- **Fallback на статические данные** при недоступности API

### ✅ Компоненты
- `BlogSearch` - интерактивный поиск с автодополнением
- `BlogErrorBoundary` - обработка ошибок и fallback
- `wordpress-api.ts` - полный API клиент для WordPress

### ✅ Страницы
- `/blog` - список всех статей с поиском и фильтрами
- `/blog/[slug]` - отдельная страница статьи с связанными постами

## 🛠 Доступные API функции

```typescript
// Получение всех постов с параметрами
const { posts, totalPages } = await getWordPressPosts({
  page: 1,
  perPage: 10,
  search: 'ремонт',
  categories: ['дизайн'],
  orderBy: 'date',
  order: 'desc'
});

// Получение поста по slug
const post = await getWordPressPostBySlug('my-post-slug');

// Получение популярных постов
const popularPosts = await getPopularWordPressPosts(5);

// Получение связанных постов
const relatedPosts = await getRelatedWordPressPosts(postId, [1, 2], 3);

// Получение категорий и тегов
const categories = await getWordPressCategories();
const tags = await getWordPressTags();
```

## 📊 Структура данных

### BlogPost (трансформированный)
```typescript
interface BlogPost {
  id: number;
  slug: string;
  title: string;        // Очищен от HTML
  excerpt: string;      // Очищен от HTML  
  content: string;      // Полный HTML контент
  image: string;        // URL featured image
  author: string;       // Имя автора
  date: string;         // ISO дата
  modified?: string;    // ISO дата изменения
  category: string;     // Название категории
  readTime: string;     // Расчетное время чтения
  tags: string[];       // Массив тегов
  featured?: boolean;   // Есть ли featured image
}
```

## 🎨 Особенности дизайна

### Responsive дизайн
- Мобильная адаптация для всех компонентов
- Оптимизированные изображения с fallback
- Плавные анимации и переходы

### UX улучшения
- **Live поиск** с debounce (300ms)
- **Lazy loading** изображений с placeholder
- **Error boundaries** для обработки ошибок
- **Breadcrumbs** навигация
- **Related content** для увеличения engagement

## 🔍 SEO оптимизация

### Метаданные
- Dynamic meta title и description из WordPress
- Open Graph разметка для социальных сетей
- Keywords из тегов статей
- Structured data готов к добавлению

### Производительность
- **ISR** (Incremental Static Regeneration) - 1 час
- **Static Generation** для популярных страниц
- **Image optimization** через next/image
- **Caching** категорий и тегов

## 🚨 Обработка ошибок

### Fallback стратегия
1. **Первый уровень**: Кэшированные данные (1 час)
2. **Второй уровень**: Статические демо-данные из `constants.ts`
3. **Третий уровень**: Error UI с кнопкой повтора

### Индикаторы
- Предупреждение при использовании fallback данных
- Loading состояния для поиска
- Graceful degradation при ошибках изображений

## 🧪 Тестирование

### Локальное тестирование
```bash
# Запуск dev сервера
npm run dev

# Переход к блогу
http://localhost:3000/blog

# Тест поиска
Введите "ремонт" в поисковое поле

# Тест отдельной статьи
http://localhost:3000/blog/any-existing-slug
```

### Production тестирование
```bash
# Билд проекта
npm run build

# Проверка статических путей
npm run start
```

## 🔧 Кастомизация

### Изменение количества постов
```typescript
// В blog/page.tsx
const { posts } = await getWordPressPosts({ perPage: 20 });
```

### Добавление новых полей
```typescript
// В wordpress-api.ts
interface WordPressPost {
  // Добавьте новые поля
  custom_field?: string;
}

// В transformWordPressPost
return {
  // Трансформируйте новые поля
  customField: wpPost.custom_field
};
```

### Стилизация
Все компоненты используют TailwindCSS 4 с дизайн-системой АМСТРОЙ:
- Основные цвета: gray-900, blue-600, green-500
- Шрифт: Inter с поддержкой кириллицы
- Компоненты в стиле проекта

## ⚡ Производительность

### Core Web Vitals
- **LCP**: Оптимизировано через next/image
- **FID**: Минимальный JavaScript на клиенте
- **CLS**: Фиксированные размеры для изображений

### Мониторинг
- Логирование ошибок API в консоль
- Fallback метрики через console.error
- Рекомендуется добавить Sentry для production

## 📞 Поддержка

### При проблемах с API
1. Проверьте доступность `https://spbremontotdelka.ru/wp-json/wp/v2/posts`
2. Убедитесь в правильности WORDPRESS_API_URL
3. Fallback автоматически активируется при ошибках

### Контакты
- **Email**: info@spbremontotdelka.ru
- **Телефон**: +7 (953) 371-34-17

---

*Интеграция выполнена с использованием современных подходов Next.js 15 и WordPress REST API* 