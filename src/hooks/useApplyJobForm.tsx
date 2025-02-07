import { validateFile } from "@/utils/helper/validateFile";
import {
  jobApplicationSchema,
  JobApplicationSchema,
} from "@/utils/schema/applyJobSchema";
import { useModalStore } from "@/zustand/modalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const useApplyJobForm = () => {
  const { onCancel, onConfirm, modal } = useModalStore();
  const [resume, setResume] = useState<File | null>(null);
  console.log(resume);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<JobApplicationSchema>({
    defaultValues: {
      fullName: "",
      email: "",
      coverLetter: "",
    },
    resolver: zodResolver(jobApplicationSchema),
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    setResume(file[0]);
  };

  const onSubmit = (data: JobApplicationSchema) => {
    const validateResume = validateFile(resume as File);
    if (!validateResume?.validate) return toast.error(validateResume?.messagae);
    console.log(data, resume);
    Swal.fire({
      title: "Thank You for Applying!",
      text: "Application Confirmation",
      icon: "success",
    });
    onCancel();
  };
  return {
    handleChangeFile,
    handleSubmit,
    onSubmit,
    register,
    errors,
    onConfirm,
    modal,
  };
};

export default useApplyJobForm;
