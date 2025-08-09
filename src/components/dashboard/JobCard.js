import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/main.css";
import {
  faEdit,
  faCheck,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import StatusOptions from "./StatusOptions";
import { useNavigate } from "react-router-dom";

export default React.memo(function JobCard({
  job,
  onStatusUpdate,
  OnDeleteJob,
  onEditJob,
}) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(job.status);
  const [committedStatus, setCommittedStatus] = useState(job.status);
  const navigate = useNavigate();

  const formattedDate = new Date(job.dateCreated).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleStatusUpdate = () => {
    setCommittedStatus(selectedStatus);
    setIsEditingStatus((prev) => !prev);
    if (onStatusUpdate) {
      onStatusUpdate(job.id, selectedStatus);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Do you want to delete this job?")) OnDeleteJob(job.id);
  };
  return (
    <div className="bg-white shadow rounded-lg p-4 h-[280px] flex flex-col justify-between relative">
      {/* 🟦 Top-right corner actions */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={onEditJob}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="text-red-600 hover:text-red-800"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <h3 className="text-blue-700 font-semibold hover:underline cursor-pointer mt-10">
        {job.title}
      </h3>
      <p className="text-sm text-gray-800">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <p className="text-sm text-gray-500">Posted: {formattedDate}</p>
      <p className="text-sm text-gray-500">{job.description}</p>
      <div className="mt-2">
        <span className="bg-blue-100 text-blue-700 text-xs px-4 py-1 rounded-full">
          {job.isRemote ? "Remote" : "On-site"}
        </span>
      </div>
      <div className="flex justify-center	text-sm text-blue-600">
        {isEditingStatus ? (
          <>
            <StatusOptions
              name="status"
              value={selectedStatus}
              onChange={handleStatusChange}
            />
            <button
              className="ml-2"
              aria-label="Update Status"
              title="Update Status"
              onClick={handleStatusUpdate}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </>
        ) : (
          <>
            <p className="mr-2 text-lg">
              {committedStatus.charAt(0).toUpperCase() +
                committedStatus.slice(1)}
            </p>
            <button
              className=""
              aria-label="Edit Status"
              title="Edit Status"
              onClick={() => setIsEditingStatus((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </>
        )}
      </div>
    </div>
  );
})
