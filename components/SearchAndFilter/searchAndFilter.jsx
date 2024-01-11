import React from 'react';
import CompanyFilter from './CompanyFilter';
import LocationFilter from './LocationFilter';
import SearchBar from './SearchBar';

const SearchAndFilter = ({ onFilterChange }) => {
  return (
    <div className="mt-12 mb-12 flex flex-col sm:flex-row items-center justify-center gap-8">
      <div>
        <h1 className="text-left mb-4 font-quick font-light text-xl">
          Search jobs
        </h1>
        <SearchBar onSearch={(query) => onFilterChange({ query })} />
      </div>

      <div>
        <h1 className="text-left mb-4 font-quick font-light text-xl">
          Filter by ...
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <CompanyFilter onCompanySelect={(company) => onFilterChange({ company })} />
          <LocationFilter onLocationSelect={(location) => onFilterChange({ location })} />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
