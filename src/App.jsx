import { useState } from 'react';
import './App.css';
import './darkMode.css';

// Import components
import { BudgetForm, TripCard, ErrorMessage, EmptyState, ThemeToggle } from './components';

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

  // Generate trip suggestions using the utility function
  const handleGenerateSuggestions = () => {
    setError('');
    setSuggestions([]);
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const result = generateTripSuggestions(budgetBDT, people, ALL_TRIP_OPTIONS);
      setError(result.error);
      setSuggestions(result.suggestions);
      setIsLoading(false);
    }, 800);
  };

  const handleViewDetails = (option) => {
    // You can implement detailed view functionality here
    console.log('View details for:', option.name);
  };

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <ThemeToggle />
        
        <BudgetForm 
          budgetBDT={budgetBDT}
          setBudgetBDT={setBudgetBDT}
          people={people}
          setPeople={setPeople}
          onGenerate={handleGenerateSuggestions}
          isLoading={isLoading}
        />

        <ErrorMessage message={error} />

        {/* Results Grid with smooth animations */}
        {suggestions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {suggestions.map((opt, idx) => (
              <div
                key={idx}
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
        {suggestions.length === 0 && !error && (
          <div className="animate-fade-in">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
