/* eslint-disable @typescript-eslint/no-explicit-any */

import { Upload } from "lucide-react";
import { forwardRef } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface CustomInputProps {
  label?: string;
  type: "text" | "email" | "password" | "select" | "textarea" | "file";
  name: string;
  options?: string[];
  errors?: Record<string, FieldError | undefined>;
  register: UseFormRegister<any>;
  placeholder?: string;
  [key: string]: any;
  subText?: "";
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = forwardRef<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  CustomInputProps
>(
  (
    {
      label,
      type = "text",
      name,
      options = [],
      errors = {},
      register,
      placeholder,
      subText,
      handleFileChange,
      ...props
    },
    ref
  ) => {
    const renderInputField = () => {
      switch (type) {
        case "select":
          return (
            <select
              name={name}
              ref={ref as React.Ref<HTMLSelectElement>}
              className="w-full md:w-auto  px-4 py-2 focus:outline-none text-gray-800 dark:text-white"
              {...props}
              {...register(name)}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );

        case "file":
          return (
            <label
              htmlFor={name}
              className="border border-gray-900 rounded-md w-full md:w-auto  px-4 py-2 focus:outline-none text-gray-800 dark:text-white dark:bg-gray-900 flex items-center gap-2"
            >
              Upload Resume
              <Upload className="size-5 opacity-60 " />
              <input
                type="file"
                id={name}
                name={name}
                hidden
                placeholder={placeholder}
                onChange={handleFileChange}
                {...props}
              />
            </label>
          );

        case "textarea":
          return (
            <textarea
              name={name}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className="border border-gray-900 rounded-md w-full md:w-auto  px-4 py-2 focus:outline-none text-gray-800 dark:text-white dark:bg-gray-900"
              placeholder={placeholder}
              rows={5}
              {...props}
              {...register(name)}
            ></textarea>
          );

        default:
          return (
            <input
              type={type}
              name={name}
              ref={ref as React.Ref<HTMLInputElement>}
              placeholder={placeholder}
              {...props}
              {...register(name)}
              className="border border-gray-900 rounded-md w-full md:w-auto  px-4 py-2 focus:outline-none text-gray-800 dark:text-white dark:bg-gray-900"
            />
          );
      }
    };

    return (
      <div className="w-full grid grid-cols-1 gap-3">
        {label && (
          <label htmlFor={name} className="text-sm font-medium text-gray-500">
            {label}
          </label>
        )}

        {renderInputField()}
        {subText && <small className="text-xs text-gray-500">{subText}</small>}
        {errors[name] && (
          <p className="text-sm text-red-500">{errors[name]?.message}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
