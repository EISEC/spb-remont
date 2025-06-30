'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, List } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content, className = '' }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    // Ждем пока контент отрендерится в DOM
    const timer = setTimeout(() => {
      // Находим заголовки в уже отрендеренном контенте
      const articleContent = document.querySelector('.article-content');
      if (!articleContent) return;
      
      const headings = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const items: TocItem[] = [];
      
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent?.trim() || '';
        
        if (text && level >= 2 && level <= 4) { // Только h2, h3, h4
          const id = `heading-${index}`;
          const element = heading as HTMLElement;
          
          // Добавляем ID к заголовку для навигации
          element.id = id;
          
          items.push({
            id,
            text,
            level
          });
        }
      });
      
      setTocItems(items);
      
      // Наблюдатель для активного заголовка
      if (items.length > 0) {
        // Очищаем предыдущий observer
        if (observer) {
          observer.disconnect();
        }

        const newObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(entry.target.id);
              }
            });
          },
          {
            rootMargin: '-100px 0px -66%',
            threshold: 0
          }
        );

        // Наблюдаем за заголовками на странице
        items.forEach((item) => {
          const element = document.getElementById(item.id);
          if (element) {
            newObserver.observe(element);
          }
        });

        setObserver(newObserver);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Отступ от верха
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className={`bg-gray-50 rounded-xl border border-gray-200 ${className}`}>
      {/* Заголовок с кнопкой сворачивания */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <List className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-bold text-gray-900">Содержание</h3>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-600" />
        )}
      </div>

      {/* Список заголовков */}
      {isExpanded && (
        <div className="pb-4 px-4">
          <nav className="space-y-1">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`
                  block w-full text-left py-2 px-3 rounded-lg text-sm transition-colors
                  ${item.level === 2 ? 'pl-3' : ''}
                  ${item.level === 3 ? 'pl-6 text-sm' : ''}
                  ${item.level === 4 ? 'pl-9 text-xs' : ''}
                  ${activeId === item.id 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {item.text}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* SEO структурированные данные */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": tocItems[0]?.text || "Содержание статьи",
            "articleSection": tocItems.map(item => item.text)
          })
        }}
      />
    </div>
  );
};

export default TableOfContents; 