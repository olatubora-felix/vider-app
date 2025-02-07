"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { CustomInput } from "../CustomInput";
import { MdClear } from "react-icons/md";
import { useSearch } from "@/hooks/useSearch";

const Search = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    title,
    location,
    handleClearQuery,
    isValid,
  } = useSearch();
  return (
    <form
      className=" flex justify-center items-center gap-3 md:flex-row flex-col md:mx-auto md:max-w-2xl w-full  p-4 "
      onSubmit={handleSubmit(onSubmit)}
    >
      {searchInputs.map((input) => (
        <CustomInput
          label={""}
          name={input.name}
          placeholder={input.placeholder}
          register={register}
          errors={errors}
          type={input.type}
          key={input.name}
        />
      ))}

      <div className="flex items-center gap-6 justify-between  w-full p-3">
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full disabled:cursor-not-allowed md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 focus:outline-none flex items-center gap-1 justify-center"
        >
          <FaSearch /> Search
        </Button>
        {title || location ? (
          <div
            role="button"
            className="md:w-auto w-full  px-4 py-2 focus:outline-none flex items-center gap-1 justify-center bg-red-400 text-white rounded-md"
            onClick={handleClearQuery}
          >
            <MdClear /> Clear
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default Search;
const searchInputs = [
  {
    name: "title",

    placeholder: "Tilte",
    type: "search",
  },
  {
    name: "location",

    placeholder: "Location",
    type: "search",
  },
];
