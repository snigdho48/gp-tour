import React from 'react';

function EmptyState() {
  return (
    <div className="text-center py-12 px-6">
      <div className="max-w-md mx-auto">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
          <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Ready to Plan Your Trip?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-6">
          Enter your budget and the number of people traveling to get personalized trip suggestions. We'll help you find the perfect destination within your budget!
        </p>
      </div>
    </div>
  );
}

export default EmptyState;
