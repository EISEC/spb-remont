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
export async function getSlugFromParams(params: Promise<SlugParams>): Promise<string> {
  const { slug } = await params;
  return slug;
}

/**
 * Безопасное получение id из params
 */
export async function getIdFromParams(params: Promise<IdParams>): Promise<string> {
  const { id } = await params;
  return id;
}

/**
 * Безопасное получение любого параметра из params
 */
export async function getParamFromParams<T extends PageParams>(
  params: Promise<T>, 
  key: keyof T
): Promise<T[keyof T]> {
  const resolvedParams = await params;
  return resolvedParams[key];
}

/**
 * Безопасное получение всех параметров из params
 */
export async function getAllParams<T extends PageParams>(params: Promise<T>): Promise<T> {
  return await params;
}

/**
 * Типы для компонентов страниц
 */
export interface PageProps<T extends PageParams = PageParams> {
  params: Promise<T>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Специализированные типы для часто используемых случаев
export interface SlugPageProps {
  params: Promise<SlugParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface IdPageProps {
  params: Promise<IdParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
} 