import MainLayout from "@/components/layouts";
import Showcase from "@/components/Showcase";
import TopBanner from "@/components/TopBanner";
import React from "react";
import { JobListings } from "./jobs/__components/jobs/JobListings";

const page = async () => {
  return (
    <MainLayout>
      <Showcase />
      <TopBanner showSearch={false} />
      <JobListings
        title="Latest Job Listings"
        showMore={false}
        showPaginate
        subtitle="Explore our latest job listings below."
      />
    </MainLayout>
  );
};

export default page;
