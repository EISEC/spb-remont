# Руководство разработчика - Предотвращение типичных ошибок

## Обзор

Данная система предотвращает две основные ошибки, которые часто возникают в Next.js 15:

1. **Ошибка с `params`**: "params is a Promise" 
2. **Ошибка с `ModalProvider`**: "useModal must be used within a ModalProvider"

## 1. Система работы с параметрами маршрутов

### Проблема
В Next.js 15 параметры маршрутов стали Promise, и их нужно ожидать с `await`.

### Решение
Используйте утилиты из `@/lib/params.ts`:

```typescript
// ❌ Неправильно (старый способ)
const ServicePage = async ({ params }: { params: { slug: string } }) => {
  const service = SERVICES[params.slug]; // Ошибка!
}

// ✅ Правильно (новый способ)
import { getSlugFromParams, type SlugPageProps } from '@/lib/params';

const ServicePage = async ({ params }: SlugPageProps) => {
  const slug = await getSlugFromParams(params);
  const service = SERVICES[slug];
}
```

### Доступные утилиты

```typescript
// Получение slug
const slug = await getSlugFromParams(params);

// Получение id
const id = await getIdFromParams(params);

// Получение любого параметра
const value = await getParamFromParams(params, 'key');

// Получение всех параметров
const allParams = await getAllParams(params);
```

### Типы для страниц

```typescript
import { SlugPageProps, IdPageProps, PageProps } from '@/lib/params';

// Для страниц с [slug]
const MyPage = async ({ params }: SlugPageProps) => { ... }

// Для страниц с [id]  
const MyPage = async ({ params }: IdPageProps) => { ... }

// Для кастомных параметров
interface CustomParams {
  category: string;
  subcategory: string;
}
const MyPage = async ({ params }: PageProps<CustomParams>) => { ... }
```

## 2. Система автоматических Layout

### Проблема
Каждая страница должна быть обернута в `ModalProvider`, что приводит к дублированию кода и возможным ошибкам.

### Решение
Используйте `PageLayout` для автоматического оборачивания:

```typescript
// ❌ Неправильно (старый способ)
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModalProvider from '@/components/ModalProvider';

const MyPage = () => {
  return (
    <ModalProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          {/* Контент страницы */}
        </main>
        <Footer />
      </div>
    </ModalProvider>
  );
};

// ✅ Правильно (новый способ)
import PageLayout from '@/components/layouts/PageLayout';

const MyPageContent = () => {
  return (
    <>
      {/* Контент страницы без Header/Footer/ModalProvider */}
    </>
  );
};

const MyPage = () => {
  return (
    <PageLayout>
      <MyPageContent />
    </PageLayout>
  );
};
```

### Опции PageLayout

```typescript
// Кастомный className
<PageLayout className="custom-class">
  <Content />
</PageLayout>

// Для главной страницы (без отступа pt-20)
<PageLayout isHomePage={true}>
  <Content />
</PageLayout>

// Отключение layout (для особых случаев)
<PageLayout excludeLayout={true}>
  <Content />
</PageLayout>
```

### HOC withPageLayout (альтернативный способ)

```typescript
import { withPageLayout } from '@/lib/withPageLayout';

const MyPageContent = () => {
  return <div>Контент</div>;
};

// Автоматическое оборачивание в PageLayout
export default withPageLayout(MyPageContent);

// С опциями
export default withPageLayout(MyPageContent, { 
  className: 'custom-class',
  isHomePage: true 
});
```

## 3. Шаблон для новых страниц

### Статическая страница

```typescript
import React from 'react';
import PageLayout from '@/components/layouts/PageLayout';

export const metadata = {
  title: 'Заголовок страницы',
  description: 'Описание страницы',
  keywords: 'ключевые, слова',
};

const MyPageContent = () => {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Контент страницы */}
        </div>
      </section>
    </>
  );
};

const MyPage = () => {
  return (
    <PageLayout>
      <MyPageContent />
    </PageLayout>
  );
};

export default MyPage;
```

### Главная страница

