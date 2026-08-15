import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}
export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-xl 
        border border-gray-200/50 dark:border-gray-700/50
        ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : 'shadow-md'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}