import React from 'react';
import PageLayout from '@/components/layouts/PageLayout';

/**
 * HOC для автоматического оборачивания страниц в PageLayout
 * Предотвращает ошибки с ModalProvider и обеспечивает единообразие
 */

interface WithPageLayoutOptions {
  className?: string;
  excludeLayout?: boolean;
  isHomePage?: boolean;
}

export function withPageLayout<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithPageLayoutOptions = {}
) {
  const { className = '', excludeLayout = false, isHomePage = false } = options;

  const WithPageLayoutComponent = (props: P) => {
    if (excludeLayout) {
      return <WrappedComponent {...props} />;
    }

    return (
      <PageLayout className={className} isHomePage={isHomePage}>
        <WrappedComponent {...props} />
      </PageLayout>
    );
  };

  // Сохраняем имя компонента для отладки
  WithPageLayoutComponent.displayName = `withPageLayout(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithPageLayoutComponent;
}

/**
 * Декоратор для использования с классовыми компонентами
 */
export const PageLayoutDecorator = (options?: WithPageLayoutOptions) => {
  return function <T extends React.ComponentType<Record<string, unknown>>>(target: T): T {
    return withPageLayout(target, options) as T;
  };
};

export default withPageLayout; 