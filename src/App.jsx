import React, { useState } from 'react';
import './App.css';

// Import components
import { BudgetForm, TripCard, ErrorMessage, EmptyState, ThemeToggle } from './components';
import PWAInstallPrompt from './components/PWAInstallPrompt';

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
      <div className="fixed top-8 right-4 z-10 ">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <BudgetForm
          budgetBDT={budgetBDT}
          setBudgetBDT={setBudgetBDT}
          people={people}
          setPeople={setPeople}
          onGenerate={handleGenerateSuggestions}
          isLoading={isLoading}
        />
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 text-red-700 dark:text-red-300 font-inter">
            {error}
          </div>
        )}
        
        {suggestions.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6 font-telenor">
              Your Trip Suggestions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {suggestions.map((opt, idx) => (
                <TripCard 
                  key={`${opt.name}-${idx}-${transitionKey}`}
                  option={opt} 
                  people={people}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State with fade in */}
        {suggestions.length === 0 && exitingSuggestions.length === 0 && !error && !isLoading && (
          <div className="animate-fade-in w-full">
            <EmptyState />
          </div>
        )}
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}

export default App;
