import MainLayout from "@/components/layouts";
import React from "react";
import { JobListings } from "../__components/jobs/JobListings";

const page = () => {
  return (
    <MainLayout>
      <JobListings
        title="All Saved Jobs"
        showMore={false}
        showPaginate={true}
        subtitle="Explore our latest job listings below."
        bookmarked={true}
      />
    </MainLayout>
  );
};

export default page;
