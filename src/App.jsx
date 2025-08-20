import React, { useState } from 'react';
import './App.css';

// Import components
import { BudgetForm, TripCard, ErrorMessage, EmptyState, ThemeToggle } from './components';
import TranslatedText from './components/TranslatedText';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import LanguageToggle from './components/LanguageToggle';

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
    console.log('Generating suggestions, current count:', suggestions.length);
    setError('');
    setIsLoading(true);
    
    // If there are existing suggestions, fade them out one by one
    if (suggestions.length > 0) {
      console.log('Starting staggered exit animation...');
      
      // Copy current suggestions to exiting state
      setExitingSuggestions([...suggestions]);
      setSuggestions([]); // Clear current suggestions immediately
      
      // Start fading out cards one by one
      const exitDelay = 100; // 100ms between each card exit
      
      // After all cards have started exiting, wait for animation to complete
      setTimeout(() => {
        console.log('All cards exited, generating new suggestions...');
        setExitingSuggestions([]); // Remove exiting cards
        setTransitionKey(prev => prev + 1);
        
        // Generate new suggestions
        setTimeout(() => {
          const result = generateTripSuggestions(budgetBDT, people, ALL_TRIP_OPTIONS);
          setError(result.error);
          setSuggestions(result.suggestions);
          setIsLoading(false);
        }, 100);
      }, (suggestions.length * exitDelay) + 800); // Wait for all exits + animation duration
      
    } else {
      // No existing suggestions, generate immediately
      console.log('No existing suggestions, generating immediately...');
      setTimeout(() => {
        const result = generateTripSuggestions(budgetBDT, people, ALL_TRIP_OPTIONS);
        setError(result.error);
        setSuggestions(result.suggestions);
        setIsLoading(false);
      }, 800);
    }
  };

  const handleViewDetails = (option) => {
    // You can implement detailed view functionality here
    console.log('View details for:', option.name);
  };

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
            <div className="absolute inset-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
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
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12"
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
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}

export default App;
