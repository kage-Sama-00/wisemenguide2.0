
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { testQuestions } from '../constants/questions';
import { Answers } from '../types';

const TestPage: React.FC = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const navigate = useNavigate();

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length !== testQuestions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    // Fire-and-forget webhook with a short timeout so UI isn't blocked
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      void fetch('https://aakagesama.app.n8n.cloud/webhook-test/psychotest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
        signal: controller.signal,
        // no-cache to avoid preflight caching issues on some hosts
        cache: 'no-store' as RequestCache,
      }).catch((err) => {
        console.warn('Webhook request failed or timed out:', err);
      }).finally(() => clearTimeout(timeoutId));
    } catch (err) {
      console.warn('Webhook dispatch error:', err);
    }

    // Navigate immediately to results with answers in state
    navigate('/results', { state: { answers } });
  };
  
  const allAnswered = Object.keys(answers).length === testQuestions.length;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800 dark:text-white">Psychometric Test</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Answer these 10 questions to discover your career profile.</p>
      
      <form onSubmit={handleSubmit} className="space-y-10">
        {testQuestions.map((question, index) => (
          <div key={question.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <p className="text-lg font-semibold mb-4">
              <span className="text-primary font-bold">{index + 1}.</span> {question.text}
            </p>
            <div className="space-y-3">
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    answers[question.id] === option.value
                      ? 'bg-primary/20 border-primary dark:bg-primary-dark/30'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={() => handleAnswerChange(question.id, option.value)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="ml-3 text-gray-700 dark:text-gray-300">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={!allAnswered}
            className="px-8 py-4 bg-gradient-to-r from-primary-dark to-primary text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            Submit & See Your Results
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestPage;
