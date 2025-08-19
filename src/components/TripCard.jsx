import React, { useState } from 'react';
import { fmtBDT } from '../constants/tripData.js';
import { breakdownBDT } from '../utils/calculations.js';

function TripCard({ option, people, onViewDetails }) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const breakdown = breakdownBDT(option);

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] h-full flex flex-col group">
      {/* Header - more subtle */}
      <div className="bg-gradient-to-r from-teal-600 to-slate-600 dark:from-slate-700 dark:to-slate-800 p-6 text-white transition-all duration-500">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold transition-all duration-300 font-telenor">{option.name}</h3>
          <span className={`text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300 ${
            option.type === 'International' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
              : option.type === 'Domestic' 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
          }`}>
            {option.type}
          </span>
        </div>
        <p className="text-teal-100 dark:text-slate-200 text-sm opacity-90 transition-all duration-300 font-inter">{option.stay}</p>
        {option.nights > 0 && (
          <span className="text-teal-200 dark:text-slate-300 text-sm transition-all duration-300 font-inter">
            {option.nights} night{option.nights > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Key highlights - more subtle colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 transition-all duration-300 shadow-md">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {fmtBDT(breakdown.total)}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium font-inter">Total Cost</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 transition-all duration-300 shadow-md">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {fmtBDT(Math.round(breakdown.total / people))}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 font-medium font-inter">Per Person</div>
          </div>
        </div>

        {/* Highlights section */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-md">
          <div className="font-semibold mb-3 text-sm text-gray-800 dark:text-gray-200 font-telenor">Highlights</div>
          <ul className="list-disc list-inside space-y-1 text-sm font-inter">
            {option.highlights.map((h, i) => (
              <li key={i} className="text-gray-600 dark:text-gray-300 transition-all duration-200">{h}</li>
            ))}
          </ul>
          
          {option.gpstarOffers?.extras && (
            <>
              <div className="font-semibold mb-2 mt-4 text-sm text-gray-800 dark:text-gray-200 font-telenor">GPStar Perks</div>
              <ul className="list-disc list-inside space-y-1 text-sm font-inter">
                {option.gpstarOffers.extras.map((x, i) => (
                  <li key={i} className="text-blue-600 dark:text-blue-400 font-medium transition-all duration-200">{x}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Itinerary section */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-md">
          <div className="font-semibold mb-3 text-sm text-gray-800 dark:text-gray-200 font-telenor">Sample Itinerary</div>
          <ol className="list-decimal list-inside space-y-1 text-sm font-inter">
            {option.itinerary.map((d, i) => (
              <li key={i} className="text-gray-600 dark:text-gray-300 transition-all duration-200">{d}</li>
            ))}
          </ol>
        </div>

        {/* Breakdown toggle */}
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm font-medium mb-4 transition-all duration-300 cursor-pointer font-inter"
        >
          {showBreakdown ? 'Hide' : 'Show'} Cost Breakdown
        </button>

        {/* Cost breakdown with slide animation */}
        {showBreakdown && (
          <div className="space-y-3 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 animate-fade-in shadow-md">
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600 dark:text-gray-300">Flight Cost:</span>
              <span className="font-medium text-gray-900 dark:text-white">{fmtBDT(breakdown.flight)}</span>
            </div>
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600 dark:text-gray-300">Hotel Cost:</span>
              <span className="font-medium text-gray-900 dark:text-white">{fmtBDT(breakdown.hotel)}</span>
            </div>
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600 dark:text-gray-300">Activities:</span>
              <span className="font-medium text-gray-900 dark:text-white">{fmtBDT(breakdown.activities)}</span>
            </div>
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600 dark:text-gray-300">Transport Cost:</span>
              <span className="font-medium text-gray-900 dark:text-white">{fmtBDT(breakdown.transport)}</span>
            </div>
            <div className="flex justify-between text-sm font-inter">
              <span className="text-gray-600 dark:text-gray-300">Contingency (5%):</span>
              <span className="font-medium text-gray-900 dark:text-white">{fmtBDT(breakdown.contingency)}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
              <div className="flex justify-between text-sm font-semibold font-inter">
                <span className="text-gray-800 dark:text-gray-200">Total:</span>
                <span className="text-gray-700 dark:text-gray-300">{fmtBDT(breakdown.total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Savings info - more subtle */}
        {(breakdown.savingsFlight > 0 || breakdown.savingsHotel > 0) && (
          <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 transition-all duration-300 shadow-md">
            <div className="text-center">
              <div className="text-lg font-bold text-green-700 dark:text-green-400 font-telenor">
                GPStar Savings!
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-inter">
                Flight: {fmtBDT(breakdown.savingsFlight)} | Hotel: {fmtBDT(breakdown.savingsHotel)}
              </div>
            </div>
          </div>
        )}

        {/* Button - positioned at bottom */}
        <div className="mt-auto pt-4">
          <button
            onClick={() => onViewDetails(option)}
            className="w-full bg-gradient-to-r from-teal-600 to-slate-600 hover:from-teal-700 hover:to-slate-700 dark:from-slate-600 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer font-inter"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
