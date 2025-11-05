
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 shadow-inner mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 WiseMenGuide. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition">About</Link>
            <Link to="/test" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition">Start Test</Link>
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
