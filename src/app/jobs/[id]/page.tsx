import MainLayout from "@/components/layouts";
import { JobDetailsCard } from "./__components/JobDetailsCard";
import { getJobById } from "@/app/actions/getJobById";
import { Job } from "@/types/jobsType";

// After
type Params = Promise<{ id: string }>;
export default async function JobListingPage({ params }: { params: Params }) {
  const { id } = await params;
  const res = await getJobById(id);
  const job = res?.data as Job;
  return (
    <MainLayout>
      <JobDetailsCard {...(job as Job)} />
    </MainLayout>
  );
}
