import React from 'react';
import logo from '../assets/logo.png';

function BudgetForm({ budgetBDT, setBudgetBDT, people, setPeople, onGenerate, isLoading }) {
  return (
    <div className='animate-fade-in bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8 hover:shadow-2xl transition-all duration-500'>
      <div className="flex flex-col sm:flex-row items-center justify-center mb-2 gap-2 sm:gap-3">
        <img src={logo} alt="GPStar Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
        <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-1">
          <span className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00B5FB] to-[#3cbef2] bg-clip-text text-transparent font-telenor'>
            GPStar
          </span>
          <span className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00B5FB] to-[#3cbef2] bg-clip-text text-transparent font-telenor'>
            Trip Planner
          </span>
        </div>
      </div>
      <p className='text-gray-600 dark:text-gray-300 text-center mb-8 text-sm sm:text-base font-inter'>
        Plan your perfect trip within your budget
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6'>
        <div>
          <label
            htmlFor='budget'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
          >
            Budget (BDT)
          </label>
          <input
            type='number'
            id='budget'
            value={budgetBDT}
            onChange={(e) => setBudgetBDT(e.target.value)}
            placeholder='Enter your budget'
            className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500'
          />
        </div>

        <div>
          <label
            htmlFor='people'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
          >
            Number of People
          </label>
          <input
            type='number'
            id='people'
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            placeholder='Enter number of people'
            className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500'
          />
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={!budgetBDT || !people || isLoading}
        className='w-full bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-700 hover:to-slate-700 dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-700 dark:hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed cursor-pointer'
      >
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
            Generating Suggestions...
          </div>
        ) : (
          "Generate Trip Suggestions"
        )}
      </button>
    </div>
  );
}

export default BudgetForm;
