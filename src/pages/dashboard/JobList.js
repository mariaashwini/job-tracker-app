import { useState } from "react";
import JobCard from "../../components/dashboard/JobCard";
import {
  getJobsFromLocalStorage,
  updateJobStatus,
  deleteJobInLocalStorage,
} from "../../utils/jobStorage";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../../components/dashboard/SearchFilter";
import JobForm from "../../components/dashboard/JobForm";
import PaginationControls from "../../components/dashboard/PaginationControls";

import {
  saveJobToLocalStorage,
  updateJobInLocalStorage,
} from "../../utils/jobStorage";
import NoJobs from "../../components/dashboard/NoJobs";

export default function JobList() {
  const [jobs, setJobs] = useState(getJobsFromLocalStorage());
  const [deleted, setDeleted] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [editMode, setEditMode] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const [currentPage,setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;


  const navigate = useNavigate();

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      statusFilter == "all" ? job : job.status === statusFilter;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query);

    const matchesRemote =
      jobTypeFilter === "remote"
        ? job.isRemote === true
        : jobTypeFilter === "onsite"
        ? job.isRemote === false
        : true;
    return matchesStatus && matchesSearch && matchesRemote;
  });

 const currentJobs = filteredJobs.slice(indexOfFirstJob,indexOfLastJob);
 const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleStatusUpdate = (jobId, newStatus) => {
    updateJobStatus(jobId, newStatus);
    setJobs(getJobsFromLocalStorage());
  };

  const handleJobDelete = (jobId) => {
    deleteJobInLocalStorage(jobId);
    setJobs(getJobsFromLocalStorage());
    setDeleted((prev) => !prev);
    setLastAction("deleted");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      navigate("/dashboard/jobs");
    }, 2000);
  };

  const handleAddJob = (jobData, resetForm) => {
    try {
      const newJob = {
        id: Date.now().toString(36),
        dateCreated: new Date().toISOString(),
        ...jobData,
      };
      saveJobToLocalStorage(newJob);
      setJobs(getJobsFromLocalStorage());
      setLastAction("added");
      setSubmitted(true);
      resetForm();
      handlePopupClose();
      setTimeout(() => {
        setSubmitted(false);
        navigate("/dashboard/jobs");
      }, 3000);
    } catch (error) {
      console.error("Job saving failed:", error);
    }
  };

  const handleUpdateJob = (jobData) => {
    try {
      const updatedJob = { ...editJob, ...jobData };
      updateJobInLocalStorage(updatedJob);
      setJobs(getJobsFromLocalStorage());
      setLastAction("updated");
      setSubmitted(true);
      handlePopupClose();
      setTimeout(() => {
        setSubmitted(false);
        setEditMode(false);
        navigate("/dashboard/jobs");
      }, 3000);
    } catch (error) {
      console.error("Job update failed:", error);
    }
  };

  const handleEditJob = (job) => {
    setShowPopup(true);
    setEditMode(true);
    setEditJob(job);
  };

  const handlePopupClose = (e) => {
    setShowPopup(false);
    setEditMode(false);
    setEditJob(null);
  };

  return (
    <>
      {showPopup && (
        <JobForm
          onFormSubmit={editMode ? handleUpdateJob : handleAddJob}
          showPopup={showPopup}
          setShowPopup={handlePopupClose}
          initialValues={editJob}
          enableReinitialize
          submitText={editMode ? "Update Job" : "Add Job"}
          title={editMode ? "Edit Job" : "Add Job"}
        />
      )}
      {submitted && (
        <p className="text-green-700 text-center font-bold text-2xl mb-2">
          ✅{" "}
          {lastAction == "updated"
            ? "Job Updated"
            : lastAction == "deleted"
            ? "Job Deleted"
            : "Job Added"}
        </p>
      )}

      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Find Your Dream Job</h2>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Job
        </button>
      </div>
      <SearchFilter
        onSearch={({ searchQuery, statusFilter, jobTypeFilter }) => {
          setSearchQuery(searchQuery);
          setStatusFilter(statusFilter);
          setJobTypeFilter(jobTypeFilter);
        }}
        // setStatusFilter={setStatusFilter}
        // setJobTypeFilter={setJobTypeFilter}
        // searchQuery={searchQuery}
        // setSearchQuery={setSearchQuery}
      />
      {currentJobs.length == 0 ? (
        <NoJobs />
      ) : (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
          {currentJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onStatusUpdate={handleStatusUpdate}
              OnDeleteJob={handleJobDelete}
              onEditJob={() => handleEditJob(job)}
            />
          ))}
          
     
        </div>
         {/* Pagination Controls */}
  <PaginationControls
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={(page) =>
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }
  />

      </>
      )}
    </>

    // <div>
    //   <h2>All Jobs</h2>
    //   <SearchFilter
    //     setStatusFilter={setStatusFilter}
    //     setJobTypeFilter={setJobTypeFilter}
    //     searchQuery={searchQuery}
    //     setSearchQuery={setSearchQuery}
    //   />
    //   {deleted && <p className="success">✅ Job Deleted</p>}
    //   <div className="job-list">
    //     {filteredJobs.length == 0 ? (
    //       <p>No jobs available</p>
    //     ) : (
    //       filteredJobs.map((job) => (
    //         <JobCard
    //           key={job.id}
    //           job={job}
    //           onStatusUpdate={handleStatusUpdate}
    //           OnDeleteJob={handleJobDelete}
    //         />
    //       ))
    //     )}
    //   </div>
    // </div>
  );
}
