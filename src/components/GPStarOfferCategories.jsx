import React from 'react';
import TranslatedText from './TranslatedText';

const GPStarOfferCategories = () => {
  return (
    <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 max-w-6xl">
      <div className='p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl sm:rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xl transition-all duration-500'>
        <TranslatedText
          text='GPStar Offer'
          className='text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-800 dark:text-amber-200 text-center mb-6 sm:mb-8 font-telenor break-words leading-tight'
          as='h2'
        />
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
          {/* Travel Aggregators */}
          <div className='p-3 sm:p-4 bg-amber-100 dark:bg-amber-800/30 rounded-lg sm:rounded-xl border border-amber-300 dark:border-amber-700 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
            <TranslatedText
              text='Travel Aggregators'
              className='font-semibold text-sm sm:text-base text-amber-800 dark:text-amber-200 mb-2 break-words leading-tight'
              as='h3'
            />
            <TranslatedText
              text='GoZayaan, ShareTrip, Flight Expert'
              className='text-xs sm:text-sm text-amber-700 dark:text-amber-300 break-words leading-tight'
              as='p'
            />
          </div>

          {/* Transportation */}
          <div className='p-3 sm:p-4 bg-blue-100 dark:bg-blue-800/30 rounded-lg sm:rounded-xl border border-blue-300 dark:border-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
            <TranslatedText
              text='Transportation'
              className='font-semibold text-sm sm:text-base text-blue-800 dark:text-blue-200 mb-2 break-words leading-tight'
              as='h3'
            />
            <TranslatedText
              text='US-Bangla, NovoAir, Shohoz, Garibook, Soudia'
              className='text-xs sm:text-sm text-blue-700 dark:text-blue-300 break-words leading-tight'
              as='p'
            />
          </div>

          {/* Hotels & Resorts */}
          <div className='p-3 sm:p-4 bg-green-100 dark:bg-green-800/30 rounded-lg sm:rounded-xl border border-green-300 dark:border-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
            <TranslatedText
              text='Hotels & Resorts (Domestic)'
              className='font-semibold text-sm sm:text-base text-green-800 dark:text-green-200 mb-2 break-words leading-tight'
              as='h3'
            />
            <TranslatedText
              text='Seagull, Sayeman, Grand Sylhet'
              className='text-xs sm:text-sm text-green-700 dark:text-green-300 break-words leading-tight'
              as='p'
            />
          </div>

          {/* Travel Insurance */}
          <div className='p-3 sm:p-4 bg-purple-100 dark:bg-purple-800/30 rounded-lg sm:rounded-xl border border-purple-300 dark:border-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
            <TranslatedText
              text='Travel Insurance'
              className='font-semibold text-sm sm:text-base text-purple-800 dark:text-purple-200 mb-2 break-words leading-tight'
              as='h3'
            />
            <TranslatedText
              text='Green Delta, MTB'
              className='text-xs sm:text-sm text-purple-700 dark:text-purple-300 break-words leading-tight'
              as='p'
            />
          </div>

          {/* Luggage & Bags */}
          <div className='p-3 sm:p-4 bg-indigo-100 dark:bg-indigo-800/30 rounded-lg sm:rounded-xl border border-indigo-300 dark:border-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
            <TranslatedText
              text='Travel Luggage & Bags'
              className='font-semibold text-sm sm:text-base text-indigo-800 dark:text-indigo-200 mb-2 break-words leading-tight'
              as='h3'
            />
            <TranslatedText
              text='Sara Lifestyle, President Bags'
              className='text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 break-words leading-tight'
              as='p'
            />
          </div>

          {/* Holiday Outfits */}
          <div className='p-3 sm:p-4 bg-pink-100 dark:bg-pink-800/30 rounded-lg sm:rounded-xl border border-pink-300 dark:border-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
            <TranslatedText
              text='Holiday Outfits'
              className='font-semibold text-sm sm:text-base text-pink-800 dark:text-pink-200 mb-2 break-words leading-tight'
              as='h3'
            />
            <TranslatedText
              text='Lotto, Apex, Ecstasy, Sailor'
              className='text-xs sm:text-sm text-pink-700 dark:text-pink-300 break-words leading-tight'
              as='p'
            />
          </div>

          {/* Travel Groups/Agencies */}
          <div className='p-3 sm:p-4 bg-teal-100 dark:bg-teal-800/30 rounded-lg sm:rounded-xl border border-teal-300 dark:border-teal-700 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
            <TranslatedText
              text='Travel Groups/Agencies'
              className='font-semibold text-sm sm:text-base text-teal-800 dark:text-teal-200 mb-2 break-words leading-tight'
              as='h3'
            />
            <TranslatedText
              text='Wander Woman, FirstTrip'
              className='text-xs sm:text-sm text-teal-700 dark:text-teal-300 break-words leading-tight'
              as='p'
            />
          </div>

          {/* International Roaming - Always shown since it's a general section */}
          <div className='p-3 sm:p-4 bg-red-100 dark:bg-red-800/30 rounded-lg sm:rounded-xl border border-red-300 dark:border-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
            <TranslatedText
              text='International Roaming'
              className='font-semibold text-sm sm:text-base text-red-800 dark:text-red-200 mb-2 break-words leading-tight'
              as='h3'
            />
            <TranslatedText
              text='GPStar Roaming Packages'
              className='text-xs sm:text-sm text-red-700 dark:text-red-300 break-words leading-tight'
              as='p'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPStarOfferCategories;
