import StatusOptions from "./StatusOptions";

import "../../styles/main.css";
import React,{ useState } from "react";
export default React.memo(function SearchFilter({
  onSearch
  // setStatusFilter,
  // searchQuery,
  // setJobTypeFilter,
  // setSearchQuery,
}) {
  const [localQuery, setLocalQuery] = useState("");
  const [localJobTypeFilter, setLocalJobTypeFilter] = useState("all");
  const [localStatus, setLocalStatus] = useState("all");

  const handleSearchClick = () => {
    onSearch({
      searchQuery: localQuery,
      statusFilter: localStatus,
      jobTypeFilter: localJobTypeFilter
    });
  };
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow flex flex-wrap justify-start w-full gap-6">
      <input
        placeholder="Title, Company or Location"
        className="flex-1 min-w-[200px] border border-blue-500 rounded px-4 py-2 my-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        type="text"
        name="searchInput"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      {/* <select
        name="status"
        className="flex-1 border border-blue-500 px-4 py-2 m-4 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        <option value="interview">Interview</option>
      </select> */}
      <StatusOptions
        name="status"
        onChange={(e) => setLocalStatus(e.target.value)}
        setFilter={true}
        className="flex-1 min-w-[160px] border border-blue-500 px-4 py-2 my-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="jobType"
        onChange={(e) => setLocalJobTypeFilter(e.target.value)}
        className="flex-1 min-w-[160px] border border-blue-500 px-4 py-2 my-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All</option>
        <option value="remote">Remote</option>
        <option value="onsite">Onsite</option>
      </select>
      <button
        onClick={handleSearchClick}
        className="flex-1 min-w-[120px] bg-blue-500 text-white my-2 px-4 py-2 rounded-lg cursor-pointer"
      >
        Search Jobs
      </button>
    </div>
    
  );
});
