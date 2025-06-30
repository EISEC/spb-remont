'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getWordPressPosts } from '@/lib/wordpress-api';
import { BlogPost } from '@/types';
import BlogImage from './BlogImage';

interface BlogSearchProps {
  placeholder?: string;
  className?: string;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ 
  placeholder = "Поиск по статьям...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce для поиска
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    
    try {
      const { posts } = await getWordPressPosts({ 
        search: searchQuery, 
        perPage: 5 
      });
      setResults(posts);
      setIsOpen(posts.length > 0);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Поисковое поле */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none text-lg transition-colors"
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
        />
        
        {/* Индикатор загрузки или кнопка очистки */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          ) : query.length > 0 ? (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Результаты поиска */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <>
              <div className="p-4 border-b border-gray-100">
                <span className="text-sm text-gray-500">
                  Найдено {results.length} статей
                </span>
              </div>
              {results.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={handleResultClick}
                  className={`flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors ${
                    index < results.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="p-4 border-t border-gray-100">
                <Link
                  href={`/blog?search=${encodeURIComponent(query)}`}
                  onClick={handleResultClick}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Показать все результаты для &quot;{query}&quot; &rarr;
                </Link>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">
                По запросу &quot;{query}&quot; ничего не найдено
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Попробуйте изменить поисковый запрос
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogSearch; 