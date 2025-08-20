import React from 'react';
import { fmtBDT } from '../constants/tripData.js';
import { breakdownBDT } from '../utils/calculations.js';
import TranslatedText from './TranslatedText';

const TripPlan = ({ option, people, onClose }) => {
  const breakdown = breakdownBDT(option);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-slate-600 dark:from-slate-700 dark:to-slate-800 p-6 text-white rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold font-telenor mb-2">
                <TranslatedText text={option.name} />
              </h2>
              <p className="text-teal-100 dark:text-slate-200">
                <TranslatedText text={option.type} /> • <TranslatedText text={option.stay} />
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-teal-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Budget Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {fmtBDT(breakdown.total)}
              </div>
              <TranslatedText text="Total Cost" className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {fmtBDT(Math.round(breakdown.total / people))}
              </div>
              <TranslatedText text="Per Person" className="text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {option.nights}
              </div>
              <TranslatedText text="Nights" className="text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          {/* Detailed Itinerary */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white font-telenor">
              <TranslatedText text="Detailed Itinerary" />
            </h3>
            
            {/* Getting There */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                <TranslatedText text="Getting There" />
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                <TranslatedText text={option.gettingThere || 'Flight details will be provided based on your preferences'} />
              </p>
            </div>

            {/* Stay Options */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                <TranslatedText text="Stay Suggestions" />
              </h4>
              <div className="space-y-2">
                {option.stayOptions?.map((hotel, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-gray-600 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">
                      <TranslatedText text={hotel.name} />
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {fmtBDT(hotel.pricePerNight)}/<TranslatedText text="night" />
                    </span>
                  </div>
                )) || (
                  <p className="text-gray-600 dark:text-gray-300">
                    <TranslatedText text="Hotel options will be provided based on your budget" />
                  </p>
                )}
              </div>
            </div>

            {/* Places to Visit */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                <TranslatedText text="Places to Visit" />
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                {option.places?.map((place, index) => (
                  <li key={index}>
                    <TranslatedText text={place} />
                  </li>
                )) || (
                  <li><TranslatedText text="Popular attractions will be listed based on your destination" /></li>
                )}
              </ul>
            </div>

            {/* Food & Shopping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  <TranslatedText text="Top Places to Eat" />
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  {option.food?.map((restaurant, index) => (
                    <li key={index}>
                      <TranslatedText text={restaurant} />
                    </li>
                  )) || (
                    <li><TranslatedText text="Local cuisine recommendations" /></li>
                  )}
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  <TranslatedText text="Shopping" />
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  {option.shopping?.map((item, index) => (
                    <li key={index}>
                      <TranslatedText text={item} />
                    </li>
                  )) || (
                    <li><TranslatedText text="Local market suggestions" /></li>
                  )}
                </ul>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                <TranslatedText text="Don't Miss & Tips" />
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                {option.tips?.map((tip, index) => (
                  <li key={index}>
                    <TranslatedText text={tip} />
                  </li>
                )) || (
                  <li><TranslatedText text="Essential travel tips for your destination" /></li>
                )}
              </ul>
            </div>
          </div>

          {/* GPStar Offers */}
          {option.gpstarOffers && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 font-telenor">
                <TranslatedText text="GPStar Exclusive Offers" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(option.gpstarOffers).map(([category, offer]) => (
                  <div key={category} className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                      <TranslatedText text={offer.name} />
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <TranslatedText text={offer.description} />
                    </p>
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                      <TranslatedText text="Explore Offers" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
            >
              <TranslatedText text="Close" />
            </button>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <TranslatedText text="Book Now" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlan;
