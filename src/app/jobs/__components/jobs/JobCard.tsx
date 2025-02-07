"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, DollarSign, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ApplyJobForm } from "./ApplyJobForm";
import { useSavedJob } from "@/hooks/useSavedJob";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { CalendarClock } from "lucide-react";
import dayjs from "dayjs";

export const JobCard = ({
  id,
  company_logo,
  company_name,
  title,
  candidate_required_location,
  salary,
  job_type,
  publication_date,
  bookmarked,
}: IJobListings) => {
  const { toggleSaveJob } = useSavedJob();

  const MotionCard = motion(Card);

  const router = useRouter();

  const handleNavigate = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    event.stopPropagation(); // Stop event propagation
    router.push(`/jobs/${id}`);
  };

  return (
    <MotionCard
      key={id}
      className="flex flex-col cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div onClick={(event) => handleNavigate(event, id)}>
        <CardHeader className="flex-grow">
          <div className="flex justify-between items-start">
            <Image
              src={company_logo}
              alt={`${company_name} logo`}
              width={50}
              height={50}
              className="rounded-md"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={(event) => toggleSaveJob(event, id, bookmarked)}
              aria-label={bookmarked ? "Unsave job" : "Save job"}
            >
              <div>
                {bookmarked ? (
                  <FaBookmark
                    className={`h-5 w-5 fill-current text-blue-500`}
                  />
                ) : (
                  <FaRegBookmark />
                )}
              </div>
            </Button>
          </div>
          <CardTitle className="mt-2">{title}</CardTitle>
          <CardDescription>{company_name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <span className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {candidate_required_location}
            </span>
            <span className="flex items-center">
              <DollarSign className="mr-1 h-4 w-4" />
              {salary}
            </span>
            <span className="flex items-center">
              <Briefcase className="mr-1 h-4 w-4" />
              {job_type}
            </span>
            <span className="flex items-center">
              <CalendarClock className="mr-1 h-4 w-4" />
              {dayjs(publication_date).format("MMM D, YYYY h:mm A")}
            </span>
          </div>
        </CardContent>
      </div>
      <CardFooter className=" w-full gap-4">
        <ApplyJobForm />
      </CardFooter>
    </MotionCard>
  );
};
export interface IJobListings {
  id: string;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: number;
  description: string;
  company_logo_url?: string;
  index: number;
  bookmarked: boolean;
}
