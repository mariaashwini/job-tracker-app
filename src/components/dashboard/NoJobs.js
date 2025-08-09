import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const NoJobs = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <FontAwesomeIcon icon={faSearch} className="w-12 h-12 mb-3" />
      <p className="text-lg">No jobs found for the selected filters.</p>
    </div>
  );
};

export default React.memo(NoJobs);
