
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="text-center animate-fade-in-up">
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]"></div>
      </div>
      
      <main className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Find Your Perfect Career Path
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
          WiseMenGuide uses a quick psychometric test and powerful AI to illuminate your ideal career domains, provide a clear roadmap, and show you relevant job openings.
        </p>
        <div className="mt-10">
          <Link
            to="/test"
            className="px-8 py-4 bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Start Your Free Test
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
