export function saveJobToLocalStorage(newJob) {
  const [existingJobs,key] = getExistingJobs();
  const updatedJobs = [...existingJobs, newJob];

  try {
    localStorage.setItem(key, JSON.stringify(updatedJobs));
  } catch (error) {
    console.error("Failed to save jobs to localStorage:", error);
  }
}

export function getJobsFromLocalStorage() {
  const key = getUserKey();
  if (!key) return [];

  try {
    const jobs = localStorage.getItem(key);
    return jobs ? JSON.parse(jobs) : [];
  } catch (error) {
    console.error("Failed to parse jobs from localStorage:", error);
    return [];
  }
}

function getUserKey() {
  try {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user?.id) {
      console.warn("User not logged in");
      return null;
    }
    return `jobs_${user.id}`;
  } catch (error) {
    console.error("Error retrieving user from localStorage:", error);
    return null;
  }
}

function getExistingJobs(){
const key = getUserKey();
  if (!key) return;

  const existingJobs = getJobsFromLocalStorage();
  return [existingJobs,key];
}

export function updateJobStatus(jobId,newStatus){
  const [jobs,key] = getExistingJobs();
    const updatedJob = jobs.map((job) => {
      if(job.id === jobId)
      {
          return {...job,status: newStatus};
          
      }
      return job;
    });

     try {
    localStorage.setItem(key, JSON.stringify(updatedJob));
  } catch (error) {
    console.error("Failed to update job status to localStorage:", error);
  }
}

export function updateJobInLocalStorage(updatedJob) {
  const [existingJobs,key] = getExistingJobs();
  const newJob = existingJobs.map((job) => job.id == updatedJob.id ? updatedJob : job);

  try {
    localStorage.setItem(key, JSON.stringify(newJob));
  } catch (error) {
    console.error("Failed to update jobs to localStorage:", error);
  }
}

export function deleteJobInLocalStorage(jobId){
    const [existingJobs,key] = getExistingJobs();
    const jobs = existingJobs.filter((job) => job.id !== jobId);
     try {
    localStorage.setItem(key, JSON.stringify(jobs));
  } catch (error) {
    console.error("Failed to delete jobs in localStorage:", error);
  }

}
