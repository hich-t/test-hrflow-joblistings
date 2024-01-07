"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { getJobs } from "../api/api.js";
import LocationFilter from "../components/locationFilter.jsx";
import CompanyFilter from "../components/companyFilter.jsx";
import SearchBar from "../components/searchBar.jsx";
import JobModal from "../components/jobModal";
import ReactPaginate from "react-paginate";
import Spinner from "../components/spinner";

const HomePage = () => {
  // data handling and pagination

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);

  const uniqueCompaniesArray = [...new Set(jobs.map((job) => job.companyName))];
  const uniqueLocationsArray = [...new Set(jobs.map((job) => job.location))];

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company === "" ? null : company);
  };
  const handleLocationSelect = (location) => {
    setSelectedLocation(location === "" ? null : location);
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = jobs.filter((job) => {
      return (
        job.jobTitle.toLowerCase().includes(lowercasedQuery) ||
        job.companyName.toLowerCase().includes(lowercasedQuery) ||
        job.location.toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredJobs(filtered);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
        setFilteredJobs(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Filter logic
    let filtered = jobs;

    if (selectedCompany) {
      filtered = filtered.filter((job) => job.companyName === selectedCompany);
    }

    if (selectedLocation) {
      filtered = filtered.filter((job) => job.location === selectedLocation);
    }

    setFilteredJobs(filtered);
  }, [jobs, selectedCompany, selectedLocation]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 30;

  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);
  const jobsDisplayed = filteredJobs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // darkmode handling

  const [isDarkMode, setIsDarkMode] = useState(false);
  const bgColor = isDarkMode ? "bg-darkblue" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-darkblue";
  const bgColor2 = isDarkMode ? "bg-midblue" : "bg-white";

  // modal handling

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <main className={`flex ${bgColor} items-center flex-col min-h-screen`}>
      {/* top bar menu start */}
      {/* larger screen menu */}
      <div className="bg-gradient-to-r from-midblue to-lightblue w-full p-12">
        <div className="hidden sm:flex items-center justify-between">
          <img
            className="w-32 sm:w-36"
            src="Assets/images/hrflow_logo.png"
            alt="Logo HrFlow.ai"
          />
          <h1 className="font-quick font-normal text-5xl">Job Listings</h1>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 w-6 sm:w-10 h-6 sm:h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>

            <Switch
              checked={isDarkMode}
              onChange={setIsDarkMode}
              className={`${isDarkMode ? "bg-darkblue" : "bg-teal-300"}
                    relative inline-flex h-[19px] sm:h-[38px] w-[37px] sm:w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <span className="sr-only">Toggle Dark Mode</span>
              <span
                aria-hidden="true"
                className={`${
                  isDarkMode
                    ? "translate-x-4 sm:translate-x-9"
                    : "translate-x-0"
                }
                    mt-[-2px] sm:mt-0  pointer-events-none inline-block h-[20px] sm:h-[34px] w-[20px] sm:w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-2 w-6 sm:w-9 h-6 sm:h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </div>
        </div>

        {/* mobile top menu  */}

        <div className="sm:hidden">
          <div className="flex justify-between items-center mb-4">
            <img
              className="w-32"
              src="Assets/images/hrflow_logo.png"
              alt="Logo HrFlow.ai"
            />
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 w-6 sm:w-10 h-6 sm:h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>

              <Switch
                checked={isDarkMode}
                onChange={setIsDarkMode}
                className={`${isDarkMode ? "bg-darkblue" : "bg-teal-300"}
                    relative inline-flex h-[19px] sm:h-[38px] w-[37px] sm:w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
              >
                <span className="sr-only">Toggle Dark Mode</span>
                <span
                  aria-hidden="true"
                  className={`${
                    isDarkMode
                      ? "translate-x-4 sm:translate-x-9"
                      : "translate-x-0"
                  }
                    mt-[-2px] sm:mt-0  pointer-events-none inline-block h-[20px] sm:h-[34px] w-[20px] sm:w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 w-6 sm:w-9 h-6 sm:h-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </div>
          </div>
          <h1 className="font-quick font-normal text-3xl text-center mt-10">
            Job Listings
          </h1>
        </div>
      </div>
      {/* top bar menu end */}
      {/* filter and search area start */}
      <div className="mt-12 mb-12 flex flex-col sm:flex-row items-center justify-center gap-8">
        <div>
          <h1
            className={`text-left mb-4 font-quick font-light text-xl ${textColor} `}
          >
            Search jobs
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div>
          <h1
            className={`text-left mb-4 font-quick font-light text-xl ${textColor} `}
          >
            Filter by ...
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <CompanyFilter
              companies={uniqueCompaniesArray}
              onCompanySelect={handleCompanySelect}
            />
            <LocationFilter
              locations={uniqueLocationsArray}
              onLocationSelect={handleLocationSelect}
            />
          </div>
        </div>
      </div>
      {/* filter area end */}
      {/* jobs listing area start */}
      {isLoading ? (
        <Spinner textColor={textColor} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {jobsDisplayed.map((job) => (
            <div
              key={job.id}
              onClick={() => openModal(job)}
              className={`p-4 ${bgColor} m-12 w-72 h-60 flex cursor-pointer flex-col justify-between rounded-xl transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? "shadow-light hover:shadow-hover-light"
                  : "shadow-dark hover:shadow-hover-dark"
              } 
  `}
            >
              <div className="flex flex-col items-center justify-center">
                <h1
                  className={`${textColor} text-xl font-quick text-center font-bold mb-8`}
                >
                  {job.jobTitle}
                </h1>

                <div className="flex items-center justify-center text-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 mr-2 ${textColor}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <h1 className={`${textColor} font-quick font-bold text-md`}>
                    {job.companyName}
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 mr-2 ${textColor}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <p className={`${textColor} font-quick font-normal`}>
                    {job.location}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="w-full pt-2 border-t border-gray-300">
                <p
                  className={`${textColor} font-quick font-normal text-sm text-center`}
                >
                  Open for details
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <ReactPaginate
        className={`${textColor} font-quick font-bold flex mb-8 justify-center`}
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={(event) => setCurrentPage(event.selected)}
        containerClassName={"pagination flex list-none"}
        pageLinkClassName={"mx-2 px-3 py-2 rounded-md "}
        previousLinkClassName={"mx-2 px-3 py-2 rounded-md "}
        nextLinkClassName={"mx-2 px-3 py-2 rounded-md "}
        disabledClassName={"opacity-50 cursor-not-allowed"}
        activeClassName={"bg-lightblue text-white rounded-md"}
      />
      <JobModal
        bgColor={bgColor}
        textColor={textColor}
        isOpen={isModalOpen}
        selectedJob={selectedJob}
        onClose={closeModal}
      />
      {/* jobs listing area end */}
    </main>
  );
};

export default HomePage;
