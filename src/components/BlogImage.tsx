'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

const BlogImage: React.FC<BlogImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      setImageSrc('/images/blog-placeholder.svg');
      setIsError(true);
    }
  };

  // Если используется Next.js Image с размерами
  if (width && height) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        onError={handleError}
      />
    );
  }

  // Обычный img тег для случаев без фиксированных размеров
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};

export default BlogImage; 