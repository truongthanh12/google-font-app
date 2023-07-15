import React, { ChangeEvent } from "react";
import SearchComp from "@/components/search";

interface typeProps {
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  query: string;
}
const Search: React.FC<typeProps> = ({ handleSearchChange, query }) => {
  return (
    <div className="border-r relative">
      <SearchComp
        onChange={handleSearchChange}
        value={query}
        hasSearchIcon
        placeHolder="Search fonts"
        name="search"
      />
    </div>
  );
};

export default React.memo(Search);
