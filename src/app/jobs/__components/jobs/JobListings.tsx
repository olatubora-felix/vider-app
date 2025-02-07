"use client";
import { motion } from "framer-motion";
import { JobCard } from "./JobCard";
import { JobLoader } from "./JobLoader";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Link from "next/link";
import { FC, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Job, JobsResponseApi } from "@/types/jobsType";
import { CustomPaginate } from "@/components/CustomPaginate";
export const JobListings: FC<JobListingsProps> = ({
  showMore,
  showPaginate,
  title,
  subtitle,
  bookmarked,
}) => {
  const [currentPage, setPaginate] = useState(1);
  const { data, status } = useFetch<JobsResponseApi>({
    endpoint: "/jobs",
    key: "jobs",
    pageParam: currentPage,
    bookmarked: bookmarked ? true : false,
  });
  const jobLists = data?.data?.jobs as Job[];

  return (
    <motion.div
      className="space-y-4 container mx-auto px-2 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <p>{subtitle}</p>
      {status === "pending" && <JobLoader />}
      {status === "success" && jobLists.length === 0 && (
        <div>
          <h2>No Job Found</h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:pb-20 pb-10">
        {jobLists &&
          jobLists.length > 0 &&
          status === "success" &&
          jobLists?.map((job, index) => (
            <JobCard key={job.id} {...job} index={index} />
          ))}
      </div>
      {showMore && (
        <div className="md:py-6 py-3">
          <Link
            href={"/jobs"}
            className="flex items-center justify-center gap-3 font-medium  text-base cursor-pointer text-gray-800 text-center"
          >
            <FaArrowAltCircleRight className="size-6" />{" "}
            <span>Show All Jobs</span>
          </Link>
        </div>
      )}
      <div>
        {showPaginate && (
          <CustomPaginate
            totalPages={data?.data?.totalPages as number}
            currentPage={currentPage}
            onPageChange={setPaginate}
          />
        )}
      </div>
    </motion.div>
  );
};
interface JobListingsProps {
  showMore: boolean;
  title: string;
  subtitle: string;
  showPaginate: boolean;
  bookmarked?: boolean;
}
