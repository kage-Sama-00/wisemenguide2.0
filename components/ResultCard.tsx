
import React, { ReactNode } from 'react';

interface ResultCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="bg-primary-light/20 dark:bg-primary-dark/30 text-primary dark:text-primary-light p-3 rounded-full">
          {icon}
        </div>
        <h3 className="ml-4 text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
      </div>
      <div className="text-gray-600 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default ResultCard;
