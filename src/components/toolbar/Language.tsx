import React from "react";
import Select from "@/components/select";

const Language: React.FC<any> = ({ selected, setSelected, data }) => {
  return (
    <div className="border rounded-[48px]">
      <Select setSelected={setSelected} selected={selected} data={data} />
    </div>
  );
};

export default React.memo(Language);