```typescript
import React from 'react';
import PageLayout from '@/components/layouts/PageLayout';

const HomeContent = () => {
  return (
    <>
      {/* Контент главной страницы */}
    </>
  );
};

const HomePage = () => {
  return (
    <PageLayout isHomePage={true}>
      <HomeContent />
    </PageLayout>
  );
};

export default HomePage;
```

### Динамическая страница с параметрами

```typescript
import React from 'react';
import { notFound } from 'next/navigation';
import { getSlugFromParams, type SlugPageProps } from '@/lib/params';
import PageLayout from '@/components/layouts/PageLayout';

export async function generateStaticParams() {
  return [
    { slug: 'example-1' },
    { slug: 'example-2' },
  ];
}

export async function generateMetadata({ params }: SlugPageProps) {
  const slug = await getSlugFromParams(params);
  
  return {
    title: `Страница ${slug}`,
    description: `Описание для ${slug}`,
  };
}

const MyPageContent = async ({ params }: SlugPageProps) => {
  const slug = await getSlugFromParams(params);
  
  // Проверка существования
  if (!isValidSlug(slug)) {
    notFound();
  }

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1>Страница для {slug}</h1>
        </div>
      </section>
    </>
  );
};

const MyPage = async (props: SlugPageProps) => {
  return (
    <PageLayout>
      <MyPageContent {...props} />
    </PageLayout>
  );
};

export default MyPage;
```

## 4. Миграция существующих страниц

### Шаг 1: Обновите импорты
```typescript
// Удалите
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModalProvider from '@/components/ModalProvider';

// Добавьте
import PageLayout from '@/components/layouts/PageLayout';
import { getSlugFromParams, type SlugPageProps } from '@/lib/params'; // если нужно
```

### Шаг 2: Обновите типы параметров
```typescript
// Было
interface PageProps {
  params: { slug: string };
}

// Стало
import { SlugPageProps } from '@/lib/params';
```

### Шаг 3: Обновите получение параметров
```typescript
// Было
const { slug } = await params;

// Стало
const slug = await getSlugFromParams(params);
```

### Шаг 4: Разделите компонент на Content и Page
```typescript
// Вынесите логику в отдельный компонент
const MyPageContent = async ({ params }: SlugPageProps) => {
  // Вся логика страницы
  return <>...</>;
};

// Основной компонент только оборачивает в Layout
const MyPage = async (props: SlugPageProps) => {
  return (
    <PageLayout>
      <MyPageContent {...props} />
    </PageLayout>
  );
};
```

### Шаг 5: Обработка главной страницы
```typescript
// Для главной страницы добавьте isHomePage
const HomePage = () => {
  return (
    <PageLayout isHomePage={true}>
      <HomeContent />
    </PageLayout>
  );
};
```

## 5. Преимущества новой системы

1. **Предотвращение ошибок**: Автоматическая обработка params и ModalProvider
2. **Меньше дублирования**: Один Layout для всех страниц
3. **Консистентность**: Единообразная структура всех страниц
4. **Безопасность типов**: TypeScript типы предотвращают ошибки
5. **Простота поддержки**: Легко изменить что-то глобально
6. **Гибкость**: Поддержка главной страницы и особых случаев

## 6. Устранение неполадок

### "params is a Promise" ошибка
- Проверьте, что используете `await` с параметрами
- Используйте утилиты из `@/lib/params.ts`

### "useModal must be used within a ModalProvider" ошибка
- Убедитесь, что страница обернута в `PageLayout`
- Проверьте, что не удалили `ModalProvider` из layout

### Проблемы с отступами на главной странице
- Используйте `isHomePage={true}` для главной страницы
- Проверьте, что Hero секция имеет правильные стили

### TypeScript ошибки
- Используйте правильные типы: `SlugPageProps`, `IdPageProps`
- Убедитесь, что импортируете типы из `@/lib/params`

## 7. Примеры использования

Смотрите реализацию в:
- `src/app/page.tsx` - главная страница с `isHomePage={true}`
- `src/app/services/[slug]/page.tsx` - динамическая страница
- `src/app/blog/[slug]/page.tsx` - динамическая страница
- `src/app/services/page.tsx` - статическая страница
- `src/app/blog/page.tsx` - статическая страница 