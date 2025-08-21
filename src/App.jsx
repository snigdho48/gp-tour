import React, { useState } from 'react';
import './App.css';

// Import components
import { BudgetForm, TripCard, ErrorMessage, EmptyState, ThemeToggle, GPStarOfferCategories, TermsAndConditions, HowToBeGPStar } from './components';
import TranslatedText from './components/TranslatedText';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import LanguageToggle from './components/LanguageToggle';
import LoadingOverlay from './components/LoadingOverlay';

// Import constants and utilities
import { ALL_TRIP_OPTIONS } from './constants/tripData.js';
import { generateTripSuggestions } from './utils/calculations.js';

// Main App Component
function App() {
  const [budgetBDT, setBudgetBDT] = useState('');
  const [people, setPeople] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [exitingSuggestions, setExitingSuggestions] = useState([]);
  const [transitionKey, setTransitionKey] = useState(0);

  // Generate trip suggestions using the utility function
  const handleGenerateSuggestions = () => {
    setError('');
    setIsLoading(true);
    
    // If there are existing suggestions, fade them out one by one
    if (suggestions.length > 0) {
      
      // Copy current suggestions to exiting state
      setExitingSuggestions([...suggestions]);
      setSuggestions([]); // Clear current suggestions immediately
      
      // Start fading out cards one by one
      const exitDelay = 100; // 100ms between each card exit
      
      // After all cards have started exiting, wait for animation to complete
      setTimeout(() => {
        setExitingSuggestions([]); // Remove exiting cards
        setTransitionKey(prev => prev + 1);
        
                 // Generate new suggestions
         setTimeout(() => {
          let peopleCount = parseInt(people) || 1;
          if(people === '' || peopleCount <= 0){
            peopleCount = 1;
            setPeople(1);
          }
           const result = generateTripSuggestions(budgetBDT, peopleCount, ALL_TRIP_OPTIONS);
           setError(result.error);
           setSuggestions(result.suggestions);
           setIsLoading(false);
         }, 2000); // Show loading for exactly 2 seconds
       }, (suggestions.length * exitDelay) + 800); // Wait for all exits + animation duration
      
         } else {
       // No existing suggestions, generate immediately
       console.log('No existing suggestions, generating immediately...');
       setTimeout(() => {
         let peopleCount = parseInt(people) || 1;
         if(people === '' || peopleCount <= 0){
           peopleCount = 1;
           setPeople(1);
         }
         const result = generateTripSuggestions(budgetBDT, peopleCount, ALL_TRIP_OPTIONS);
         setError(result.error);
         setSuggestions(result.suggestions);
         setIsLoading(false);
       }, 2000); // Show loading for exactly 2 seconds
     }
  };

  const handleViewDetails = (option) => {
    // You can implement detailed view functionality here
    console.log('View details for:', option.name);
  };

  const clearSuggestions = () => {
    setSuggestions([]);
    setExitingSuggestions([]);
    setError('');
  };

  const [showTerms, setShowTerms] = useState(false);
  const [showHowToBeGPStar, setShowHowToBeGPStar] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
             {/* Theme Toggle Button */}
       <div className="fixed top-4 right-4 z-10 sm:top-8">
         <ThemeToggle />
       </div>
       
       {/* Language Toggle Button */}
       <div className="fixed top-4 left-4 z-10 sm:top-8">
         <LanguageToggle />
       </div>
      
      <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 max-w-6xl">
        <BudgetForm
          budgetBDT={budgetBDT}
          setBudgetBDT={setBudgetBDT}
          people={people}
          setPeople={setPeople}
          onGenerate={handleGenerateSuggestions}
          isLoading={isLoading}
          suggestions={suggestions}
          clearSuggestions={clearSuggestions}
        />
        
                 {error && (
           <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-red-700 dark:text-red-300 font-inter text-sm">
             <TranslatedText text={error} />
           </div>
         )}
        
        {/* Results Container - maintains consistent height */}
        <div className="relative min-h-[600px] w-full">
          
          {/* Exiting Cards - fade out one by one with absolute positioning */}
          {exitingSuggestions.length > 0 && (
            <div className="absolute inset-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
              {exitingSuggestions.map((opt, idx) => (
                <div
                  key={`exiting-${opt.name}-${idx}`}
                  className="animate-fade-out"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <TripCard 
                    option={opt} 
                    people={people}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          )}

          {/* New Cards - fade in one by one */}
          {suggestions.length > 0 && (
            <div 
              key={`grid-${transitionKey}`}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-3 lg:gap-4 xl:gap-6"
            >
              {suggestions.map((opt, idx) => (
                <div
                  key={`${opt.name}-${idx}-${transitionKey}`}
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: `${idx * 150}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <TripCard 
                    option={opt} 
                    people={people}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty State with fade in */}
          {suggestions.length === 0 && exitingSuggestions.length === 0 && !error && !isLoading && (
            <div className="animate-fade-in w-full">
              <EmptyState />
            </div>
          )}
        </div>

        {/* GPStar Offer Categories Section - Displayed after trip suggestions */}
        {suggestions.length > 0 && <GPStarOfferCategories />}
      </div>
      
      {/* Footer Links */}
      <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
          <button
            onClick={() => setShowTerms(true)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 font-inter underline"
          >
            Terms & Conditions
          </button>
          <a
            href="#how-to-be-gpstar"
            onClick={(e) => {
              e.preventDefault();
              setShowHowToBeGPStar(true);
            }}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 font-inter underline"
          >
            How to be a GPStar
          </a>
        </div>
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
      
      {/* Loading Overlay */}
      {isLoading && (
         
          <LoadingOverlay />
       
      )}
      
      {/* Terms & Conditions Popup */}
      <TermsAndConditions isOpen={showTerms} onClose={() => setShowTerms(false)} />
      
      {/* How to be a GPStar Popup */}
      <HowToBeGPStar isOpen={showHowToBeGPStar} onClose={() => setShowHowToBeGPStar(false)} />
    </div>
  );
}

export default App;
