import React, { useState } from 'react';
import { fmtBDT } from '../constants/tripData.js';
import { breakdownBDT } from '../utils/calculations.js';
import TranslatedText from './TranslatedText';
import TranslatedButton from './TranslatedButton';

function TripCard({ option, people, onViewDetails }) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const breakdown = breakdownBDT(option);

  return (
    <div className='
      bg-white/90 overflow-visible dark:bg-gray-800/90 backdrop-blur-sm 
      rounded-xl sm:rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 
      transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:z-[99999] 
      h-full flex flex-col group
    '>
      {/* Header - more subtle */}
      <div className='bg-gradient-to-r from-teal-600 to-slate-600 dark:from-slate-700 dark:to-slate-800 p-4 sm:p-6 text-white transition-all duration-500 rounded-t-xl sm:rounded-t-2xl border-gray-200/50 dark:border-gray-700/50'>
        <div className='flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 rounded-t-xl sm:rounded-t-2xl'>
          <TranslatedText
            text={option.name}
            className='text-lg sm:text-xl font-bold transition-all duration-300 font-telenor flex-1 min-w-0 break-words leading-tight'
            as='h3'
          />
          <TranslatedText
            text={option.type}
            className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300 flex-shrink-0 break-words leading-tight ${
              option.type === "International"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : option.type === "Domestic"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
            }`}
            as='span'
          />
        </div>
        <TranslatedText
          text={option.stay}
          className='text-teal-100 dark:text-slate-200 text-xs sm:text-sm opacity-90 transition-all duration-300 font-inter break-words leading-tight'
          as='p'
        />
        {option.nights > 0 && (
          <span className='text-teal-200 dark:text-slate-300 text-xs sm:text-sm transition-all duration-300 font-inter'>
            {option.nights}{" "}
            {option.nights > 1 ? (
              <TranslatedText text='nights' />
            ) : (
              <TranslatedText text='night' />
            )}
          </span>
        )}
      </div>

      {/* Content */}
      <div className='p-4 sm:p-6 flex-1 flex flex-col'>
        {/* Budget Summary - Prominent Display */}
        <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-800 transition-all duration-300 shadow-md'>
          <TranslatedText
            text='Budget Summary'
            className='font-semibold mb-3 text-center text-sm sm:text-base text-blue-800 dark:text-blue-200 font-telenor break-words leading-tight'
            as='div'
          />
          <div className='grid grid-cols-2 gap-3 sm:gap-4'>
            <div className='text-center p-2 sm:p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg sm:rounded-xl border border-blue-300 dark:border-blue-700 transition-all duration-300'>
              <div className='text-lg sm:text-2xl font-bold text-blue-700 dark:text-blue-300'>
                {fmtBDT(breakdown.total)}
              </div>
              <TranslatedText
                text='Total Cost'
                className='text-xs text-blue-600 dark:text-blue-400 font-medium font-inter break-words leading-tight'
                as='div'
              />
            </div>
            <div className='text-center p-2 sm:p-3 bg-green-100 dark:bg-green-800/30 rounded-lg sm:rounded-xl border border-green-300 dark:border-green-700 transition-all duration-300'>
              <div className='text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300'>
                {fmtBDT(Math.round(breakdown.total / people))}
              </div>
              <TranslatedText
                text='Per Person'
                className='text-xs text-green-600 dark:text-green-400 font-medium font-inter break-words leading-tight'
                as='div'
              />
            </div>
          </div>
        </div>

        {/* Highlights section */}
        <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-md'>
          <TranslatedText
            text='Highlights'
            className='font-semibold mb-2 sm:mb-3 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-telenor break-words leading-tight'
            as='div'
          />
          <ul className='list-disc list-inside space-y-1 text-xs sm:text-sm font-inter'>
            {option.highlights.map((h, i) => (
              <TranslatedText
                key={i}
                text={h}
                className='text-gray-600 dark:text-gray-300 transition-all duration-200 break-words leading-tight'
                as='li'
              />
            ))}
          </ul>

          {option.gpstarOffers?.extras && (
            <>
              <TranslatedText
                text='GPStar Perks'
                className='font-semibold mb-2 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-telenor'
                as='div'
              />
              <ul className='list-disc list-inside space-y-1 text-xs sm:text-sm font-inter'>
                {option.gpstarOffers.extras.map((x, i) => (
                  <TranslatedText
                    key={i}
                    text={x}
                    className='text-blue-600 dark:text-blue-400 font-medium transition-all duration-200 break-words leading-tight'
                    as='li'
                  />
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Itinerary section */}
        <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-md'>
          <TranslatedText
            text='Sample Itinerary'
            className='font-semibold mb-2 sm:mb-3 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-telenor'
            as='div'
          />
          <ol className='list-decimal list-inside space-y-1 text-xs sm:text-sm font-inter'>
            {option.itinerary.map((d, i) => (
              <TranslatedText
                key={i}
                text={d}
                className='text-gray-600 dark:text-gray-300 transition-all duration-200 break-words leading-tight'
                as='li'
              />
            ))}
          </ol>
        </div>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className='text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-xs sm:text-sm font-medium mb-3 sm:mb-4 transition-all duration-300 cursor-pointer font-inter'
        >
          <TranslatedText
            text={showBreakdown ? "Hide Cost Details" : "Show Cost Details"}
          />
        </button>
        {/* Budget Allocation with Hover Tooltips */}
        {showBreakdown && (
        <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-800 transition-all duration-300 shadow-md'>
          <TranslatedText
            text='Budget Allocation (BDT)'
            className='font-semibold mb-3 text-xs sm:text-sm text-blue-800 dark:text-blue-200 font-telenor'
            as='div'
          />

          {/* Budget Breakdown Bars */}
          <div className='space-y-3'>
                                     {/* Flight */}
            <div className='relative group/flight'>
              <div className='flex justify-between text-xs sm:text-sm mb-1'>
                <TranslatedText
                  text='Flight'
                  className='text-blue-700 dark:text-blue-300 font-medium'
                />
                <span className='font-semibold text-blue-800 dark:text-blue-200'>
                  {fmtBDT(breakdown.flight)}
                </span>
              </div>
              <div className='w-full bg-blue-200 dark:bg-blue-700 rounded-full h-2 group-hover/flight:bg-blue-300 dark:group-hover/flight:bg-blue-600 transition-all duration-300'>
                <div
                  className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                  style={{
                    width: `${(breakdown.flight / breakdown.total) * 100}%`,
                  }}
                ></div>
              </div>
              {/* Flight Tooltip */}
              <div className='
                absolute bottom-full left-0 right-0 mb-2 
                px-3 py-2 bg-blue-900 text-white text-xs rounded-lg 
                opacity-0 group-hover/flight:opacity-100 transition-opacity duration-300 
                pointer-events-none z-[999999] text-center shadow-lg
              '>
                <TranslatedText text='International flights typically cost 40-60% of total budget. Domestic flights are 15-25%.' />
                <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-900'></div>
              </div>
            </div>

                        {/* Hotel */}
            <div className='relative group/hotel'>
              <div className='flex justify-between text-xs sm:text-sm mb-1'>
                <TranslatedText
                  text='Hotel'
                  className='text-green-700 dark:text-green-300 font-medium'
                />
                <span className='font-semibold text-green-800 dark:text-green-200'>
                  {fmtBDT(breakdown.hotel)}
                </span>
              </div>
              <div className='w-full bg-green-200 dark:bg-green-700 rounded-full h-2 group-hover/hotel:bg-green-300 dark:group-hover/hotel:bg-green-600 transition-all duration-300'>
                <div
                  className='bg-green-500 h-2 rounded-full transition-all duration-300'
                  style={{
                    width: `${(breakdown.hotel / breakdown.total) * 100}%`,
                  }}
                ></div>
              </div>
               {/* Hotel Tooltip */}
               <div className='
                 absolute bottom-full left-0 right-0 mb-2 
                 px-3 py-2 bg-green-900 text-white text-xs rounded-lg 
                 opacity-0 group-hover/hotel:opacity-100 transition-opacity duration-300 
                 pointer-events-none z-[999999] text-center shadow-lg
               '>
                 <TranslatedText text='Hotel costs vary by destination type. Premium hotels are 30-40%, budget hotels are 20-25% of total.' />
                 <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-900'></div>
               </div>
            </div>

                        {/* Activities */}
            <div className='relative group/activities'>
              <div className='flex justify-between text-xs sm:text-sm mb-1'>
                <TranslatedText
                  text='Activities'
                  className='text-purple-700 dark:text-purple-300 font-medium'
                />
                <span className='font-semibold text-purple-800 dark:text-purple-200'>
                  {fmtBDT(breakdown.activities)}
                </span>
              </div>
              <div className='w-full bg-purple-200 dark:bg-purple-700 rounded-full h-2 group-hover/activities:bg-purple-300 dark:group-hover/activities:bg-purple-600 transition-all duration-300'>
                <div
                  className='bg-purple-500 h-2 rounded-full transition-all duration-300'
                  style={{
                    width: `${(breakdown.activities / breakdown.total) * 100}%`,
                  }}
                ></div>
              </div>
               {/* Activities Tooltip */}
               <div className='
                 absolute bottom-full left-0 right-0 mb-2 
                 px-3 py-2 bg-purple-900 text-white text-xs rounded-lg 
                 opacity-0 group-hover/activities:opacity-100 transition-opacity duration-300 
                 pointer-events-none z-[999999] text-center shadow-lg
               '>
                 <TranslatedText text='Sightseeing, tours, and experiences. Usually 15-20% for cultural trips, 10-15% for beach trips.' />
                 <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-900'></div>
               </div>
            </div>

                        {/* Transport */}
            <div className='relative group/transport'>
              <div className='flex justify-between text-xs sm:text-sm mb-1'>
                <TranslatedText
                  text='Local Transport'
                  className='text-orange-700 dark:text-orange-300 font-medium'
                />
                <span className='font-semibold text-orange-800 dark:text-orange-200'>
                  {fmtBDT(breakdown.transport)}
                </span>
              </div>
              <div className='w-full bg-orange-200 dark:bg-orange-700 rounded-full h-2 group-hover/transport:bg-orange-300 dark:group-hover/transport:bg-orange-600 transition-all duration-300'>
                <div
                  className='bg-orange-500 h-2 rounded-full transition-all duration-300'
                  style={{
                    width: `${(breakdown.transport / breakdown.total) * 100}%`,
                  }}
                ></div>
              </div>
               {/* Transport Tooltip */}
               <div className='
                 absolute bottom-full left-0 right-0 mb-2 
                 px-3 py-2 bg-orange-900 text-white text-xs rounded-lg 
                 opacity-0 group-hover/transport:opacity-100 transition-opacity duration-300 
                 pointer-events-none z-[999999] text-center shadow-lg
               '>
                 <TranslatedText text='Local transportation, taxis, and transfers. Typically 8-12% of total budget for convenience.' />
                 <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-900'></div>
               </div>
            </div>

            {/* Contingency */}
            <div className='relative group/contingency'>
              <div className='flex justify-between text-xs sm:text-sm mb-1'>
                <TranslatedText
                  text='Contingency (5%)'
                  className='text-red-700 dark:text-red-300 font-medium'
                />
                <span className='font-semibold text-red-800 dark:text-red-200'>
                  {fmtBDT(breakdown.contingency)}
                </span>
              </div>
              <div className='w-full bg-red-200 dark:bg-red-700 rounded-full h-2 group-hover/contingency:bg-red-300 dark:group-hover/contingency:bg-red-600 transition-all duration-300'>
                <div
                  className='bg-red-500 h-2 rounded-full transition-all duration-300'
                  style={{
                    width: `${
                      (breakdown.contingency / breakdown.total) * 100
                    }%`,
                  }}
                ></div>
              </div>
                             {/* Contingency Tooltip */}
               <div className='
                 absolute bottom-full left-0 right-0 mb-2 
                 px-3 py-2 bg-red-900 text-white text-xs rounded-lg 
                 opacity-0 group-hover/contingency:opacity-100 transition-opacity duration-300 
                 pointer-events-none z-[999999] text-center shadow-lg
               '>
                 <TranslatedText text='5% buffer for unexpected expenses, currency fluctuations, or last-minute changes. Essential for stress-free travel.' />
                 <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-900'></div>
               </div>
            </div>
          </div>

          {/* Total Summary */}
          <div className='mt-4 pt-3 border-t border-blue-200 dark:border-blue-700'>
            <div className='flex justify-between items-center'>
              <TranslatedText
                text='Total Budget:'
                className='text-lg font-bold text-blue-800 dark:text-blue-200'
              />
              <span className='text-xl font-bold text-blue-900 dark:text-blue-100'>
                {fmtBDT(breakdown.total)}
              </span>
            </div>
            <div className='text-center mt-2'>
              <TranslatedText
                text={`Per person: ${fmtBDT(
                  Math.round(breakdown.total / people)
                )}`}
                className='text-sm text-blue-600 dark:text-blue-300 font-medium'
              />
              </div>
            </div>
          </div>
        )}

        {/* Toggle button for detailed cost breakdown */}

        {/* Detailed Cost Breakdown (Collapsible) */}

        {/* Savings info - more subtle */}
        {(breakdown.savingsFlight > 0 || breakdown.savingsHotel > 0) && (
          <div className='mb-4 sm:mb-6 p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg sm:rounded-xl border border-green-200 dark:border-green-800 transition-all duration-300 shadow-md'>
            <div className='text-center'>
              <TranslatedText
                text='GPStar Savings!'
                className='text-base sm:text-lg font-bold text-green-700 dark:text-green-400 font-telenor'
                as='div'
              />
              <div className='text-xs sm:text-sm text-green-600 dark:text-green-400 font-inter'>
                <TranslatedText text='Flight' />:{" "}
                {fmtBDT(breakdown.savingsFlight)} |{" "}
                <TranslatedText text='Hotel' />:{" "}
                {fmtBDT(breakdown.savingsHotel)}
              </div>
            </div>
          </div>
        )}

        {/* Button - positioned at bottom */}
        <div className='mt-auto pt-3 sm:pt-4'>
          <TranslatedButton
            onClick={() => onViewDetails(option)}
            normalText='View Details'
            isLoading={false}
            className='w-full bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-700 hover:to-slate-700 dark:from-slate-600 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-800 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer text-xs sm:text-sm font-inter'
          />
        </div>
      </div>
    </div>
  );
}

export default TripCard;
