import React, { ChangeEvent } from "react";
import { MdOutlineSearch } from "react-icons/md";

interface TypeProps {
  placeHolder: string;
  name: string;
  className?: string;
  type?: string;
  value?: any;
  hasSearchIcon?: boolean;
  min?: number;
  max?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchComp: React.FC<TypeProps> = ({
  placeHolder,
  name,
  className,
  type,
  value,
  hasSearchIcon,
  min,
  max,
  onChange,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {name}
      </label>
      {hasSearchIcon && (
        <MdOutlineSearch className="absolute top-1/2 -translate-y-1/2 left-0 text-2xl" />
      )}
      <input
        type={type || "text"}
        id={name}
        value={value?.name || value}
        min={type === "range" ? min : undefined}
        max={type === "range" ? max : undefined}
        onChange={onChange}
        className={
          type !== "range"
            ? "border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:text-white bg-transparent pl-8 border-transparent outline-none"
            : className || ""
        }
        placeholder={placeHolder}
      />
    </>
  );
};

export default React.memo(SearchComp);
