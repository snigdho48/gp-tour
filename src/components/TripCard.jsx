import React, { useState } from 'react';
import { fmtBDT } from '../constants/tripData.js';
import { breakdownBDT } from '../utils/calculations.js';
import TranslatedText from './TranslatedText';
import TranslatedButton from './TranslatedButton';

function TripCard({ option, people, onViewDetails }) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const breakdown = breakdownBDT(option);

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] h-full flex flex-col group">
      {/* Header - more subtle */}
      <div className="bg-gradient-to-r from-teal-600 to-slate-600 dark:from-slate-700 dark:to-slate-800 p-4 sm:p-6 text-white transition-all duration-500">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <TranslatedText 
            text={option.name}
            className="text-lg sm:text-xl font-bold transition-all duration-300 font-telenor flex-1 min-w-0 truncate"
            as="h3"
          />
          <TranslatedText 
            text={option.type}
            className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300 flex-shrink-0 whitespace-nowrap ${
              option.type === 'International' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : option.type === 'Domestic' 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
            }`}
            as="span"
          />
        </div>
        <TranslatedText 
          text={option.stay}
          className="text-teal-100 dark:text-slate-200 text-xs sm:text-sm opacity-90 transition-all duration-300 font-inter"
          as="p"
        />
        {option.nights > 0 && (
          <TranslatedText 
            text={`${option.nights} night${option.nights > 1 ? 's' : ''}`}
            className="text-teal-200 dark:text-slate-300 text-xs sm:text-sm transition-all duration-300 font-inter"
            as="span"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {/* Key highlights - more subtle colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="text-center p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-800 transition-all duration-300 shadow-md">
            <div className="text-lg sm:text-2xl font-bold text-blue-700 dark:text-blue-300">
              {fmtBDT(breakdown.total)}
            </div>
            <TranslatedText 
              text="Total Cost"
              className="text-xs text-blue-600 dark:text-blue-400 font-medium font-inter"
              as="div"
            />
          </div>
          <div className="text-center p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg sm:rounded-xl border border-green-200 dark:border-green-800 transition-all duration-300 shadow-md">
            <div className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
              {fmtBDT(Math.round(breakdown.total / people))}
            </div>
            <TranslatedText 
              text="Per Person"
              className="text-xs text-green-600 dark:text-green-400 font-medium font-inter"
              as="div"
            />
          </div>
        </div>

        {/* Highlights section */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-md">
          <TranslatedText 
            text="Highlights"
            className="font-semibold mb-2 sm:mb-3 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-telenor"
            as="div"
          />
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm font-inter">
            {option.highlights.map((h, i) => (
              <TranslatedText 
                key={i}
                text={h}
                className="text-gray-600 dark:text-gray-300 transition-all duration-200"
                as="li"
              />
            ))}
          </ul>
          
          {option.gpstarOffers?.extras && (
            <>
              <TranslatedText 
                text="GPStar Perks"
                className="font-semibold mb-2 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-telenor"
                as="div"
              />
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm font-inter">
                {option.gpstarOffers.extras.map((x, i) => (
                  <TranslatedText 
                    key={i}
                    text={x}
                    className="text-blue-600 dark:text-blue-400 font-medium transition-all duration-200"
                    as="li"
                  />
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Itinerary section */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-md">
          <TranslatedText 
            text="Sample Itinerary"
            className="font-semibold mb-2 sm:mb-3 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-telenor"
            as="div"
          />
          <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm font-inter">
            {option.itinerary.map((d, i) => (
              <TranslatedText 
                key={i}
                text={d}
                className="text-gray-600 dark:text-gray-300 transition-all duration-200"
                as="li"
              />
            ))}
          </ol>
        </div>

        {/* Breakdown toggle */}
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-xs sm:text-sm font-medium mb-3 sm:mb-4 transition-all duration-300 cursor-pointer font-inter"
        >
          <TranslatedText text={showBreakdown ? 'Hide Cost Breakdown' : 'Show Cost Breakdown'} />
        </button>

        {/* Cost breakdown with slide animation */}
        {showBreakdown && (
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 animate-fade-in shadow-md">
            <div className="flex justify-between text-xs sm:text-sm font-inter">
              <TranslatedText text="Flight Cost:" className="text-gray-600 dark:text-gray-300" />
              <span className="font-medium text-gray-900 dark:text-white">{fmtBDT(breakdown.flight)}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm font-inter">
              <TranslatedText text="Hotel Cost:" className="text-gray-600 dark:text-gray-300" />
              <span className="font-medium text-gray-900 dark:text-white">{fmtBDT(breakdown.hotel)}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm font-inter">
              <TranslatedText text="Activities:" className="text-gray-600 dark:text-gray-300" />
              <span className="font-medium text-gray-900 dark:text-white">{fmtBDT(breakdown.activities)}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm font-inter">
              <TranslatedText text="Transport Cost:" className="text-gray-600 dark:text-gray-300" />
              <span className="font-medium text-gray-900 dark:text-white">{fmtBDT(breakdown.transport)}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm font-inter">
              <TranslatedText text="Contingency (5%):" className="text-gray-600 dark:text-gray-300" />
              <span className="font-medium text-gray-900 dark:text-white">{fmtBDT(breakdown.contingency)}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
              <div className="flex justify-between text-xs sm:text-sm font-semibold font-inter">
                <TranslatedText text="Total:" className="text-gray-800 dark:text-gray-200" />
                <span className="text-gray-700 dark:text-gray-300">{fmtBDT(breakdown.total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Savings info - more subtle */}
        {(breakdown.savingsFlight > 0 || breakdown.savingsHotel > 0) && (
          <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg sm:rounded-xl border border-green-200 dark:border-green-800 transition-all duration-300 shadow-md">
            <div className="text-center">
              <TranslatedText 
                text="GPStar Savings!"
                className="text-base sm:text-lg font-bold text-green-700 dark:text-green-400 font-telenor"
                as="div"
              />
              <TranslatedText 
                text={`Flight: ${fmtBDT(breakdown.savingsFlight)} | Hotel: ${fmtBDT(breakdown.savingsHotel)}`}
                className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-inter"
                as="div"
              />
            </div>
          </div>
        )}

        {/* Button - positioned at bottom */}
        <div className="mt-auto pt-3 sm:pt-4">
          <TranslatedButton
            onClick={() => onViewDetails(option)}
            normalText="View Details"
            isLoading={false}
            className="w-full bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-700 hover:to-slate-700 dark:from-slate-600 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-800 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer text-xs sm:text-sm font-inter"
          />
        </div>
      </div>
    </div>
  );
}

export default TripCard;
