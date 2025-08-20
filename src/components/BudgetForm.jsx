import React from 'react';
import logo from '../assets/logo.png';
import TranslatedText from './TranslatedText';
import TranslatedButton from './TranslatedButton';
import TranslatedInput from './TranslatedInput';

function BudgetForm({ budgetBDT, setBudgetBDT, people, setPeople, onGenerate, isLoading }) {
  return (
    <div className='animate-fade-in bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-6 sm:mb-8 hover:shadow-2xl transition-all duration-500'>
      <div className='flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4 gap-2 sm:gap-3'>
        <img
          src={logo}
          alt='GPStar Logo'
          className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12'
        />
        <div className='flex flex-col sm:flex-row items-center gap-0 sm:gap-1 text-center min-w-0 mt-[.7em]'>
          <TranslatedText
            text='GPStar'
            as='span'
            className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold   text-[#3cbef2] font-telenor break-words leading-tight'
          />
          <TranslatedText
            text='Trip Planner'
            className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold  text-[#3cbef2] font-telenor break-words leading-tight'
            as='span'
          />
        </div>
      </div>

      <TranslatedText
        text='Plan your perfect trip within your budget'
        className='text-gray-600 dark:text-gray-300 text-center mb-6 sm:mb-8 text-xs sm:text-sm lg:text-base font-inter break-words leading-tight'
        as='p'
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6'>
        <div>
          <TranslatedText
            text='Total Budget (BDT)'
            className='block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 break-words leading-tight'
            as='label'
            htmlFor='budget'
          />
          <TranslatedInput
            type='number'
            id='budget'
            value={budgetBDT}
            onChange={(e) => setBudgetBDT(e.target.value)}
            placeholder='Enter your budget'
            className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 text-sm sm:text-base'
          />
        </div>

        <div>
          <TranslatedText
            text='Number of People'
            className='block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 break-words leading-tight'
            as='label'
            htmlFor='people'
          />
          <TranslatedInput
            type='number'
            id='people'
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            placeholder='Enter number of people'
            className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 text-sm sm:text-base'
          />
        </div>
      </div>

      <TranslatedButton
        onClick={onGenerate}
        disabled={!budgetBDT || !people || isLoading}
        isLoading={isLoading}
        loadingText='Generating Suggestions...'
        normalText='Generate Trip Suggestions'
        className='w-full bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-700 hover:to-slate-700 dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-700 dark:hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base font-inter'
      />
    </div>
  );
}

export default BudgetForm;
