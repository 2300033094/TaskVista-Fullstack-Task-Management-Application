import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          {
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': variant === 'default',
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': variant === 'primary',
            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300': variant === 'secondary',
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': variant === 'success',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': variant === 'warning',
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': variant === 'danger',
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-2.5 py-0.5 text-sm': size === 'md',
            'px-3 py-1 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";