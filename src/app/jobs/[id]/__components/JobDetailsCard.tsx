"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Tag } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Parser from "html-react-parser";
import { FaRegBookmark } from "react-icons/fa6";

import { useSavedJob } from "@/hooks/useSavedJob";
import { Fragment } from "react";
import { FaBookmark } from "react-icons/fa";
import { currencyFormatter } from "@/utils/helper/currencyFormatter";
import { Job } from "@/types/jobsType";
import { ApplyJobForm } from "../../__components/jobs/ApplyJobForm";
export const JobDetailsCard = ({
  company_logo,
  company_name,
  title,
  candidate_required_location,
  salary,
  job_type,
  company_logo_url,
  tags,
  description,
  id,
  bookmarked,
}: Job) => {
  const redirect = useRouter();
  const { toggleSaveJob, isPending } = useSavedJob();
  return (
    <main className="grid grid-cols-1 md:grid-cols-4 gap-6 container mx-auto py-10 relative">
      <div className=" bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 md:col-span-3 rounded-md shadow-md border-b-4 border-yellow-500">
        <div className="px-4 py-8">
          <button
            className="inline-flex items-center text-sm font-semibold text-yellow-500 hover:yellow-800 "
            onClick={() => redirect.push("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </button>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="md:text-3xl text-2xl font-bold">
                <span> {title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {salary && (
                  <div className="flex items-center">
                    <span className="font-semibold">
                      {currencyFormatter(Number(salary))}
                    </span>
                  </div>
                )}

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>{candidate_required_location}</span>
                  <Badge variant="secondary" className="ml-2 capitalize">
                    {job_type}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Tag className="h-5 w-5 text-muted-foreground mr-2 text-black" />
                  <span className=" break-words text-sm font-medium text-black capitalize">
                    {tags.join(", ")}
                  </span>
                </div>
              </div>
              <div className="text-gray-700 text-lg my-3 space-y-4">
                {Parser(description)}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground mb-4">
                Put &quot;Job Application&quot; as the subject of your email and
                attach your resume.
              </p>

              <ApplyJobForm btnClass="md:w-[250px] h-[52px] gap-2 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
      <aside
        className=" bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800  rounded-md shadow-lg border-b-4
       border-yellow-500 p-4 h-[600px] sticky top-20 right-0"
      >
        <h3 className="text-xl  text-center mb-4 font-bold">Company Info</h3>

        {company_logo && (
          <Image
            src={company_logo}
            alt={company_name}
            className="w-full rounded-lg mb-4 m-auto object-cover"
            height={334}
            width={334}
          />
        )}

        <h4 className="text-lg font-bold">{company_name}</h4>

        <Link
          href={company_logo_url ?? ""}
          target="_blank"
          className="text-blue-900"
        >
          Visit Website
        </Link>
        <button
          onClick={(event) => toggleSaveJob(event, id, bookmarked)}
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center mt-4 gap-2"
        >
          {isPending ? (
            "Loading..."
          ) : (
            <Fragment>
              {bookmarked ? (
                <>
                  <FaBookmark
                    className={`h-5 w-5 fill-current text-white`}
                    height={24}
                    width={24}
                  />
                  <span>Bookmarked</span>
                </>
              ) : (
                <>
                  <FaRegBookmark className="" height={24} width={24} />{" "}
                  <span>Bookmark Job</span>
                </>
              )}
            </Fragment>
          )}
        </button>
      </aside>
    </main>
  );
};
