import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const LocationFilter = ({ locations, onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(locations && locations.length > 0 ? locations[0] : "");
  const [query, setQuery] = useState("");

  const filteredLocations =
  query === ""
    ? (locations || [])
    : (locations || []).filter((location) =>
        location.toLowerCase().includes(query.toLowerCase())
      );


  const clearSelection = () => {
    setSelectedLocation("");
    setQuery("");
    onLocationSelect("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Combobox
        value={selectedLocation}
        onChange={(location) => {
          setSelectedLocation(location);
          onLocationSelect(location);
        }}
      >
        <div className="relative">
          <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-black"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(location) => location}
            placeholder="Select a location"
            value={selectedLocation}
          />
          {selectedLocation && (
            <button
              onClick={clearSelection}
              className="absolute inset-y-0 right-8 flex items-center pr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6.75 6.75 10.5 10.5m0-10.5-10.5 10.5"
                />
              </svg>
            </button>
          )}
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredLocations.map((location, locationIdx) => (
                <Combobox.Option
                  key={locationIdx}
                  value={location}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-lightblue text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {location}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default LocationFilter;
