import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import clsx from "clsx";
import useApplyJobForm from "@/hooks/useApplyJobForm";
import { CustomInput } from "@/components/CustomInput";

export function ApplyJobForm({ btnClass }: ApplyJobFormModalProps) {
  const {
    handleChangeFile,
    handleSubmit,
    onSubmit,
    register,
    errors,
    modal,
    onConfirm,
  } = useApplyJobForm();

  return (
    <Dialog
      open={modal.isOpen && modal.type === "default"}
      onOpenChange={(open) =>
        onConfirm({
          isOpen: open,
          type: "default",
        })
      }
    >
      <DialogTrigger asChild>
        <Button
          className={clsx(`w-full  bg-blue-900 hover:bg-blue-900`, btnClass)}
        >
          <Mail className="mr-2 h-4 w-4" /> Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <DialogHeader>
          <DialogTitle>Apply for Job</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your job application.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {aplyJobInputs.map((input) => (
            <CustomInput
              label={input.label}
              name={input.name}
              placeholder={input.placeholder}
              register={register}
              errors={errors}
              type={input.type}
              key={input.name}
              subText={input.subText as string}
              handleFileChange={input.type === "file" ? handleChangeFile : null}
            />
          ))}

          <Button
            className="bg-blue-500 hover:bg-blue-600 w-full h-[48px]"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface ApplyJobFormModalProps {
  btnClass?: string;
}
const aplyJobInputs = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter Your Full Name",
    type: "text",
    subText: "",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    type: "email",
  },
  {
    name: "resume",
    label: "Resume",
    type: "file",
    subText: "Upload your resume (PDF, DOC, or DOCX, max 5MB)",
  },
  {
    name: "coverLetter",
    label: "Cover Letter",
    placeholder: "Tell us why you're interested in this position...",
    type: "textarea",
    subText: "50-500 characters",
  },
];
