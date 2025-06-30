'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface BlogErrorBoundaryProps {
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<{ posts: unknown[] }>;
}

export default class BlogErrorBoundary extends React.Component<BlogErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: BlogErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallbackComponent;
      return Fallback ? <Fallback posts={[]} /> : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-red-500">
              <AlertCircle className="w-8 h-8" />
            </span>
            <p className="text-red-700 font-semibold">Произошла ошибка при загрузке блога.</p>
            <button
              onClick={this.handleRetry}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Попробовать снова
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Компонент-обертка для блога с обработкой ошибок
export const BlogWithErrorBoundary: React.FC<{ 
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<{ posts: unknown[] }>;
}> = ({ children, fallbackComponent }) => {
  return (
    <BlogErrorBoundary fallbackComponent={fallbackComponent}>
      {children}
    </BlogErrorBoundary>
  );
}; 