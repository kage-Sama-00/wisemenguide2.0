import React from 'react';

const developers = [
  { name: 'Anurag Patel', role: 'Backend - AI and Automation' },
  { name: 'Harsh Pahariya', role: 'Backend Developer' },
  { name: 'Jitendra Kumar', role: 'Frontend Developer' },
  { name: 'Kshitij Pathak', role: 'UI/UX Designer + Researcher' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">About WiseMenGuide</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Your personal AI-powered career compass.</p>
        <span className="inline-block mt-4 bg-primary/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light text-sm font-semibold px-3 py-1 rounded-full">
          Version 1.1.5 Beta
        </span>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">How It Works</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          WiseMenGuide is designed to simplify one of life's biggest decisions: choosing a career. We leverage a carefully constructed psychometric test to understand your core motivations, skills, and work preferences. Your answers are then analyzed by a powerful AI model (Google's Gemini) to generate a personalized and actionable career guide. Our goal is to provide clarity and direction, helping you navigate the professional world with confidence.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((dev) => (
            <div key={dev.name} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-center items-center h-full">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{dev.name}</h3>
              <p className="text-primary dark:text-primary-light">{dev.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;