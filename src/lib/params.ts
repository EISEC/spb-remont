/**
 * Утилиты для безопасной работы с параметрами маршрутов в Next.js 15
 */

export interface PageParams {
  [key: string]: string | string[] | undefined;
}

export interface SlugParams extends PageParams {
  slug: string;
}

export interface IdParams extends PageParams {
  id: string;
}

/**
 * Безопасное получение slug из params
 */
export function getSlugFromParams(params: SlugParams): string {
  return params.slug;
}

/**
 * Безопасное получение id из params
 */
export function getIdFromParams(params: IdParams): string {
  return params.id;
}

/**
 * Безопасное получение любого параметра из params
 */
export function getParamFromParams<T extends PageParams>(
  params: T,
  key: keyof T
): T[keyof T] {
  return params[key];
}

/**
 * Безопасное получение всех параметров из params
 */
export function getAllParams<T extends PageParams>(params: T): T {
  return params;
}

/**
 * Типы для компонентов страниц
 */
export interface PageProps<T extends PageParams = PageParams> {
  params: T;
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Специализированные типы для часто используемых случаев
export interface SlugPageProps {
  params: SlugParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface IdPageProps {
  params: IdParams;
  searchParams?: { [key: string]: string | string[] | undefined };
} 