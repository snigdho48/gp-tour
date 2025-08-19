import React from 'react';

function BudgetForm({ budgetBDT, setBudgetBDT, people, setPeople, onGenerate, isLoading }) {
  return (
    <div className="animate-fade-in bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8 hover:shadow-2xl transition-all duration-500">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        GP Trip Planner
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8 text-sm sm:text-base">
        Plan your perfect trip within your budget
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Budget (BDT)
          </label>
          <input
            type="number"
            id="budget"
            value={budgetBDT}
            onChange={(e) => setBudgetBDT(e.target.value)}
            placeholder="Enter your budget"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="people" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of People
          </label>
          <input
            type="number"
            id="people"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            placeholder="Enter number of people"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
          />
        </div>
      </div>
      
      <button
        onClick={onGenerate}
        disabled={!budgetBDT || !people || isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Generating Suggestions...
          </div>
        ) : (
          'Generate Trip Suggestions'
        )}
      </button>
    </div>
  );
}

export default BudgetForm;
