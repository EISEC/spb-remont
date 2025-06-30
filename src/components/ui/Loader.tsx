import React from 'react';

const Loader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center w-full h-full ${className}`} role="status" aria-label="Загрузка...">
    <svg className="animate-spin h-12 w-12 text-green-500" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className="opacity-20" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="5" />
      <path className="opacity-70" fill="currentColor" d="M45 25c0-11.046-8.954-20-20-20v5c8.284 0 15 6.716 15 15h5z" />
    </svg>
    <span className="sr-only">Загрузка...</span>
  </div>
);

export default Loader; 