import JobCard from "./JobCard";

/**
 * JobCardList
 * 
 * props:
 * - jobs: if passed from CompanyDetail, an array like,
 *        [{ id, title, salary, equity, company },...]
 *        -if jobs is passed from Jobs component, array has:
 *       [ { id, title, salary, equity, companyHandle, companyName }, ...] }
 *
 * state: none
 *
 * JobCardlist -> JobCard
 **/

function JobCardList({ jobs  }) {

  /** Helper function to generate jobs tags */

  function generateJobsTags() {
    return jobs.map((job) => {
      return (
        <JobCard
          key={job.id}
          companyName={job.companyName}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
        />
      );
    });
  }

  return <ul className="JobCardList container">{generateJobsTags()}</ul>;
}

export default JobCardList;