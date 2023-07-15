import React, { FC } from "react";
import SearchComp from "@/components/search";
import Select from "@/components/select";

const RangeFont: FC<any> = ({
  setSelected,
  selected,
  handleRangeChange,
  rangeValue,
  data
}) => {
  return (
    <div className="flex space-x-1 items-center">
      <Select
        setSelected={setSelected}
        selected={selected}
        data={data}
        isFontSize
      />

      <SearchComp
        type="range"
        onChange={handleRangeChange}
        value={rangeValue}
        min={8}
        max={300}
        placeHolder="fonts size"
        name="range sizes"
      />
    </div>
  );
};

export default RangeFont;
