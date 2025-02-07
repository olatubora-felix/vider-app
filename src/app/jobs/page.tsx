import MainLayout from "@/components/layouts";
import TopBanner from "@/components/TopBanner";
import React from "react";
import { JobListings } from "./__components/jobs/JobListings";

const JobsPage = () => {
  return (
    <MainLayout>
      <TopBanner showSearch={true} />
      <JobListings
        title="All Jobs"
        showPaginate={true}
        showMore={false}
        subtitle="Explore our latest job listings below."
      />
    </MainLayout>
  );
};

export default JobsPage;
