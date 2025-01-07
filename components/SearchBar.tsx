import { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  suggestions: string[];
}

export default function SearchBar({ searchTerm, setSearchTerm, suggestions }: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const highlightMatch = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800">{part}</span> : part
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search for GitHub repositories..."
        className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
        suppressHydrationWarning={true}  // Adding suppressHydrationWarning here
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg mt-1 shadow-lg" suppressHydrationWarning={true}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setSearchTerm(suggestion);
                setShowSuggestions(false);
              }}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {highlightMatch(suggestion, searchTerm)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


