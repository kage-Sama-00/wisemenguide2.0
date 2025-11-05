
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { getCareerGuidance } from '../services/geminiService';
import { Answers, CareerResults } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultCard from '../components/ResultCard';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<CareerResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { answers } = (location.state as { answers: Answers }) || { answers: null };

  const fetchResults = useCallback(async (userAnswers: Answers) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const guidance = await getCareerGuidance(userAnswers);
      setResults(guidance);
    } catch (err) {
      console.error('Error fetching career guidance:', err);
      setError('Failed to generate your career guide. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (answers) {
      fetchResults(answers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!answers) {
    // Redirect to test page if no answers are provided
    return <Navigate to="/test" />;
  }
  
  const icons = {
    personality: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    domains: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    titles: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    roadmap: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    jobs: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Analyzing your results...</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Our AI is crafting your personalized career guide. Please wait a moment.</p>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-500 mb-4">An Error Occurred</h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Your Personalized Career Guide</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ResultCard title="Your Personality Type" icon={icons.personality} className="md:col-span-2">
          <p className="text-lg font-semibold text-primary dark:text-primary-light">{results.personalityType}</p>
        </ResultCard>

        <ResultCard title="Recommended Career Domains" icon={icons.domains}>
          <ul className="list-disc list-inside space-y-2">
            {results.recommendedDomains.map((domain, i) => <li key={i}>{domain}</li>)}
          </ul>
        </ResultCard>

        <ResultCard title="Top 5 Job Titles for You" icon={icons.titles}>
          <ul className="list-disc list-inside space-y-2">
            {results.topJobTitles.map((title, i) => <li key={i}>{title}</li>)}
          </ul>
        </ResultCard>

        <ResultCard title="Step-by-Step Roadmap" icon={icons.roadmap} className="md:col-span-2">
           <ul className="space-y-3">
              {results.roadmap.map((step, i) => (
                <li key={i} className="flex items-start">
                   <span className="flex-shrink-0 bg-primary text-white rounded-full h-6 w-6 text-sm flex items-center justify-center font-bold mr-3 mt-1">{i + 1}</span>
                   <p>{step}</p>
                </li>
              ))}
            </ul>
        </ResultCard>
        
        <ResultCard title="Current Job Openings" icon={icons.jobs} className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.jobOpenings.map((job, i) => (
              <a href={job.url} target="_blank" rel="noopener noreferrer" key={i} className="block p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                <p className="font-bold text-gray-800 dark:text-white">{job.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
                <p className="text-xs text-gray-500 mt-1">{job.location}</p>
              </a>
            ))}
          </div>
        </ResultCard>
      </div>
    </div>
  );
};

export default ResultsPage;
