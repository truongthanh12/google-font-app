import React from "react";
import MultiSelect from "@/components/multiSelect";

const Category: React.FC<any> = ({ selectedItems, setSelectedItems, data }) => {
  return (
    <MultiSelect
      selected={selectedItems}
      setSelected={setSelectedItems}
      data={data}
    />
  );
};

export default React.memo(Category);
