'use client';

import React from 'react';

interface AdBannerProps {
  type?: 'horizontal' | 'vertical' | 'square';
  className?: string;
  placeholder?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  type = 'horizontal', 
  className = '',
  placeholder = 'Реклама'
}) => {
  const dimensions = {
    horizontal: 'h-32 w-full',
    vertical: 'h-96 w-64',
    square: 'h-64 w-64'
  };

  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${dimensions[type]} ${className}`}>
      <div className="text-center">
        <div className="text-gray-400 font-medium mb-2">{placeholder}</div>
        <div className="text-xs text-gray-400">
          {type === 'horizontal' && '728 x 90'}
          {type === 'vertical' && '300 x 600'}
          {type === 'square' && '300 x 300'}
        </div>
      </div>
    </div>
  );
};

export default AdBanner; 