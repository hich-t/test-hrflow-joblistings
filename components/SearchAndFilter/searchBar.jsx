import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="w-full max-w-md sm:mr-10 mb-6 sm:mb-0">
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-black"
        placeholder="Search jobs..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
