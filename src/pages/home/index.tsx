import React, { useEffect, useState } from "react";
import ToolBar from "@/components/toolbar";
import Fonts from "@/components/font";
import {
  FontSliceProps,
  MultiSelectProps,
  RangeFontProps,
} from "@/models/common";
import { DATA_PREVIEW } from "@/utils/data";

const Home: React.FC<any> = ({
  data,
  setFilteredData,
  filteredData,
  loading,
  error,
}) => {
  const [dataSlice, setDataSlice] = useState<any>([]);

  const [selectedPreview, setSelectedPreview] = useState<RangeFontProps>(
    DATA_PREVIEW[1] || { name: "Sentence" }
  );
  const [selectedRangeFont, setSelectedRangeFont] = useState<RangeFontProps>(
    selectedPreview.name === "Sentence"
      ? {
          name: "40",
        }
      : { name: "18" }
  );
  const [selectedLangs, setSelectedLangs] = useState<RangeFontProps>({
    name: "All languages",
  });
  const [rangeValue, setRangeValue] =
    useState<RangeFontProps>(selectedRangeFont);

  const [query, setQuery] = useState<string>("");
  const [queryPreview, setQueryPreview] = useState<string>("");

  const [selectedItems, setSelectedItems] = useState<MultiSelectProps[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    return setFilteredData(
      data?.filter(
        (item: FontSliceProps) =>
          item?.family?.toLowerCase().includes(query?.toLowerCase()) &&
          (!selectedItems.length ||
            selectedItems?.some(
              ({ name }) => name.toLowerCase() === item?.category?.toLowerCase()
            )) &&
          (selectedLangs?.name === "All languages" ||
            item?.subsets?.some((item) =>
              item.toLowerCase().includes(selectedLangs?.name?.toLowerCase())
            )) &&
          item?.isNoto === isChecked
      )
    );
  }, [data, query, selectedItems, selectedLangs, isChecked]);

  const handleClearSearch = () => {
    setQuery("");
  };

  return (
    <div className="max-w-[1430px] mx-auto">
      <ToolBar
        setSelectedRangeFont={setSelectedRangeFont}
        selectedRangeFont={selectedRangeFont}
        rangeValue={rangeValue}
        setRangeValue={setRangeValue}
        selectedPreview={selectedPreview}
        setSelectedPreview={setSelectedPreview}
        query={query}
        setQuery={setQuery}
        queryPreview={queryPreview}
        setQueryPreview={setQueryPreview}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        selectedLangs={selectedLangs}
        setSelectedLangs={setSelectedLangs}
      />
      <Fonts
        onClearSearch={handleClearSearch}
        data={filteredData}
        loading={loading}
        error={error}
        previewText={queryPreview}
        size={rangeValue}
        previewType={selectedPreview?.name}
        dataSlice={dataSlice} setDataSlice={setDataSlice}
      />
    </div>
  );
};

export default Home;
