import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
    
    const variants = {
      primary: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/30 focus:ring-green-500',
      secondary: 'bg-transparent border-2 border-green-500 text-gray-800 hover:bg-green-500 hover:text-white focus:ring-green-500',
      outline: 'bg-transparent border border-gray-600 text-gray-800 hover:border-green-500 hover:text-green-500 focus:ring-green-500',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 